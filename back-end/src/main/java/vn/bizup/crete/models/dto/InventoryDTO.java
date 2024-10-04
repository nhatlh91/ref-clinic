package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public interface InventoryDTO {
    @JsonProperty("inventoryId")
    Integer getInventory_Id();

    @JsonProperty("medicineName")
    String getMedicine_Name();

    @JsonProperty("activeIngredient")
    String getActive_Ingredient();

    @JsonProperty("barcode")
    String getBarcode();

    @JsonProperty("unitPrice")
    double getUnit_Price();

    @JsonProperty("importQuantity")
    double getImport_Quantity();

    @JsonProperty("remainingQuantity")
    double getRemaining_Quantity();

    @JsonProperty("importDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date getImport_Date();

    @JsonProperty("expiryDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date getExpiry_Date();
}
