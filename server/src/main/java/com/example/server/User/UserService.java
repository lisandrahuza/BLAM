package com.example.server.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    private static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public List<User> GetUsers() {
        return this.userRepository.findAll();
    }

    public void addNewUser(User user) throws InvalidException  {
        Optional<User> optionalUser2 = userRepository.findUserByEmail(user.getEmail());
        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("The email entered is not valid.");
        }
        if(optionalUser2.isPresent()){
            throw new IllegalStateException("email taken");
        }
        if(isPasswordValid(user.getPassword())==false) {
            throw new InvalidException("The password entered is not valid. ");
        }
        userRepository.save(user);
    }

    public Optional<User> loginUserS(User user) throws InvalidException  {
        Optional<User> optionalUser = userRepository.findUserByEmail(user.getEmail());
        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("The email entered is not valid.");
        }
        if(optionalUser.isEmpty()){
            throw new IllegalStateException("user not found");
        }
        String password=userRepository.getPasswordByEmail(user.getEmail());
        if(!password.equals(user.getPassword()))
        {
            throw new InvalidException("incorrect password.");
        }
        return optionalUser;
    }

    public void modifyUserByAdminId( User user) throws InvalidException
    {
        Optional<User> optionalUser = userRepository.findUserById(user.getId());

        if(optionalUser.isEmpty()){
            throw new IllegalStateException("user not found");
        }
        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("The email entered is not valid.");
        }
        if(isPasswordValid(user.getPassword())==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        if(user.getEmail().length()!=0)
        {
            userRepository.editEmail(user.getId(), user.getEmail());
        }
        if(user.getPassword().length()!=0)
        {
            userRepository.editPassword(user.getId(),user.getPassword());
        }
        if(user.getName().length()!=0)
        {
            userRepository.editName(user.getId(),user.getName());
        }
        if(user.getAdmin().equals(true))
        {
            userRepository.editAdmin(user.getId(),user.getAdmin());
        }
    }
    public Optional<User> modifyUserId(User user)  throws InvalidException  {
        Optional<User> optionalUser = userRepository.findUserById(user.getId());
        if(optionalUser.isEmpty()){
            throw new IllegalStateException("user not found");
        }
        if(isEmailValid(user.getEmail())==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        if(isPasswordValid(user.getPassword())==false) {
            throw new InvalidException("The password entered is not valid.");
        }
        if(user.getEmail().length()!=0)
        {
            userRepository.editEmail(user.getId(),user.getEmail());
        }
        if(user.getPassword().length()!=0)
        {
            userRepository.editPassword(user.getId(),user.getPassword());
        }
        if(user.getName().length()!=0)
        {
            userRepository.editName(user.getId(),user.getName());
        }
        Optional<User> optionalUser2 = userRepository.findUserByEmail(user.getEmail());
        return optionalUser2;
    }
    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if(!exists){
            throw new IllegalStateException("user with "+userId+" does not exist");
        }
        userRepository.deleteById(userId);
    }


    public boolean isEmailValid(String email) {
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }

    public boolean isPasswordValid(String password) {
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        return matcher.matches();
    }


}
