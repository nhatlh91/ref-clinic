package vn.bizup.crete.models.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prescriptionId;
    private Integer recordResultId;
    private Integer templateId;
    private Integer itemId;
    private String name;
    private String description;
    private double morning;
    private double lunch;
    private double afternoon;
    private double night;
    private int days;
}
