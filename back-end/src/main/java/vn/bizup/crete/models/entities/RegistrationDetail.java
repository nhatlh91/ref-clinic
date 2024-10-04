package vn.bizup.crete.models.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RegistrationDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer registrationDetailId;
    private Integer registrationId;
    private Integer serviceId;
    private String serviceName;
    private Double price;

}
