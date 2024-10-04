package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import vn.bizup.crete.models.entities.ImportVoucherDetail;

import java.util.Date;
import java.util.List;

@Data
public class ImportVoucherForm {
    private String createdBy;
    private String vendor;
    @Length(max = 1000)
    private String description;
    private double total;
    private double vat;
    private double totalAmount;
    private List<ImportVoucherDetail> details;
}
