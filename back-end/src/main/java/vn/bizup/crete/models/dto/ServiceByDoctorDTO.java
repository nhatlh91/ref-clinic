package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface ServiceByDoctorDTO {
    @JsonProperty("userId")
    Integer getUser_Id();

    @JsonProperty("fullName")
    String getFull_Name();

    @JsonProperty("serviceNumber")
    Integer getService_Number();
}
