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

import vn.tamproject.todo.entity.ApiResponse;
import vn.tamproject.todo.entity.Todo;
import vn.tamproject.todo.service.TodoService;

@RestController
public class TodoController {

	private final TodoService todoService;

	public TodoController(TodoService todoService) {
		this.todoService = todoService;
	}

	@GetMapping("/todos/{id}")
	public ResponseEntity<ApiResponse<Todo>> getTodoById(@PathVariable Long id) {
		Todo todoData = this.todoService.getTodoById(id);
		if (todoData != null) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Success", todoData, null));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "Todo not found", null, "NOT_FOUND"));
	}

	@GetMapping("/todos")
	public ResponseEntity<ApiResponse<List<Todo>>> getTodos() {
		String currentUsername = org.springframework.security.core.context.SecurityContextHolder.getContext()
				.getAuthentication().getName();
		List<Todo> listTodo = this.todoService.handleGetTodo(currentUsername);
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Success", listTodo, null));
	}

	@PostMapping("/todos")
	public ResponseEntity<ApiResponse<Todo>> createTodo(@RequestBody Todo input) {
		Todo newTodo = this.todoService.handleCreateTodo(input);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse<>(HttpStatus.CREATED, "Created", newTodo, null));
	}

	@PutMapping("/todos/{id}")
	public ResponseEntity<ApiResponse<Todo>> updateTodo(@PathVariable Long id, @RequestBody Todo input) {
		this.todoService.handleUpdateTodo(id, input);
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Updated", null, null));
	}

	@DeleteMapping("/todos/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteTodo(@PathVariable Long id) {
		this.todoService.handleDeleteTodo(id);
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Deleted", null, null));
	}

	@GetMapping("/hoidanit")
	public ApiResponse<Todo> hoidanit() {
		Todo test = new Todo("Test Title", "Test Description", "MEDIUM", "2026-05-01", "hoidanit", false);
		return new ApiResponse<>(HttpStatus.OK, "Success", test, null);
	}
}
