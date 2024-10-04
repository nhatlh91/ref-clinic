package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.Prescription;

import java.util.List;

@Transactional
public interface IPrescriptionRepo extends JpaRepository<Prescription, Integer> {
    @Query("FROM Prescription WHERE recordResultId = :id")
    List<Prescription> findAllByRecordResultId(@Param("id") Integer id);

    @Query("FROM Prescription WHERE templateId = :id")
    List<Prescription> findAllByTemplateId(@Param("id") Integer id);

    @Modifying
    @Query("DELETE Prescription WHERE prescriptionId NOT IN :ids")
    void deletePrescriptions(@Param("ids") List<Integer> ids);
}
