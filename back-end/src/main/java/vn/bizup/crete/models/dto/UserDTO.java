package vn.bizup.crete.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface UserDTO {
    @JsonProperty("userId")
    Integer getUser_Id();

    @JsonProperty("phone")
    String getPhone();

    @JsonProperty("fullName")
    String getFull_Name();

    @JsonProperty("role")
    String getRole();
}
