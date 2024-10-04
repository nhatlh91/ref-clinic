package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import vn.bizup.crete.models.entities.ExportVoucherDetail;

import java.util.Date;
import java.util.List;

@Data
public class ExportVoucherForm {
    private String createdBy;
    private Integer patientId;
    @Length(max = 1000)
    private String description;
    private String payment;
    // retail, withService
    private String type;
    private double total;
    private double surcharge;
    private double totalAmount;
    private List<ExportVoucherDetail> details;
}
