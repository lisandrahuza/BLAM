package com.example.server.Review;
import com.example.server.User.InvalidException;
import com.example.server.User.User;
import com.example.server.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/review")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> GetReviews(){
        return this.reviewService.GetReviews();
    }

    @GetMapping(path = "/review/getReviewUser")
    public List<Review> getReviewsByUser(@RequestBody User user){
        return this.reviewService.getReviewsByUser(user.getId());
    }

    @GetMapping(path = "/review/getReviewFilm")
    public List<Review> getReviewsByFilm( @RequestBody String film){
        return this.reviewService.getReviewsByFilm(film);
    }

    @PutMapping(path = "/review/editReview")
    public void editReviews(@RequestBody Long idReview,String mesaj){
        try {
            this.reviewService.editReviews(idReview,mesaj);
        }catch (InvalidExceptionReview e) {
            System.out.println(e.getMessage());
        }
    }

    @PostMapping
    public void addReview(@RequestBody Review review){
        this.reviewService.addNewReview(review);
    }

    @DeleteMapping(path = "{reviewId}")
    public void deleteReview(@PathVariable("reviewId") Long reviewId){
        reviewService.deleteReview(reviewId);
    }
}
