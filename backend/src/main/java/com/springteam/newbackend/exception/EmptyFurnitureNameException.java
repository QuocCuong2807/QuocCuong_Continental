package com.springteam.newbackend.exception;

public class EmptyFurnitureNameException extends RuntimeException{
    public EmptyFurnitureNameException(String message) {
        super(message);
    }

    public EmptyFurnitureNameException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmptyFurnitureNameException(Throwable cause) {
        super(cause);
    }
}
