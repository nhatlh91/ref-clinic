package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.ImportVoucher;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IImportVoucherRepo extends JpaRepository<ImportVoucher, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT *" +
                    " FROM import_voucher" +
                    " WHERE deleted = false  AND YEAR(create_date) = :year" +
                    " ORDER BY create_date DESC")
    List<ImportVoucher> findAll(@Param("year") Integer year);

    @Modifying
    @Query("UPDATE ImportVoucher SET deleted = true WHERE importVoucherId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);

    @Query(nativeQuery = true,
            value = "SELECT SUM(total_amount) FROM import_voucher " +
                    " WHERE !deleted AND YEAR(create_date) = :year AND MONTH(create_date) = :month")
    Optional<Double> findTotalExpenseByMonth(@Param("year") Integer year, @Param("month") Integer month);
}
