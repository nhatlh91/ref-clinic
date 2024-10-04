package vn.bizup.crete.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @NotNull
    private Integer userId;
    @NotNull
    private String password;
}
