package vn.bizup.crete.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.bizup.crete.models.entities.CustomerType;

public interface ICustomerTypeRepo extends JpaRepository<CustomerType, Short> {
}
