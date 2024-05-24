package com.springteam.newbackend.exception;

public class InvalidBookingException extends RuntimeException{
    public InvalidBookingException(String message) {
        super(message);
    }

    public InvalidBookingException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidBookingException(Throwable cause) {
        super(cause);
    }
}
