package vn.bizup.crete.models.dto;

import lombok.Data;
import vn.bizup.crete.models.entities.RegistrationDetail;

import java.util.Date;
import java.util.List;

@Data
public class RegistrationForm {
    private Integer registrationId;
    private Integer patientId;
    private String patientIdentity;
    private String patientName;
    private Date createDate;
    private Double totalAmount;
    List<RegistrationDetail> services;
}
