package com.example.server.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;

@RestController
public class MovieController {

    private final ApiService apiService;

    @Autowired
    public MovieController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/movie/{movieName}")
    public  ArrayList<Movie> searchByName(@PathVariable String movieName) throws Exception {
            return apiService.searchByName(movieName);
    }
    @GetMapping("/movie/category/{category}")
    public ArrayList<Movie> searchByCategory(@PathVariable String category) throws Exception {
        return apiService.searchByCategory(category);
    }

    @GetMapping("/movie/idMovie/{idMovie}")
    public Movie searchById(@PathVariable String idMovie) throws Exception {
        return apiService.searchById(idMovie);
    }

    @GetMapping("/movie/idMovieDetails/{idMovie}")
    public Movie searchByIdDetails(@PathVariable String idMovie) throws Exception {
        return apiService.searchByIdDetails(idMovie);
    }


//    @GetMapping("/actor/{idActor}")
//    public Actor search(@PathVariable String idActor) throws Exception {
//        return apiService.search(idActor);
//    }

//    @GetMapping("/movie/{movieName}")
//    public String searchByName(@PathVariable String movieName) throws Exception {
//            return apiService.searchByName(movieName);
//    }



}
