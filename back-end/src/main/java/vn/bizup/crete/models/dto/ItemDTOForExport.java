package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface ItemDTOForExport {
    @JsonProperty("itemId")
    Integer getItem_Id();

    @JsonProperty("medicineName")
    String getMedicine_Name();

    @JsonProperty("unit")
    String getUnit();

    @JsonProperty("barcode")
    String getBarcode();

    @JsonProperty("activeIngredient")
    String getActive_Ingredient();

    @JsonProperty("retailPrice")
    double getRetail_Price();

    @JsonProperty("priceWithService")
    double getPrice_With_Service();

    @JsonProperty("totalRemainingQuantity")
    double getTotal_Remaining_Quantity();

}
