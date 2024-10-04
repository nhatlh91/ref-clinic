package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface ExportDetailDTO {
    @JsonProperty("medicineName")
    String getMedicine_Name();
    @JsonProperty("unit")
    String getUnit();
    @JsonProperty("unitPrice")
    double getUnit_Price();
    @JsonProperty("quantity")
    double getQuantity();
}
