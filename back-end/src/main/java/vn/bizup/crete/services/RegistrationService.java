package vn.bizup.crete.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.bizup.crete.models.dto.RegistrationForm;
import vn.bizup.crete.models.entities.Registration;
import vn.bizup.crete.models.entities.RegistrationDetail;
import vn.bizup.crete.repositories.IRegistrationDetailRepo;
import vn.bizup.crete.repositories.IRegistrationRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    private final IRegistrationDetailRepo registrationDetailRepo;
    private final IRegistrationRepo registrationRepo;
    private final RecordResultService recordResultService;

    @Transactional
    public void createRegistration(RegistrationForm form) {
        var registration = Registration.builder()
                .createDate(form.getCreateDate())
                .patientId(form.getPatientId())
                .patientName(form.getPatientName())
                .patientIdentity(form.getPatientIdentity())
                .totalAmount(form.getTotalAmount())
                .build();
        registration = registrationRepo.save(registration);
        createRegistrationDetails(form.getServices(), registration.getRegistrationId());
        recordResultService.createRecordResultFromRegistration(form, registration.getRegistrationId());
    }

    private void createRegistrationDetails(List<RegistrationDetail> details, Integer registrationId) {
        details.forEach(item -> item.setRegistrationId(registrationId));
        registrationDetailRepo.saveAll(details);
    }

}
