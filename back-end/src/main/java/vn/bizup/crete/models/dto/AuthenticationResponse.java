package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("accessToken")
    private String accessToken;
    @JsonProperty("refreshToken")
    private String refreshToken;
    @JsonProperty("role")
    private String role;
    @JsonProperty("userId")
    private Integer userId;
    @JsonProperty("fullName")
    private String fullName;
}
