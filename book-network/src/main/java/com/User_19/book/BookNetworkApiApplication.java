package com.User_19.book;

import com.User_19.book.book.BookRepository;
import com.User_19.book.feedback.Feedback;
import com.User_19.book.feedback.FeedbackRepository;
import com.User_19.book.feedback.FeedbackResponse;
import com.User_19.book.feedback.FeedbackService;
import com.User_19.book.role.Role;
import com.User_19.book.role.RoleRepository;
import com.User_19.book.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.LocalDateTime;


@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync


public class BookNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookNetworkApiApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner runner(RoleRepository roleRepository){
//		return args ->{
//			if(roleRepository.findByName("USER").isEmpty()){
//				roleRepository.save(
//						Role.builder().name("USER").build()
//				);
//			}
//		};
//	}

}
