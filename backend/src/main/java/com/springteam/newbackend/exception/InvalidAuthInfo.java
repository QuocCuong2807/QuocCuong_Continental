package com.springteam.newbackend.exception;

public class InvalidAuthInfo extends RuntimeException{
    public InvalidAuthInfo(String message) {
        super(message);
    }

    public InvalidAuthInfo(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidAuthInfo(Throwable cause) {
        super(cause);
    }
}
