package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.DailyRevenueDTO;
import vn.bizup.crete.models.entities.VoucherDetail;

import java.util.Date;
import java.util.List;

@Transactional
public interface IVoucherDetailRepo extends JpaRepository<VoucherDetail, Long> {

    @Query("FROM VoucherDetail WHERE deleted = false AND voucherCode = :voucherCode")
    List<VoucherDetail> findAllByVoucherCode(@Param("voucherCode") String voucherCode);

    @Modifying
    @Query("UPDATE VoucherDetail SET deleted = true WHERE voucherCode = :voucherCode")
    void deleteByVoucherCode(@Param("voucherCode") String voucherCode);

    @Query(nativeQuery = true,
            value = "SELECT product_type_id, product_type, SUM(unit_price*voucher_detail.quantity) AS revenue" +
                    " FROM voucher_detail JOIN export_voucher USING(voucher_code) JOIN product USING (product_id)" +
                    " WHERE DATE(posting_date) = DATE(:date)" +
                    " GROUP BY product_type_id, product_type")
    List<DailyRevenueDTO> getDailyRevenueByProductType(@Param("date") Date date);
}
