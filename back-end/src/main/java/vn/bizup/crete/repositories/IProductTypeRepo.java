package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.bizup.crete.models.entities.ProductType;

@Transactional
public interface IProductTypeRepo extends JpaRepository<ProductType, Short> {
}
