package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.RecordResult;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IRecordResultRepo extends JpaRepository<RecordResult, Integer> {

    @Nonnull
    @Query("FROM RecordResult WHERE closed = false AND deleted = false")
    List<RecordResult> findAll();

    @Query("FROM RecordResult WHERE closed AND deleted = false AND patientId = :id")
    List<RecordResult> findAllByPatientId(@Param("id") Integer id);

    @Nonnull
    @Query("FROM RecordResult WHERE deleted = false AND recordResultId = :id")
    Optional<RecordResult> findById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query("UPDATE RecordResult SET deleted = true where recordResultId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query("UPDATE RecordResult SET closed = true where registrationId = :id")
    void closeByRegistrationId(@Nonnull @Param("id") Integer id);

}
