package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.Service;

import java.util.List;

@Transactional
public interface IServiceRepo extends JpaRepository<Service, Integer> {
    @Nonnull
    @Override
    @Query("FROM Service WHERE deleted = false")
    List<Service> findAll();

    @Nonnull
    @Query("FROM Service WHERE deleted = false AND serviceId = :id")
    Service findServiceById(@Param("id") Integer id);

    @Override
    @Modifying
    @Query("UPDATE Service SET deleted = true WHERE serviceId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);
}
