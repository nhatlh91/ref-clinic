package vn.bizup.crete.models.dto;

import lombok.Data;
import vn.bizup.crete.models.entities.Prescription;

import java.util.List;

@Data
public class PrescriptionTemplateForm {
    private String description;
    private List<Prescription> details;
}
