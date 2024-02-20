package com.example.server.Movie;

import java.util.ArrayList;

public class Movie {
    private  Integer year;
    private String id;
    private String plotLine;
    private ArrayList<String> gen;
    private String author;
    private String name;
    private double rating;
    private String image;
    private String description;
    private String category;
    private String type;
    private ArrayList<Actor> actors;

    public ArrayList<Actor> getActors() {
        return actors;
    }

    public void setActors(ArrayList<Actor> actors) {
        this.actors = actors;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getPlotLine() {
        return plotLine;
    }

    public void setPlotLine(String plotLine) {
        this.plotLine = plotLine;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }



    public ArrayList<String> getGen() {
        return gen;
    }

    public void setGen(ArrayList<String> gen) {
        this.gen = gen;
    }



    // constructor
    public Movie(String id, String name, double rating, String image, String description,String type) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.category = category;
        this.type = type;

    }


    public Movie(String id, String name, double rating, String image, String description, ArrayList<String> gen, String type, Integer year, String plotLine, String author,ArrayList<Actor> actors) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.type = type;
        this.year=year;
        this.plotLine=plotLine;
        this.author=author;
        this.gen=gen;
        this.actors=actors;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
