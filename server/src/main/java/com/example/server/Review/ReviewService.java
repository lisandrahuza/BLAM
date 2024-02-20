package com.example.server.Review;
import com.example.server.User.InvalidException;
import com.example.server.User.User;
import com.example.server.User.UserRepository;
import com.example.server.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository,UserRepository userRepository){
        this.reviewRepository=reviewRepository;
        this.userRepository=userRepository;
    }

    public List<Review> GetReviews() {
        return this.reviewRepository.findAll();
    }

    public void addNewReview(Review review)  {
        review.setData(LocalDate.now());
        reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        boolean exists = reviewRepository.existsById(reviewId);
        if(!exists){
            throw new IllegalStateException("review with "+reviewId+" does not exist");
        }
        reviewRepository.deleteReview(reviewId);
    }

    public List<Review> getReviewsByUser(Long user) {
        Optional<User> optionalUser1 = userRepository.findUserById(user);
        if(!optionalUser1.isPresent()){
            throw new IllegalStateException("user not found");
        }
        return reviewRepository.getReviewsByUser(user);
    }

    public List<Review> getReviewsByFilm(String film) {
        return reviewRepository.getReviewsByFilm(film);
    }

    public void editReviews(Long idReview,String mesaj) throws InvalidExceptionReview {
        Optional<String> optionalReview = reviewRepository.findReviewById(idReview);
        if(!optionalReview.isPresent()){
            throw new IllegalStateException("review not found");
        }
        reviewRepository.editReviews(idReview,mesaj);
    }
}