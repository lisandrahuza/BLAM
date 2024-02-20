package com.example.server.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunnerUser(UserRepository userRepository){
        return args -> {
            User bogdan = new User("Bogdan","b@gamil.com", "Bogdan1!",Boolean.FALSE);
            User lisandra = new User("Lisandra","l@gamil.com","Lisandra1!",Boolean.TRUE);
            User adelina = new User("Adeina","a@gamil.com","adelina",Boolean.FALSE);

            userRepository.saveAll(List.of(bogdan,lisandra,adelina));
        };
    }
}