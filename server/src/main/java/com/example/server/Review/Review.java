package com.example.server.Review;
import com.example.server.User.User;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @SequenceGenerator(name = "review_sequence",sequenceName = "review_sequence",allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "review_sequence"
    )
    private Long idReview;
    private String mesaj;
    @ManyToOne
    @JoinColumn(name="id")
    private User user;
    private LocalDate data;
    private Float rating;

    @SequenceGenerator(name = "idf_sequence",sequenceName = "idf_sequence",allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "idf_sequence"
    )
    private String idFilm;

    public Review() {

    }

    public String getId() {
        return idFilm;
    }

    public void setId(String idFilm) {
        this.idFilm = idFilm;
    }

    @Override
    public String toString() {
        return "Review{" +
                "mesaj='" + mesaj + '\'' +
                ", user=" + user +
                ", data=" + data +
                ", rating=" + rating +
                ", film=" + idFilm +
                '}';
    }

    public Review( String mesaj, User user, LocalDate data, Float rating, String film) {
        this.mesaj = mesaj;
        this.user = user;
        this.data = data;
        this.rating = rating;
        this.idFilm = film;
    }

    public Review( String mesaj, User user, LocalDate data, Float rating) {
        this.mesaj = mesaj;
        this.user = user;
        this.data = data;
        this.rating = rating;
    }

    public String getMesaj() {
        return mesaj;
    }

    public void setMesaj(String mesaj) {
        this.mesaj = mesaj;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getFilm() {
        return idFilm;
    }

    public void setFilm(String  idFilm) {
        this.idFilm = idFilm;
    }


}