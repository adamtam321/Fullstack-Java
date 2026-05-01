package vn.tamproject.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.tamproject.todo.entity.ApiResponse;
import vn.tamproject.todo.entity.User;
import vn.tamproject.todo.service.UserService;

@RestController
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/users")
	public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody User user) {
		try {
			User created = userService.createUser(user);
			var result = new ApiResponse<>(HttpStatus.CREATED, "createUser", created, null);
			return ResponseEntity.status(HttpStatus.CREATED).body(result);
		} catch (IllegalArgumentException e) {
			var errorResult = new ApiResponse<User>(HttpStatus.BAD_REQUEST, e.getMessage(), null, "BAD_REQUEST");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResult);
		}
	}

	@GetMapping("/users")
	public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
		var result = new ApiResponse<>(HttpStatus.OK, "getAllUsers", userService.getAllUsers(), null);
		return ResponseEntity.ok().body(result);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
		return userService.getUserById(id).map(user -> {
			var response = new ApiResponse<>(HttpStatus.OK, "getUserById", user, null);
			return ResponseEntity.ok(response);

		}).orElseGet(() -> {
			ApiResponse<User> errorResponse = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"ユーザーIDが見つかりません: " + id, null, "USER_NOT_FOUND");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
		});
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Long id, @RequestBody User user) {
		User updated = userService.updateUser(id, user);
		var result = new ApiResponse<>(HttpStatus.OK, "updateUser", updated, null);

		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<ApiResponse<User>> deleteUser(@PathVariable Long id) {

		userService.deleteUser(id);

		ApiResponse<User> result = new ApiResponse<>(HttpStatus.NO_CONTENT, "deleteUser", null, null);
		return ResponseEntity.ok(result);
	}
}
