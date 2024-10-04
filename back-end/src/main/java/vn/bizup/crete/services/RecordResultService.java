package vn.bizup.crete.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vn.bizup.crete.models.dto.RecordResultForm;
import vn.bizup.crete.models.dto.RegistrationForm;
import vn.bizup.crete.models.entities.*;
import vn.bizup.crete.repositories.*;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RecordResultService {
    private final IRecordResultDetailRepo recordResultDetailRepo;
    private final IPrescriptionRepo prescriptionRepo;
    private final IRecordResultRepo recordResultRepo;
    private final IRegistrationDetailRepo registrationDetailRepo;
    private final IServiceRepo serviceRepo;
    private final IRegistrationRepo registrationRepo;

//    @Transactional
//    public void createRecordResult(RecordResultForm form) {
//        var recordResult = RecordResult.builder()
//                .createDate(form.getCreateDate())
//                .current(form.getCurrent())
//                .history(form.getHistory())
//                .diagnose(form.getDiagnose())
//                .patientId(form.getPatientId())
//                .build();
//        recordResult = recordResultRepo.save(recordResult);
//        createRecordResultDetail(form.getDetails(), recordResult.getRecordResultId());
//        createPrescription(form.getPrescriptions(), recordResult.getRecordResultId());
//    }

    @Transactional
    public void createRecordResultFromRegistration(RegistrationForm form, Integer registrationId) {
        var recordResult = RecordResult.builder()
                .registrationId(registrationId)
                .createDate(form.getCreateDate())
                .patientId(form.getPatientId())
                .patientName(form.getPatientName())
                .patientIdentity(form.getPatientIdentity())
                .build();
        recordResult = recordResultRepo.save(recordResult);
        var services = form.getServices();
        if (services.isEmpty()) return;
        List<RecordResultDetail> details = new ArrayList<>();
        for (var service : services) {
            var recordResultDetail = RecordResultDetail.builder()
                    .serviceName(service.getServiceName())
                    .serviceId(service.getServiceId())
                    .recordResultId(recordResult.getRecordResultId())
                    .build();
            details.add(recordResultDetail);
        }
        recordResultDetailRepo.saveAll(details);
    }

//    private void createPrescription(List<Prescription> prescriptions, Integer recordResultId) {
//        if (prescriptions.isEmpty()) return;
//        prescriptions.forEach(item -> {
//            item.setRecordResultId(recordResultId);
//        });
//
//        prescriptionRepo.saveAll(prescriptions);
//    }

//    void createRecordResultDetail(List<RecordResultDetail> detailList, Integer recordResultId) {
//        if (detailList.isEmpty()) return;
//        detailList.forEach(item -> {
//            item.setRecordResultId(recordResultId);
//        });
//        recordResultDetailRepo.saveAll(detailList);
//    }

    @Transactional
    public void updateRecordResult(RecordResultForm form) {
        var recordResult = RecordResult.builder()
                .recordResultId(form.getRecordResultId())
                .registrationId(form.getRegistrationId())
                .createDate(form.getCreateDate())
                .current(form.getCurrent())
                .history(form.getHistory())
                .diagnose(form.getDiagnose())
                .patientId(form.getPatientId())
                .patientIdentity(form.getPatientIdentity())
                .patientName(form.getPatientName())
                .build();
        recordResultRepo.save(recordResult);
        updateRecordResultDetail(form.getRecordResultId(), form.getDetails());
        updatePrescriptions(form.getPrescriptions());
        updateRegistration(form.getRegistrationId(), form.getDetails());
    }

    private void updateRecordResultDetail(Integer recordResultId, List<RecordResultDetail> details) {
        List<RecordResultDetail> savedDetails = recordResultDetailRepo.saveAll(details);
        List<Integer> ids = new ArrayList<>();
        savedDetails.forEach(item -> {
            ids.add(item.getRecordResultDetailId());
        });
        recordResultDetailRepo.deleteServices(recordResultId, ids);
    }

    private void updatePrescriptions(List<Prescription> prescriptions) {
        List<Prescription> savePrescriptions = prescriptionRepo.saveAll(prescriptions);
        List<Integer> ids = new ArrayList<>();
        savePrescriptions.forEach(item -> {
            ids.add(item.getPrescriptionId());
        });
        prescriptionRepo.deletePrescriptions(ids);
    }

    private void updateRegistration(Integer registrationId, List<RecordResultDetail> details) {
        double updatedAmount = 0.0;
        registrationDetailRepo.deleteByRegistrationId(registrationId);
        List<RegistrationDetail> registrationDetails = new ArrayList<>();
        for (var item : details) {
            Service service = serviceRepo.findServiceById(item.getServiceId());
            RegistrationDetail detail = RegistrationDetail.builder()
                    .price(service.getPrice())
                    .serviceId(service.getServiceId())
                    .registrationId(registrationId)
                    .serviceName(service.getServiceName())
                    .build();
            updatedAmount += service.getPrice();
            registrationDetails.add(detail);
        }
        registrationRepo.updateTotalAmount(registrationId, updatedAmount);
        registrationDetailRepo.saveAll(registrationDetails);
    }
}
