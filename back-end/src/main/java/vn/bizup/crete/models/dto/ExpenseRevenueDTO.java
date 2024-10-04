package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExpenseRevenueDTO {
    private int month;
    private double clinicExpense;
    private double clinicRevenue;
    private double pharmacyExpense;
    private double pharmacyRetailRevenue;
    private double pharmacyServiceRevenue;
}
