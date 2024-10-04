package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.Receipt;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IReceiptRepo extends JpaRepository<Receipt, Long> {
    @Query("FROM Receipt WHERE customerId = :customerId ORDER BY postingDate DESC")
    List<Receipt> findByCustomerId(@Param("customerId") Integer customerId);

    @Query(nativeQuery = true,
            value = "SELECT SUM(amount)" +
                    " FROM receipt" +
                    " WHERE DATE(posting_date) = DATE(:date)")
    Optional<Double> getTodayTotalReceipt(@Param("date") Date date);
}
