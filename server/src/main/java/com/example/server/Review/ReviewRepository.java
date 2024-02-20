package com.example.server.Review;
import com.example.server.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository  extends JpaRepository<Review, Long> {

    @Query("delete  from Review WHERE idReview =  ?1")
    void deleteReview(Long idReview);

    @Query("select r from Review r where r.user= ?1")
    List<Review> getReviewsByUser(Long id);

    @Query("select r from Review r where r.idFilm= ?1")
    List<Review> getReviewsByFilm(String film);

    @Query("UPDATE Review SET mesaj = ?2 WHERE idReview =  ?1")
    void editReviews(Long idReview,String mesaj);

    @Query("select mesaj from Review where idReview= ?1")
    Optional<String> findReviewById(Long idReview);
}