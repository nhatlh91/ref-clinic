package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.QuotationDTO;
import vn.bizup.crete.models.entities.QuotationDetail;

import java.util.List;

@Transactional
public interface IQuotationDetailRepo extends JpaRepository<QuotationDetail, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT *" +
                    " FROM quotation_detail JOIN product USING (product_id) JOIN customer_type USING (customer_type_id)" +
                    " WHERE !deleted" +
                    " ORDER BY product_name")
    List<QuotationDTO> findAllDTO();

    @Query(nativeQuery = true,
            value = "SELECT *" +
                    " FROM quotation_detail JOIN product USING (product_id) JOIN customer_type USING (customer_type_id)" +
                    " WHERE customer_type_id = :customerTypeId" +
                    " ORDER BY product_name")
    List<QuotationDTO> findAllByCustomerType(@Param("customerTypeId") Short customerTypeId);

    @Query(nativeQuery = true,
            value = "SELECT *" +
                    " FROM quotation_detail" +
                    " WHERE product_id = :productId")
    List<QuotationDetail> findAllByProductId(@Param("productId") Integer productId);

    void deleteAllByProductId(@NotNull Integer productId);

}
