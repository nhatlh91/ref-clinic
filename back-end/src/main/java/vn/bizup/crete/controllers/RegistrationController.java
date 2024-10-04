package vn.bizup.crete.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.dto.RegistrationForm;
import vn.bizup.crete.models.entities.Service;
import vn.bizup.crete.repositories.IRecordResultRepo;
import vn.bizup.crete.repositories.IRegistrationDetailRepo;
import vn.bizup.crete.repositories.IRegistrationRepo;
import vn.bizup.crete.repositories.IServiceRepo;
import vn.bizup.crete.services.RecordResultService;
import vn.bizup.crete.services.RegistrationService;

import java.util.Date;

@RestController
@RequestMapping("${apiPrefix}/registration")
@RequiredArgsConstructor
public class RegistrationController {
    private final IRegistrationRepo registrationRepo;
    private final RegistrationService registrationService;
    private final IRegistrationDetailRepo registrationDetailRepo;
    private final IRecordResultRepo recordResultRepo;
    private final IServiceRepo serviceRepo;


    @GetMapping("")
    public ResponseEntity<?> getRegistration() {
        var response = registrationRepo.findAllOpenRegistrations();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> getRegistrationDetails(@PathVariable("id") Integer id) {
        var response = registrationDetailRepo.findByRegistrationId(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/close-registration/{id}")
    public ResponseEntity<?> closeRegistrationById(@PathVariable("id") Integer id) {
        registrationRepo.closeById(id);
        recordResultRepo.closeByRegistrationId(id);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("")
    public ResponseEntity<?> saveRegistration(@Valid @RequestBody RegistrationForm form,
                                              BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(400).build();
        registrationService.createRegistration(form);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/services")
    public ResponseEntity<?> getServices() {
        var response = serviceRepo.findAll();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/services")
    public ResponseEntity<?> saveService(@Valid @RequestBody Service service,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(400).build();
        serviceRepo.save(service);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<?> getServices(@PathVariable("id") Integer id) {
        serviceRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }

}
