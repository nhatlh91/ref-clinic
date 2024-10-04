package vn.bizup.crete.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.ImportDetailDTO;
import vn.bizup.crete.models.entities.ImportVoucherDetail;

import java.util.List;

public interface IImportVoucherDetailRepo extends JpaRepository<ImportVoucherDetail, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT * FROM import_voucher_detail JOIN item USING (item_id) WHERE import_voucher_id = :id")
    List<ImportDetailDTO> findByImportVoucherId(@Param("id") Integer id);
}
