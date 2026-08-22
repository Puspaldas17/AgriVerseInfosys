package com.agriverse1.agriverse1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Request body for POST /api/user/profile -- update farmer profile details.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateDto {

    private String name;
    private String phone;
    private String soilType;
    private Double landSize;
    private String language;
}
