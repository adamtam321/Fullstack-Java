package vn.tamproject.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import vn.tamproject.todo.entity.User;
import vn.tamproject.todo.repository.UserRepository;
import vn.tamproject.todo.service.UserService;

@SpringBootApplication
public class TodoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(UserService userService, UserRepository userRepository) {
		return args -> {
			if (userRepository.count() == 0) {
				User admin = new User();
				admin.setName("Admin User");
				admin.setEmail("admin@gmail.com");
				admin.setPassword("password");
				admin.setRole("ADMIN");
				userService.createUser(admin);
				System.out.println(">>> Initialized default Admin: admin@gmail.com / password");
			}
		};
	}
}
