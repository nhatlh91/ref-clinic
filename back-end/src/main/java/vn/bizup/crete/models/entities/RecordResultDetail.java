package vn.bizup.crete.models.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RecordResultDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordResultDetailId;
    private Integer recordResultId;
    private Integer userId;
    private String fullName;
    private Integer serviceId;
    private String serviceName;
    @Column(length = 2000)
    private String result;
    @Column(length = 1000)
    private String fileUrl;
}
