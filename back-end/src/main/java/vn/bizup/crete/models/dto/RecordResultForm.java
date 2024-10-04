package vn.bizup.crete.models.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import vn.bizup.crete.models.entities.Prescription;
import vn.bizup.crete.models.entities.RecordResultDetail;

import java.util.Date;
import java.util.List;

@Data
public class RecordResultForm {
    private Integer recordResultId;
    private Integer registrationId;
    private Integer patientId;
    private String patientName;
    private String patientIdentity;
    private Date createDate;
    @Length(max = 2000)
    private String current;
    @Length(max = 2000)
    private String history;
    @Length(max = 2000)
    private String diagnose;
    private List<Prescription> prescriptions;
    private List<RecordResultDetail> details;
}
