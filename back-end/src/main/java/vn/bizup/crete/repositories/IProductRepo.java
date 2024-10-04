package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import vn.bizup.crete.models.entities.Product;

import java.util.List;

@Transactional
public interface IProductRepo extends JpaRepository<Product, Integer> {

    @Override
    @Query("FROM Product WHERE deleted = false")
    List<Product> findAll();

//    @Query("FROM Product WHERE deleted = false AND productTypeId = :productTypeId")
//    List<Product> findByProductTypeId(@Param("productTypeId") Short productTypeId);

    @Modifying
    @Query("UPDATE Product SET deleted = true WHERE productId = :productId")
    void deleteById(@NonNull @Param("productId") Integer productId);

    @Query("FROM Product WHERE deleted = false AND productId = :productId")
    Product findProductById(@NonNull @Param("productId") Integer productId);
}
