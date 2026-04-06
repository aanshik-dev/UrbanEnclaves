package com.RealState.Project.Utils;


import lombok.*;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class ApiError {
    public HttpStatus status;
    public String message;
}
