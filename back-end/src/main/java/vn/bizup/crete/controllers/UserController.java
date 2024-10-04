package vn.bizup.crete.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.dto.RegisterRequest;
import vn.bizup.crete.models.dto.ResetPasswordRequest;
import vn.bizup.crete.models.entities.User;
import vn.bizup.crete.repositories.IUserRepo;
import vn.bizup.crete.services.AuthenticationService;

@RestController
@RequestMapping("${apiPrefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final IUserRepo userRepo;
    private final AuthenticationService authenticationService;

    @GetMapping("")
    public ResponseEntity<?> findAll() {
        var response = userRepo.findAllDTO();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        var response = userRepo.findById(id);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<?> savePatient(@Valid @RequestBody RegisterRequest request,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        authenticationService.register(request);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request,
                                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(403).build();
        authenticationService.resetPassword(request);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatientById(@PathVariable("id") Integer id) {
        userRepo.deleteById(id);
        return ResponseEntity.status(200).build();
    }
}
