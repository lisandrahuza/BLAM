package com.example.server.User;

public class InvalidException extends Exception {
    public InvalidException(String errorMessage) {
        super(errorMessage);
    }
}