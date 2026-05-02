package vn.tamproject.todo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Welcome to Fullstack Task Management API");
        response.put("version", "1.0.0");
        response.put("author", "Tam (Adam Tam)");
        response.put("documentation", "/swagger-ui/index.html");
        return response;
    }
}
