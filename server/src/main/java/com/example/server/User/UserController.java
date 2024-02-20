package com.example.server.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<User> GetUsers(){
        return this.userService.GetUsers();
    }

    @PostMapping
    public void registerUser(@RequestBody User user){
        user.setAdmin(false);
        try {
            this.userService.addNewUser(user);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        try {
            Optional<User> User = this.userService.loginUserS(user);
            return ResponseEntity.ok(User);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PutMapping("/admin/modifyUser")
    public void modifyUserByAdmin(@RequestBody User user){
        user.setAdmin(false);
        try {
            this.userService.modifyUserByAdminId(user);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
        }
    }
    @PutMapping("/modifyUser")
    public ResponseEntity<?> modifyUser(@RequestBody User user){
        try {
            Optional<User> User = this.userService.modifyUserId(user);
            return ResponseEntity.ok(User);
        } catch (InvalidException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }
}