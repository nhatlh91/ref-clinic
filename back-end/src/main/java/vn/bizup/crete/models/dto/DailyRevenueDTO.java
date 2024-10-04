package vn.bizup.crete.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DailyRevenueDTO {
    private double clinicRevenue;
    private double pharmacyRetailRevenue;
    private double pharmacyServiceRevenue;
}
