package com.User_19.book.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TokenRepository {//extends JpaRepository<Token,Integer> {
   // Optional<Token> findByToken(String Token);
}
