package com.java.gastrotalentapp.exception;

public class EmailExistsException extends RuntimeException {
  public EmailExistsException(String message) {
    super(message);
  }
}
