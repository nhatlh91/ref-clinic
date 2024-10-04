package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public interface RevenueByPatientDTO {
    @JsonProperty("patientName")
    String getPatient_Name();

    String getGender();

    String getPhone();

    String getAddress();

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date getBirthday();

    String getIdentity();

    @JsonProperty("totalRevenue")
    double getTotal_Revenue();

}
