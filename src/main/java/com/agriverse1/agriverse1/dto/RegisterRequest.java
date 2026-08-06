package com.agriverse1.agriverse1.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String name;

    private String email;

    private String password;
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}