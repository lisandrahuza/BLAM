package com.example.server.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActorController {
    private final ApiService apiService;

    @Autowired
    public ActorController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/actor/idActor/{idActor}")
    public Actor searchByIdActor(@PathVariable String idActor) throws Exception {
        return apiService.searchByIdActor(idActor);
    }

    @GetMapping("/actor/idActorDetails/{idActor}")
    public Actor searchByIdActorDetails(@PathVariable String idActor) throws Exception {
        return apiService.searchByIdActorDetails(idActor);
    }
}
