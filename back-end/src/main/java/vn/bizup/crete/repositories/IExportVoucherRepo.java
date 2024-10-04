package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.ExportVoucher;
import vn.bizup.crete.models.entities.ImportVoucher;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IExportVoucherRepo extends JpaRepository<ExportVoucher, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT *" +
                    " FROM export_voucher" +
                    " WHERE deleted = false AND YEAR(create_date) = :year" +
                    " ORDER BY create_date DESC")
    List<ExportVoucher> findAll(@Param("year") Integer year);

    @Modifying
    @Query("UPDATE ExportVoucher SET deleted = true WHERE exportVoucherId = :id")
    void deleteByVoucherId(@Param("id") Integer id);

    @Query(nativeQuery = true,
            value = "SELECT SUM(total_amount) FROM export_voucher " +
                    " WHERE !deleted AND type = :type AND YEAR(create_date) = :year AND MONTH(create_date) = :month")
    Optional<Double> findTotalRevenueByMonth(@Param("year") Integer year, @Param("month") Integer month, @Param("type") String type);

    @Query(nativeQuery = true,
            value = "SELECT SUM(total_amount) FROM export_voucher " +
                    " WHERE !deleted AND type = :type AND DATE(create_date) = DATE(:date)")
    Optional<Double> findDailyRevenue(@Param("date") Date date, @Param("type") String type);

//    @Query("FROM ExportVoucher WHERE voucherCode = :voucherCode AND deleted = false")
//    ExportVoucher getByVoucherCode(@Param("voucherCode") String voucherCode);
//
//    @Query(nativeQuery = true,
//            value = "SELECT SUM(total_amount)" +
//                    " FROM export_voucher" +
//                    " WHERE !deleted AND DATE(posting_date) = DATE(:date)")
//    Optional<Double> getTodayTotalExportAmount(@Param("date") Date date);
//
//    @Query(nativeQuery = true,
//            value = "SELECT MONTH(posting_date) as month, SUM(total_amount) as revenue" +
//                    " FROM export_voucher" +
//                    " WHERE !deleted AND YEAR(posting_date) = :year" +
//                    " GROUP BY MONTH(posting_date)")
//    List<MonthlyRevenueDTO> getMonthlyRevenue(@Param("year") String year);
//
//    @Query("FROM ExportVoucher WHERE deleted = false AND voucherCode = :voucherCode")
//    ExportVoucher findByVoucherCode(@Param("voucherCode") String voucherCode);
}
