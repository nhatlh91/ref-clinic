package vn.bizup.crete.controllers;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.entities.Patient;
import vn.bizup.crete.repositories.IPatientRepo;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("${apiPrefix}/patient")
@RequiredArgsConstructor
public class PatientController {
    private final IPatientRepo patientRepo;

    @GetMapping("")
    public ResponseEntity<?> findAllPatients() {
        var response = patientRepo.findAll();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findPatientById(@PathVariable("id") Integer id) {
        var response = patientRepo.findById(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/debt-subtract/")
    public ResponseEntity<?> subtractDebtAmountById(@RequestParam("id") Integer id, @RequestParam("amount") double amount) {
        patientRepo.adjustDebt(id, -amount);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("")
    public ResponseEntity<?> savePatient(@Valid @RequestBody Patient patient,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        patient.setIdentity(createIdentity());
        patientRepo.save(patient);
        return ResponseEntity.status(200).build();
    }

    private String createIdentity() {
        int lastId = patientRepo.getLastId() + 1;
        Date date = new Date();
        Format formatter = new SimpleDateFormat("yyMMdd");
        return String.format(formatter.format(date) + "%1$" + 4 + "s", lastId).replace(' ', '0');
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatientById(@PathVariable("id") Integer id) {
        patientRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }
}
