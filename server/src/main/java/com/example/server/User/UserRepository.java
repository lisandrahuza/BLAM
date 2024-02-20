package com.example.server.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select name from User where id= ?1")
    Optional<User> findUserById(Long id);

    @Query("select u from User u where u.email= ?1")
    Optional<User> findUserByEmail(String email);

    @Query("UPDATE User SET isAdmin = ?2 WHERE id =  ?1")
    Optional<User> editAdmin(Long id,Boolean is_admin);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.email = ?2 WHERE u.id = ?1")
    void editEmail(Long id, String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = ?2 WHERE u.id = ?1")
    void editPassword(Long id, String password);


    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.name = ?2 WHERE u.id = ?1")
    void editName(Long id, String name);

    @Query("delete  from User WHERE id =  ?1")
    void deleteById(Long id);

    @Query("select password from User where email= ?1")
    String getPasswordByEmail(String email);
}