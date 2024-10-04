package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.RevenueByPatientDTO;
import vn.bizup.crete.models.entities.Registration;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IRegistrationRepo extends JpaRepository<Registration, Integer> {
    @Override
    @Nonnull
    @Query("FROM Registration WHERE deleted = false")
    List<Registration> findAll();

    @Nonnull
    @Query("FROM Registration WHERE closed = false AND deleted = false")
    List<Registration> findAllOpenRegistrations();

    @Modifying
    @Query("UPDATE Registration SET deleted = true WHERE registrationId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query(nativeQuery = true,
            value = "UPDATE registration SET closed = true WHERE registration_id = :id")
    void closeById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query(nativeQuery = true,
            value = "UPDATE registration SET total_amount = :amount WHERE registration_id = :id")
    void updateTotalAmount(@Nonnull @Param("id") Integer id, @Nonnull @Param("amount") Double amount);

    @Query(nativeQuery = true,
            value = "SELECT patient.*, SUM(total_amount) AS total_revenue" +
                    " FROM registration JOIN patient USING (patient_id)" +
                    " WHERE closed AND YEAR(create_date) = :year AND !registration.deleted" +
                    " GROUP BY patient_id")
    List<RevenueByPatientDTO> findRevenueByPatient(@Param("year") Integer year);

    @Query(nativeQuery = true,
            value = "SELECT SUM(total_amount) FROM registration " +
                    " WHERE !deleted AND closed AND YEAR(create_date) = :year AND MONTH(create_date) = :month")
    Optional<Double> findTotalRevenueByMonth(@Param("year") Integer year, @Param("month") Integer month);

    @Query(nativeQuery = true,
            value = "SELECT SUM(total_amount) FROM registration " +
                    " WHERE !deleted AND closed AND DATE(create_date) = DATE(:date)")
    Optional<Double> findDailyRevenue(@Param("date") Date date);
}
