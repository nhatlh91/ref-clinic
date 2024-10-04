package vn.bizup.crete.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.dto.DailyRevenueDTO;
import vn.bizup.crete.models.dto.ExpenseRevenueDTO;
import vn.bizup.crete.models.dto.RevenueByPatientDTO;
import vn.bizup.crete.repositories.*;
import vn.bizup.crete.services.RegistrationService;

import java.time.Year;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${apiPrefix}/report")
@RequiredArgsConstructor
public class ReportController {
    private final IRegistrationRepo registrationRepo;
    private final IRecordResultDetailRepo recordResultDetailRepo;
    private final IImportVoucherRepo importVoucherRepo;
    private final IExportVoucherRepo exportVoucherRepo;

    @GetMapping("revenue-by-patient/year/{year}")
    public ResponseEntity<?> getRevenueByPatientList(@PathVariable("year") Integer year) {
        var response = registrationRepo.findRevenueByPatient(year);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("service-count-by-doctor")
    public ResponseEntity<?> getServiceByDoctor(@RequestParam("year") Optional<Integer> year,
                                                @RequestParam("month") Optional<Integer> month) {
        var queryYear = year.orElse(Year.now().getValue());
        var queryMonth = month.orElse(null);
        var response = recordResultDetailRepo.findTotalServiceByDoctor(queryYear, queryMonth);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("revenue-expense/year/{year}")
    public ResponseEntity<?> getRevenueAndExpenseByYear(@PathVariable("year") Integer year) {
        List<ExpenseRevenueDTO> response = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            double clinicRevenue = registrationRepo.findTotalRevenueByMonth(year, i).orElse(0.0);
            double pharmacyExpense = importVoucherRepo.findTotalExpenseByMonth(year, i).orElse(0.0);
            double pharmacyRetailRevenue = exportVoucherRepo.findTotalRevenueByMonth(year, i, "retail").orElse(0.0);
            double pharmacyServiceRevenue = exportVoucherRepo.findTotalRevenueByMonth(year, i, "withService").orElse(0.0);
            response.add(ExpenseRevenueDTO.builder()
                    .month(i)
                    .clinicRevenue(clinicRevenue)
                    .pharmacyExpense(pharmacyExpense)
                    .pharmacyRetailRevenue(pharmacyRetailRevenue)
                    .pharmacyServiceRevenue(pharmacyServiceRevenue)
                    .build());
        }
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("daily-revenue")
    public ResponseEntity<?> getDailyRevenue(@RequestParam("year") Optional<Date> date) {
        Date queryDate = date.orElse(new Date());
        double clinicRevenue = registrationRepo.findDailyRevenue(queryDate).orElse(0.0);
        double pharmacyRetailRevenue = exportVoucherRepo.findDailyRevenue(queryDate, "retail").orElse(0.0);
        double pharmacyServiceRevenue = exportVoucherRepo.findDailyRevenue(queryDate, "withService").orElse(0.0);
        var response = DailyRevenueDTO.builder()
                .clinicRevenue(clinicRevenue)
                .pharmacyServiceRevenue(pharmacyServiceRevenue)
                .pharmacyRetailRevenue(pharmacyRetailRevenue)
                .build();
        return ResponseEntity.ok(response);
    }
}
