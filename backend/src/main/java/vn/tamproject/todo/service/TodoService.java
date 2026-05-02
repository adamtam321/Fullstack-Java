package vn.tamproject.todo.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.tamproject.todo.entity.Todo;
import vn.tamproject.todo.repository.TodoRepository;

@Service
public class TodoService {

	private final TodoRepository todoRepository;

	public TodoService(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	public Todo getTodoById(Long id) {
		Optional<Todo> todoOptional = this.todoRepository.findById(Objects.requireNonNull(id));
		return todoOptional.isPresent() ? todoOptional.get() : null;

	}

	public Todo createTodo(Todo todo) {
		Todo createdTodo = this.todoRepository.save(Objects.requireNonNull(todo));
		return createdTodo;
	}

	public Todo handleCreateTodo(Todo todo) {
		Todo createdTodo = this.todoRepository.save(Objects.requireNonNull(todo));
		return createdTodo;
	}

	public List<Todo> handleGetTodo(String username) {
		return this.todoRepository.findAllByUsername(username);
	}

	public void handleUpdateTodo(Long id, Todo inputTodo) {

		Optional<Todo> todoOptional = this.todoRepository.findById(Objects.requireNonNull(id));
		if (todoOptional.isPresent()) {
			Todo currentTodo = todoOptional.get();

			currentTodo.setTitle(inputTodo.getTitle());
			currentTodo.setDescription(inputTodo.getDescription());
			currentTodo.setPriority(inputTodo.getPriority());
			currentTodo.setDueDate(inputTodo.getDueDate());
			currentTodo.setCompleted(inputTodo.isCompleted());
			currentTodo.setUsername(inputTodo.getUsername());

			this.todoRepository.save(currentTodo);
		}
	}

	public void handleDeleteTodo(Long id) {

		this.todoRepository.deleteById(Objects.requireNonNull(id));

	}

}
