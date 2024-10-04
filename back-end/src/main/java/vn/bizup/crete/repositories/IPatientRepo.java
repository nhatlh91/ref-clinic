package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.Patient;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IPatientRepo extends JpaRepository<Patient, Integer> {

    @Nonnull
    @Override
    @Query("FROM Patient WHERE deleted=false ORDER BY identity DESC")
    List<Patient> findAll();

    @Query("SELECT patientId FROM Patient ORDER BY patientId DESC LIMIT 1")
    Integer getLastId();

    @Nonnull
    @Override
    @Query("FROM Patient WHERE deleted=false AND patientId = :id")
    Optional<Patient> findById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query("UPDATE Patient SET deleted = true WHERE patientId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query("UPDATE Patient SET debt = debt + :amount WHERE patientId = :id")
    void adjustDebt(@Nonnull @Param("id") Integer id, @Param("amount") double amount);
}
