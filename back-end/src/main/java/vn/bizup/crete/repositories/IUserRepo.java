package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.UserDTO;
import vn.bizup.crete.models.entities.User;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IUserRepo extends JpaRepository<User, Integer> {
    @Nonnull
    @Query(nativeQuery = true,
            value = "SELECT * FROM _user WHERE deleted = false AND phone = :phone")
    Optional<User> findByPhone(@Nonnull @Param("phone") String phone);

    @Nonnull
    @Query(nativeQuery = true,
            value = "SELECT user_id, phone, full_name, role FROM _user WHERE deleted = false")
    List<UserDTO> findAllDTO();

    @Modifying
    @Query("UPDATE User SET deleted = true WHERE userId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);
}
