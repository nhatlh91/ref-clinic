package vn.bizup.crete.repositories;

import jakarta.annotation.Nonnull;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.Item;

import java.util.List;
import java.util.Optional;

@Transactional
public interface IItemRepo extends JpaRepository<Item, Integer> {
    @Nonnull
    @Override
    @Query("FROM Item WHERE deleted = false ORDER BY activeIngredient")
    List<Item> findAll();

    @Override
    @Nonnull
    @Query("FROM Item WHERE deleted = false AND itemId = :id")
    Optional<Item> findById(@Nonnull @Param("id") Integer id);

    @Modifying
    @Query("UPDATE Item SET deleted = true WHERE itemId = :id")
    void deleteById(@Nonnull @Param("id") Integer id);
}
