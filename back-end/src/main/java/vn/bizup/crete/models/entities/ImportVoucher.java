package vn.bizup.crete.models.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportVoucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer importVoucherId;
    private String createdBy;
    private String vendor;
    @Column(length = 1000)
    private String description;
    private double total;
    private double vat;
    private double totalAmount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date createDate;
    private boolean deleted;
}
