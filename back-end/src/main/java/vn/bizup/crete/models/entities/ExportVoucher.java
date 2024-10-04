package vn.bizup.crete.models.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExportVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exportVoucherId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date createDate;
    private String createdBy;
    private Integer patientId;
    @Column(length = 1000)
    private String description;
    private String payment;
    // retail, withService
    private String type;
    private double total;
    private double surcharge;
    private double totalAmount;
    private boolean deleted;
}
