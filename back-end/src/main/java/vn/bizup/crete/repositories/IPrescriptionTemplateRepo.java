package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.PrescriptionTemplate;

import java.util.List;

@Transactional
public interface IPrescriptionTemplateRepo extends JpaRepository<PrescriptionTemplate, Integer> {
    @Override
    @Nonnull
    @Query("FROM PrescriptionTemplate WHERE deleted = false")
    List<PrescriptionTemplate> findAll();

    @Modifying
    @Query("UPDATE PrescriptionTemplate SET deleted = true WHERE prescriptionTemplateId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);
}
