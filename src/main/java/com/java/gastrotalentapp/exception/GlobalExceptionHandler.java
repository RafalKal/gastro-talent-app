package com.java.gastrotalentapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(EmailExistsException.class)
  public ResponseEntity<?> handleEmailExistsException(EmailExistsException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<?> handleValidationException(BindException ex) {
    Map<String, Object> response = new HashMap<>();
    response.put("status", HttpStatus.BAD_REQUEST.value());
    response.put("error", "Bad Request");
    response.put("message", "Validation error");

    List<String> validationErrors = ex.getFieldErrors().stream()
            .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
            .collect(Collectors.toList());

    response.put("errors", validationErrors);

    return ResponseEntity.badRequest().body(response);
  }

  // TODO trzeba tu pomyślec czy powinno zwracać szczegóły bledy czy tylko bad request TA METODA
  // WYZEJ TEZ
  @ExceptionHandler(HttpMessageNotReadableException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<Map<String, Object>> handleHttpMessageNotReadableException(
      HttpMessageNotReadableException ex) {
    //        Map<String, String> errorMap = new HashMap<>();
    //        errorMap.put("message", "Invalid JSON request");
    //        errorMap.put("details", ex.getMessage());
    //
    //        return ResponseEntity.badRequest().body(errorMap);
    Map<String, Object> errorMap = new HashMap<>();
    errorMap.put("timestamp", LocalDateTime.now());
    errorMap.put("status", HttpStatus.BAD_REQUEST.value());
    errorMap.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
    errorMap.put("path", "/api/v1/auth/register");

    return ResponseEntity.badRequest().body(errorMap);
  }
}
