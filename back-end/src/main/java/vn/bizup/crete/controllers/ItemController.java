package vn.bizup.crete.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.dto.ExportVoucherForm;
import vn.bizup.crete.models.dto.ImportVoucherForm;
import vn.bizup.crete.models.dto.PrescriptionTemplateForm;
import vn.bizup.crete.models.entities.Item;
import vn.bizup.crete.models.entities.PrescriptionTemplate;
import vn.bizup.crete.repositories.*;
import vn.bizup.crete.services.ItemService;


@RestController
@RequestMapping("${apiPrefix}/item")
@RequiredArgsConstructor
public class ItemController {
    private final IItemRepo itemRepo;
    private final IInventoryRepo inventoryRepo;
    private final IPrescriptionTemplateRepo prescriptionTemplateRepo;
    private final IPrescriptionRepo prescriptionRepo;
    private final ItemService itemService;
    private final IImportVoucherRepo importVoucherRepo;
    private final IImportVoucherDetailRepo importVoucherDetailRepo;
    private final IExportVoucherRepo exportVoucherRepo;
    private final IExportVoucherDetailRepo exportVoucherDetailRepo;

    @GetMapping("")
    public ResponseEntity<?> findAllItems() {
        var response = itemRepo.findAll();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/prescription-template")
    public ResponseEntity<?> findAllPrescriptionTemplate() {
        var response = prescriptionTemplateRepo.findAll();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/prescription-template-detail/{id}")
    public ResponseEntity<?> findAllPrescriptionsTemplateId(@PathVariable("id") Integer id) {
        var response = prescriptionRepo.findAllByTemplateId(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/prescription-template")
    public ResponseEntity<?> saveTemplate(@Valid @RequestBody PrescriptionTemplateForm form,
                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        var template = PrescriptionTemplate.builder()
                .description(form.getDescription())
                .build();
        var templateId = prescriptionTemplateRepo.save(template).getPrescriptionTemplateId();
        var details = form.getDetails();
        details.forEach(item -> item.setTemplateId(templateId));
        prescriptionRepo.saveAll(details);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/prescription-template/{id}")
    public ResponseEntity<?> deleteTemplate(@PathVariable("id") Integer id) {
        prescriptionTemplateRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/inventory")
    public ResponseEntity<?> findInventory() {
        var response = inventoryRepo.findAllDTO();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/inventory-for-export")
    public ResponseEntity<?> findInventoryDTOForExport() {
        var response = inventoryRepo.findAllProductDTOForExport();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findItemById(@PathVariable("id") Integer id) {
        var response = itemRepo.findById(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<?> saveItem(@Valid @RequestBody Item item,
                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        itemRepo.save(item);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItemById(@PathVariable("id") Integer id) {
        itemRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/import/{year}")
    public ResponseEntity<?> getImportVoucher(@PathVariable("year") Integer year) {
        var response = importVoucherRepo.findAll(year);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/import-details/{id}")
    public ResponseEntity<?> getImportVoucherDetail(@PathVariable("id") Integer id) {
        var response = importVoucherDetailRepo.findByImportVoucherId(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/import")
    public ResponseEntity<?> saveImportVoucher(@Valid @RequestBody ImportVoucherForm form,
                                               BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        itemService.createImportVoucher(form);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/import/{id}")
    public ResponseEntity<?> deleteImportVoucher(@PathVariable("id") Integer id) {
        importVoucherRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/export/{year}")
    public ResponseEntity<?> getExportVoucher(@PathVariable("year") Integer year) {
        var response = exportVoucherRepo.findAll(year);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/export-details/{id}")
    public ResponseEntity<?> getExportVoucherDetail(@PathVariable("id") Integer id) {
        var response = exportVoucherDetailRepo.findByExportVoucherId(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/export")
    public ResponseEntity<?> saveExportVoucher(@Valid @RequestBody ExportVoucherForm form,
                                               BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        itemService.createExportVoucher(form);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/export/{id}")
    public ResponseEntity<?> deleteExportVoucher(@PathVariable("id") Integer id) {
        exportVoucherRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }
}
