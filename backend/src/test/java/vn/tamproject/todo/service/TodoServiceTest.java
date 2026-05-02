package vn.tamproject.todo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import vn.tamproject.todo.entity.Todo;
import vn.tamproject.todo.repository.TodoRepository;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @Test
    public void createTodo_shouldReturnCreatedTodo() {
        Todo todo = new Todo();
        todo.setTitle("Test Task");
        todo.setUsername("user@gmail.com");

        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        Todo created = todoService.createTodo(todo);

        assertNotNull(created);
        assertEquals("Test Task", created.getTitle());
    }

    @Test
    public void handleGetTodo_shouldReturnUserTodos() {
        String username = "user@gmail.com";
        Todo todo1 = new Todo();
        todo1.setUsername(username);
        Todo todo2 = new Todo();
        todo2.setUsername(username);

        when(todoRepository.findAllByUsername(username)).thenReturn(Arrays.asList(todo1, todo2));

        List<Todo> results = todoService.handleGetTodo(username);

        assertEquals(2, results.size());
        verify(todoRepository).findAllByUsername(username);
    }

    @Test
    public void handleUpdateTodo_shouldSaveUpdatedTodo_WhenExists() {
        Long id = 1L;
        Todo existingTodo = new Todo();
        existingTodo.setId(id);
        existingTodo.setTitle("Old Title");

        Todo inputTodo = new Todo();
        inputTodo.setTitle("New Title");
        inputTodo.setCompleted(true);

        when(todoRepository.findById(id)).thenReturn(Optional.of(existingTodo));

        todoService.handleUpdateTodo(id, inputTodo);

        assertEquals("New Title", existingTodo.getTitle());
        assertEquals(true, existingTodo.isCompleted());
        verify(todoRepository).save(existingTodo);
    }
}
