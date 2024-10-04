package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import vn.bizup.crete.models.entities.Customer;

import java.util.List;
import java.util.Optional;

@Transactional
public interface ICustomerRepo extends JpaRepository<Customer, Integer> {
    @Override
    @Query("FROM Customer WHERE deleted = false")
    List<Customer> findAll();

    @Query("FROM Customer WHERE deleted = false AND customerTypeId = :customerTypeId")
    List<Customer> findByCustomerTypeId(@Param("customerTypeId") Short customerTypeId);

    @Modifying
    @Query("UPDATE Customer SET deleted = true WHERE customerId = :customerId")
    void deleteById(@NonNull @Param("customerId") Integer customerId);

    @Modifying
    @Query("UPDATE Customer SET accountsReceivable = accountsReceivable + :amount WHERE customerId = :customerId")
    void updateAccountReceivable(@NonNull @Param("customerId") Integer customerId, @NonNull @Param("amount") double amount);

    @Query(nativeQuery = true,
            value = "SELECT SUM(accounts_receivable)" +
                    " FROM customer" +
                    " WHERE !deleted")
    Optional<Double> getTotalAccountReceivable();
}
