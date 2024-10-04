package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.entities.Employee;

@Transactional
public interface IEmployeeRepo extends JpaRepository<Employee,Short> {
    @Query(nativeQuery = true,
            value = "SELECT employee_name FROM employee WHERE phone = :phone")
    String findNameByPhone(@Param("phone") String phone);
}
