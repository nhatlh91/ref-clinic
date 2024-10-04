package vn.bizup.crete.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.bizup.crete.models.dto.ExportVoucherForm;
import vn.bizup.crete.models.dto.ImportVoucherForm;
import vn.bizup.crete.models.entities.*;
import vn.bizup.crete.repositories.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final IItemRepo itemRepo;
    private final IPatientRepo patientRepo;
    private final IInventoryRepo inventoryRepo;
    private final IImportVoucherRepo importVoucherRepo;
    private final IExportVoucherRepo exportVoucherRepo;
    private final IImportVoucherDetailRepo importVoucherDetailRepo;
    private final IExportVoucherDetailRepo exportVoucherDetailRepo;

    @Transactional
    public void createImportVoucher(ImportVoucherForm form) {
        var importVoucher = ImportVoucher.builder()
                .createDate(new Date())
                .createdBy(form.getCreatedBy())
                .vat(form.getVat())
                .total(form.getTotal())
                .totalAmount(form.getTotalAmount())
                .description(form.getDescription())
                .vendor(form.getVendor())
                .build();
        importVoucher = importVoucherRepo.save(importVoucher);
        createImportVoucherDetail(form.getDetails(), importVoucher.getImportVoucherId());
        createInventory(form.getDetails());
    }

    private void createImportVoucherDetail(List<ImportVoucherDetail> details, Integer importVoucherId) {
        details.forEach(importVoucherDetail -> importVoucherDetail.setImportVoucherId(importVoucherId));
        importVoucherDetailRepo.saveAll(details);
    }

    private void createInventory(List<ImportVoucherDetail> details) {
        List<Inventory> inventories = new ArrayList<>();
        details.forEach(importVoucherDetail -> {
            var inventory = Inventory.builder()
                    .itemId(importVoucherDetail.getItemId())
                    .expiryDate(importVoucherDetail.getExpiryDate())
                    .importDate(new Date())
                    .remainingQuantity(importVoucherDetail.getQuantity())
                    .importQuantity(importVoucherDetail.getQuantity())
                    .unitPrice(importVoucherDetail.getUnitPrice())
                    .build();
            inventories.add(inventory);
        });
        inventoryRepo.saveAll(inventories);
    }

    @Transactional
    public void createExportVoucher(ExportVoucherForm form) {
        var exportVoucher = ExportVoucher.builder()
                .createDate(new Date())
                .createdBy(form.getCreatedBy())
                .surcharge(form.getSurcharge())
                .total(form.getTotal())
                .totalAmount(form.getTotalAmount())
                .description(form.getDescription())
                .payment(form.getPayment())
                .patientId(form.getPatientId())
                .type(form.getType())
                .build();
        exportVoucher = exportVoucherRepo.save(exportVoucher);
        createExportVoucherDetail(form.getDetails(), exportVoucher.getExportVoucherId());
        adjustInventory(form.getDetails());
        if (Objects.equals(exportVoucher.getPayment(), "debit")) adjustDeptAmount(exportVoucher.getPatientId(), exportVoucher.getTotalAmount());
    }

    private void createExportVoucherDetail(List<ExportVoucherDetail> details, Integer exportVoucherId) {
        details.forEach(detail -> detail.setExportVoucherId(exportVoucherId));
        exportVoucherDetailRepo.saveAll(details);
    }

    private void adjustDeptAmount(Integer patientId, double amount) {
        patientRepo.adjustDebt(patientId, amount);
    }

    private void adjustInventory(List<ExportVoucherDetail> details) {
        details.forEach(detail -> {
            var needQty = detail.getQuantity();
            while (needQty > 0) {
                var inv = inventoryRepo.findByProductIdForExport(detail.getItemId());
                var takenQty = inv.getRemainingQuantity() - needQty;
                if (takenQty >= 0) {
                    inv.setRemainingQuantity(takenQty);
                    inventoryRepo.save(inv);
                    break;
                } else {
                    needQty -= inv.getRemainingQuantity();
                    inv.setRemainingQuantity(0);
                    inventoryRepo.save(inv);
                }
            }
        });
    }
}
