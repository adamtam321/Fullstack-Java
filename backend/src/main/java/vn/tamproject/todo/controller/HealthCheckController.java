package vn.tamproject.todo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vn.tamproject.todo.repository.UserRepository;

@RestController
@RequestMapping("/api/public")
public class HealthCheckController {

    private final UserRepository userRepository;

    public HealthCheckController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/health-check", method = {RequestMethod.GET, RequestMethod.HEAD})
    public ResponseEntity<String> healthCheck() {
        // Perform a lightweight database operation to keep the connection/database active
        userRepository.count();
        return ResponseEntity.ok("OK");
    }
}
