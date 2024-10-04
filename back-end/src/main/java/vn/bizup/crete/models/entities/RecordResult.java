package vn.bizup.crete.models.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class RecordResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recordResultId;
    private Integer patientId;
    private String patientIdentity;
    private String patientName;
    private Integer registrationId;
    private Date createDate;
    @Column(length = 2000)
    private String current;
    @Column(length = 2000)
    private String history;
    @Column(length = 2000)
    private String diagnose;
    private boolean closed;
    private boolean deleted;
}
