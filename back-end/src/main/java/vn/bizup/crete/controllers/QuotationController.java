package vn.bizup.crete.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vn.bizup.crete.models.entities.QuotationDetail;
import vn.bizup.crete.repositories.IQuotationDetailRepo;

@RestController
@RequestMapping("${apiPrefix}/quotation")
@RequiredArgsConstructor
public class QuotationController {
    private final IQuotationDetailRepo quotationDetailRepo;

    @GetMapping()
    public ResponseEntity<?> findAll() {
        var response = quotationDetailRepo.findAllDTO();
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @PostMapping()
    public ResponseEntity<?> saveQuotationDetail(@Valid @RequestBody QuotationDetail quotationDetail,
                                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) return ResponseEntity.status(406).build();
        quotationDetailRepo.save(quotationDetail);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/customerType/{customerTypeId}")
    public ResponseEntity<?> findAllByCustomerTypeId(@PathVariable("customerTypeId") Short customerTypeId) {
        var response = quotationDetailRepo.findAllByCustomerType(customerTypeId);
        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getQuotationsByProductId(@PathVariable("productId") Integer productId) {
        var response = quotationDetailRepo.findAllByProductId(productId);
//        if (response.isEmpty()) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{quotationDetailId}")
    public ResponseEntity<?> findAllByCustomerTypeId(@PathVariable("quotationDetailId") Integer quotationDetailId) {
        quotationDetailRepo.deleteById(quotationDetailId);
        return ResponseEntity.ok().build();
    }
}
