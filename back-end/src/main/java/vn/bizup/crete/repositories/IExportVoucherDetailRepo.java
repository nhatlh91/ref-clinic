package vn.bizup.crete.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.ExportDetailDTO;
import vn.bizup.crete.models.entities.ExportVoucherDetail;

import java.util.List;

public interface IExportVoucherDetailRepo extends JpaRepository<ExportVoucherDetail, Integer> {
    @Query(nativeQuery = true,
            value = "SELECT * FROM export_voucher_detail JOIN item USING (item_id) WHERE export_voucher_id = :id")
    List<ExportDetailDTO> findByExportVoucherId(@Param("id") Integer id);
}
