package vn.bizup.crete.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;
    private String medicineName;
    private String barcode;
    private String activeIngredient;
    private String dosageForm;
    private String strength;
    private String unit;
    private String packaging;
    private String manufacturer;
    private String description;
    private double retailPrice;
    private double priceWithService;
    private boolean deleted;
}
