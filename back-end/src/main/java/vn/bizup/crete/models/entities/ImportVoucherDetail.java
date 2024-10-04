package vn.bizup.crete.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImportVoucherDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer importVoucherDetailId;
    private Integer importVoucherId;
    private Integer itemId;
    private Date expiryDate;
    private double unitPrice;
    private double quantity;
}
