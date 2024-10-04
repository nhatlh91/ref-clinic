package vn.bizup.crete.controllers;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.dto.RecordResultForm;
import vn.bizup.crete.repositories.IPrescriptionRepo;
import vn.bizup.crete.repositories.IRecordResultDetailRepo;
import vn.bizup.crete.repositories.IRecordResultRepo;
import vn.bizup.crete.services.RecordResultService;

@RestController
@RequestMapping("${apiPrefix}/record-result")
@RequiredArgsConstructor
public class RecordResultController {
    private final IRecordResultDetailRepo recordResultDetailRepo;
    private final IPrescriptionRepo prescriptionRepo;
    private final IRecordResultRepo recordResultRepo;
    private final RecordResultService recordResultService;

    @GetMapping("/patient-id/{id}")
    public ResponseEntity<?> findAllByPatientId(@PathVariable("id") Integer id) {
        var response = recordResultRepo.findAllByPatientId(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("")
    public ResponseEntity<?> updateRecordResult(@Valid @RequestBody RecordResultForm form,
                                                BindingResult bindingResult) {
        System.out.println("go here");
        if (bindingResult.hasErrors()) return ResponseEntity.status(400).build();
        recordResultService.updateRecordResult(form);
        return ResponseEntity.status(200).build();
    }

    @GetMapping()
    public ResponseEntity<?> findAllRecordResults() {
        var response = recordResultRepo.findAll();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> findAllRecordResultDetailByRecordResultId(@PathVariable("id") Integer recordResultId) {
        var response = recordResultDetailRepo.findAllByRecordResultId(recordResultId);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/prescription/record-result-id/{id}")
    public ResponseEntity<?> findAllPrescriptionsByRecordResultId(@PathVariable("id") Integer recordResultId) {
        var response = prescriptionRepo.findAllByRecordResultId(recordResultId);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/prescription/template-id/{id}")
    public ResponseEntity<?> findAllPrescriptionsByTemplateId(@PathVariable("id") Integer id) {
        var response = prescriptionRepo.findAllByTemplateId(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecordResultById(@PathVariable("id") Integer recordResultId) {
        recordResultRepo.deleteById(recordResultId);
        return ResponseEntity.status(200).build();
    }

}
