package com.RealState.Project.Utils;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ApiResponse<T> {
    private LocalDateTime timestamp;
    private ApiError error;
    private T  data;

    public ApiResponse(){
        this.timestamp = LocalDateTime.now();
    }

    public ApiResponse(ApiError error) {
        this();
        this.error = error;
    }

    public ApiResponse(T data){
        this.data = data;
    }

}
