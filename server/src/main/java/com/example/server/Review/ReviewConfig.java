package com.example.server.Review;
import com.example.server.User.User;
import com.example.server.User.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;
@Configuration
public class ReviewConfig {
    @Bean
    CommandLineRunner commandLineRunnerReview(ReviewRepository reviewRepository){
        return args -> {
            User bogdan = new User("Bogdan","b@gamil.com", "bogdan",Boolean.FALSE);
            Review r1 = new Review("primul mesaj",bogdan, LocalDate.now(),9.5f);

//            reviewRepository.saveAll(List.of(r1));
        };
    }
}