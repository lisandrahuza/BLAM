package com.example.server.Movie;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class ApiService {
    private static final String API_KEY = "61ebd8850dmsh147514a29ee0e44p1e8282jsnb4824aefe861";
    private static final String HOST = "imdb8.p.rapidapi.com";
    public ArrayList<Movie> searchByName(String movieName) throws Exception {
        if(!movieName.equals("rec")) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://imdb8.p.rapidapi.com/auto-complete?q=" + movieName))
                    .header("X-RapidAPI-Key", API_KEY)
                    .header("X-RapidAPI-Host", HOST)
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response.body());
            ArrayList<Movie> movies = new ArrayList<>();
            for (JsonNode movieNode : rootNode.path("d")) {
                String id = movieNode.path("id").asText();
                String name = movieNode.path("l").asText();
                double rating = movieNode.path("rank").asDouble();
                String image = movieNode.path("i").path("imageUrl").asText();
                String description = movieNode.path("s").asText();
                String type = movieNode.path("qid").asText();

                Movie movie = new Movie(id, name, rating, image, description, type);
                movies.add(movie);
            }
            return movies;
        }
        else
        {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&currentCountry=US&purchaseCountry=US&limit=5"))
                    .header("X-RapidAPI-Key", API_KEY)
                    .header("X-RapidAPI-Host", HOST)
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();
            String[] movieIds = responseBody.split(",");
            movieIds[0] = movieIds[0].substring(9, movieIds[0].length() - 2);
            for (int i = 1; i < movieIds.length-1; i++) {
                movieIds[i] = movieIds[i].substring(8, movieIds[i].length() - 2);
            }
            movieIds[ movieIds.length-1] = movieIds[ movieIds.length-1].substring(8, movieIds[ movieIds.length-1].length() - 3);

            ArrayList<Movie> movies = new ArrayList<>();
            int i=0;
            Iterator<String> iterator = Arrays.asList(movieIds).iterator();
            while (iterator.hasNext() && i<5) {
                movies.add(searchById(iterator.next()));
                i++;
            }
            return movies;
        }

    }

    public Movie searchById(String movieId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/auto-complete?q=" + movieId))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());
        JsonNode firstMovieNode = rootNode.path("d").get(0);

        String id = firstMovieNode.path("id").asText();
        String name = firstMovieNode.path("l").asText();
        double rating = firstMovieNode.path("rank").asDouble();
        String image = firstMovieNode.path("i").path("imageUrl").asText();
        String description = firstMovieNode.path("s").asText();
        String type = firstMovieNode.path("qid").asText();

        Movie movie = new Movie(id, name, rating, image, description,type);
        return movie;

    }



    public Movie searchByIdDetails(String movieId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst="+movieId+"&currentCountry=US"))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());

        String id = rootNode.path("id").asText();
        String name = rootNode.path("l").asText();
        double rating = rootNode.path("rank").asDouble();
        String image = rootNode.path("title").path("image").path("url").asText();
        String category = rootNode.path("genre").asText();
        String type = rootNode.path("qid").asText();
        Integer year=rootNode.path("year").asInt();
        JsonNode genresNode = rootNode.path("genres");
        ArrayList<String> gen = new ArrayList<>();
        for (JsonNode genreNode : genresNode) {
            gen.add(genreNode.asText());
        }
        String plotLine = rootNode.path("plotOutline").path("text").asText();
        String description = rootNode.path("plotSummary").path("text").asText();
        String author=rootNode.path("author").path("text").asText();
//        actori

        HttpRequest requestActors = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/get-top-cast?tconst="+movieId))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> responseActors = HttpClient.newHttpClient().send(requestActors, HttpResponse.BodyHandlers.ofString());
        String responseBody = responseActors.body();
        String[] actorsIds = responseBody.split(",");
        actorsIds[0] = actorsIds[0].substring(8, actorsIds[0].length() - 2);
        for (int i = 1; i <10; i++) {
            actorsIds[i] = actorsIds[i].substring(7, actorsIds[i].length() - 2);
        }

        ArrayList<Actor> actors = new ArrayList<>();
        int i=0;
        Iterator<String> iterator = Arrays.asList(actorsIds).iterator();
        while (iterator.hasNext() && i<10) {
            actors.add(searchByIdActor(iterator.next()));
            i++;
        }
        Movie movie = new Movie(id, name, rating, image, description, gen,type,year,plotLine,author,actors);
        return movie;


    }
    public ArrayList<Movie> searchByCategory(String category) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre="+category+"&limit=10"))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();
        String[] movieIds = responseBody.split(",");
        movieIds[0] = movieIds[0].substring(9, movieIds[0].length() - 2);
        for (int i = 1; i < movieIds.length-1; i++) {
            movieIds[i] = movieIds[i].substring(8, movieIds[i].length() - 2);
        }
        movieIds[ movieIds.length-1] = movieIds[ movieIds.length-1].substring(8, movieIds[ movieIds.length-1].length() - 3);

        ArrayList<Movie> movies = new ArrayList<>();

        Iterator<String> iterator = Arrays.asList(movieIds).iterator();
        while (iterator.hasNext()) {
            movies.add(searchById(iterator.next()));
        }

        return movies;
    }
    public Actor searchByIdActor(String actorId) throws Exception {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/actors/get-bio?nconst="+actorId))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());


        String name = rootNode.path("name").asText();
        String image = rootNode.path("image").path("url").asText();

        Actor actor = new Actor(actorId, name, image);
        return actor;

    }

    public Actor searchByIdActorDetails(String actorId) throws Exception {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://imdb8.p.rapidapi.com/actors/get-bio?nconst="+actorId))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", HOST)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response.body());


        String name = rootNode.path("name").asText();
        String image = rootNode.path("image").path("url").asText();
        String birthDate=rootNode.path("birthDate").asText();
        String birthPlace=rootNode.path("birthPlace").asText();
        String gender=rootNode.path("gender").asText();
//        String bio= rootNode.path("miniBios").path("text").asText();

        String bio="";
        JsonNode miniBiosArray = rootNode.path("miniBios");
        if (miniBiosArray.isArray() && miniBiosArray.size() > 0) {
            JsonNode firstMiniBio = miniBiosArray.get(0);
            bio = firstMiniBio.path("text").asText();
        }

        Actor actor = new Actor(actorId, name, birthDate, birthPlace,  gender,  bio,  image);
        return actor;

    }

//    public Actor search(String idActor) throws Exception {
////        HttpRequest requestActors = HttpRequest.newBuilder()
////                .uri(URI.create("https://imdb8.p.rapidapi.com/title/get-top-cast?tconst="+movieId))
////                .header("X-RapidAPI-Key", API_KEY)
////                .header("X-RapidAPI-Host", HOST)
////                .method("GET", HttpRequest.BodyPublishers.noBody())
////                .build();
////        HttpResponse<String> responseActors = HttpClient.newHttpClient().send(requestActors, HttpResponse.BodyHandlers.ofString());
////        String responseBody = responseActors.body();
////        String[] actorsIds = responseBody.split(",");
////        actorsIds[0] = actorsIds[0].substring(8, actorsIds[0].length() - 2);
////        for (int i = 1; i <10; i++) {
////            actorsIds[i] = actorsIds[i].substring(7, actorsIds[i].length() - 2);
////        }
//        Actor actor=searchByIdActor(idActor);
//
////        ArrayList<Actor> actors = new ArrayList<>();
////        int i=0;
////        Iterator<String> iterator = Arrays.asList(actorsIds).iterator();
////        while (iterator.hasNext() && i<10) {
////            actors.add(searchByIdActor(iterator.next()));
////            i++;
////        }
//
//
//        return actor;
//    }

}
