package com.RealState.Project.Utils;


import com.RealState.Project.Exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleUserNotFound(UserNotFoundException ex){

        ApiError error = ApiError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(new ApiResponse<>(error), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AgentNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleAgentNotFound(AgentNotFoundException ex){

        ApiError error = ApiError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(new ApiResponse<>(error), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OfficeNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleOfficeNotFound(OfficeNotFoundException ex){

        ApiError error = ApiError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(new ApiResponse<>(error), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(QueryUseOtherThanSelectException.class)
    public ResponseEntity<ApiResponse<?>> handleQueryException(QueryUseOtherThanSelectException ex){

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(new ApiResponse<>(error), HttpStatus.BAD_REQUEST);
    }

    // JWT Expired / Unauthorized
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGeneral(Exception ex){

        ApiError error = ApiError.builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message(ex.getMessage())
                .build();

        return new ResponseEntity<>(new ApiResponse<>(error), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Access denied
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<?>> handleAccessDenied(AccessDeniedException ex){

        ApiError error = ApiError.builder()
                .status(HttpStatus.FORBIDDEN)
                .message("Access Denied")
                .build();

        return new ResponseEntity<>(new ApiResponse<>(error), HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNotFound(){

        ApiError error = ApiError.builder()
                .status(HttpStatus.NOT_FOUND)
                .message("Wrong API endpoint")
                .build();

        return new ResponseEntity<>(
                new ApiResponse<>(error),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiResponse<?>> handleWrongMethod(){

        ApiError error = ApiError.builder()
                .status(HttpStatus.METHOD_NOT_ALLOWED)
                .message("Wrong HTTP Method")
                .build();

        return new ResponseEntity<>(
                new ApiResponse<>(error),
                HttpStatus.METHOD_NOT_ALLOWED
        );
    }


}