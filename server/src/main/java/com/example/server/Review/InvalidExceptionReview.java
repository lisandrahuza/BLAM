package com.example.server.Review;

public class InvalidExceptionReview extends Exception {
    public InvalidExceptionReview(String errorMessage) {
        super(errorMessage);
    }
}