package vn.bizup.crete.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.bizup.crete.models.dto.InventoryDTO;
import vn.bizup.crete.models.dto.ItemDTOForExport;
import vn.bizup.crete.models.entities.Inventory;

import java.util.List;

@Transactional
public interface IInventoryRepo extends JpaRepository<Inventory, Integer> {

    @Query(nativeQuery = true,
            value = "SELECT inventory_id, medicine_name, active_ingredient, barcode, unit_price, import_quantity, remaining_quantity, import_date, expiry_date" +
                    " FROM inventory JOIN item USING (item_id)" +
                    " WHERE remaining_quantity > 0" +
                    " ORDER BY medicine_name, import_date DESC")
    List<InventoryDTO> findAllDTO();

    @Query(nativeQuery = true,
            value = "SELECT SUM(remaining_quantity)" +
                    " FROM inventory" +
                    " WHERE remaining_quantity > 0 AND item_id = :id")
    Double findStockByProductId(@Param("id") Integer id);


    @Query(nativeQuery = true,
            value = "SELECT item_id, medicine_name, unit, active_ingredient, barcode, retail_price, price_with_service, SUM(remaining_quantity) AS total_remaining_quantity" +
                    " FROM inventory JOIN item USING (item_id)" +
                    " WHERE remaining_quantity > 0" +
                    " GROUP BY item_id")
    List<ItemDTOForExport> findAllProductDTOForExport();

    //
    @Query(value = "FROM Inventory WHERE remainingQuantity > 0 AND itemId = :id ORDER BY expiryDate LIMIT 1")
    Inventory findByProductIdForExport(@Param("id") Integer id);
//
//    @Query(value = "FROM Inventory WHERE productId = :productId AND importQuantity > remainingQuantity ORDER BY importDate DESC")
//    List<Inventory> findAllByProductId(@Param("productId") Integer productId);
//
//    @Query(nativeQuery = true,
//            value = "SELECT SUM(unit_price * remaining_quantity)" +
//                    " FROM inventory" +
//                    " WHERE remaining_quantity > 0")
//    Optional<Double> getTotalInventoryValue();
//
//    @Query(value = "FROM Inventory WHERE voucherCode = :voucherCode")
//    List<Inventory> findAllByVoucherCode(@Param("voucherCode") String voucherCode);
//
//    @Modifying
//    @Query(value = "DELETE Inventory WHERE voucherCode = :voucherCode")
//    void deleteAllByVoucherCode(@Param("voucherCode") String voucherCode);
}
