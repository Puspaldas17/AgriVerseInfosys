package com.agriverse1.agriverse1.dto;

public class ApiResponse {

    private String message;


    public ApiResponse(String message) {
        this.message = message;
    }


    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }
}