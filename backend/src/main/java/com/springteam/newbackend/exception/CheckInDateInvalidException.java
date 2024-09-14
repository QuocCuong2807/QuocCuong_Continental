package com.springteam.newbackend.exception;

public class CheckInDateInvalidException extends RuntimeException{
    public CheckInDateInvalidException(String message) {
        super(message);
    }

    public CheckInDateInvalidException(String message, Throwable cause) {
        super(message, cause);
    }

    public CheckInDateInvalidException(Throwable cause) {
        super(cause);
    }
}
