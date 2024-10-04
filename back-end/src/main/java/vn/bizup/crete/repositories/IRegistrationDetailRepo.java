package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.RegistrationDetail;

import java.util.List;

@Transactional
public interface IRegistrationDetailRepo extends JpaRepository<RegistrationDetail, Integer> {
    @Query("FROM RegistrationDetail WHERE registrationId = :id")
    List<RegistrationDetail> findByRegistrationId(@Param("id") Integer id);

    @Modifying
    @Query("DELETE RegistrationDetail WHERE registrationId = :id")
    void deleteByRegistrationId(@Param("id") Integer id);
}
