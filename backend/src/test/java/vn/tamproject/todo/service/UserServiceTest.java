package vn.tamproject.todo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import vn.tamproject.todo.entity.User;
import vn.tamproject.todo.repository.UserRepository;
import vn.tamproject.todo.service.impl.UserServiceImpl;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
	// fake
	@Mock
	private UserRepository userRepository;

	@Mock
	private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

	// UserRepository(fake) => userService
	@InjectMocks
	private UserServiceImpl userService;

	@Test
	public void createUser_shouldReturnUser_WhenEmailValid() {
		// arrange : chuẩn bị
		User inputUser = new User(null, "tam", "minhtam.1198@gmail.com", "password", "USER");
		User outputUser = new User(1L, "tam", "minhtam.1198@gmail.com", "password", "USER");

		when(this.userRepository.existsByEmail(inputUser.getEmail())).thenReturn(false);
		when(this.passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
		when(this.userRepository.save(inputUser)).thenReturn(outputUser);

		// act: hành động
		User result = this.userService.createUser(inputUser);

		// assert : so sánh
		assertEquals(1L, result.getId());
	}

	@Test
	public void createUser_shouldThrowException_WhenEmailInvalid() {
		// arrange : chuẩn bị
		User inputUser = new User(null, "tam", "minhtam.1198@gmail.com", "password", "USER");

		when(this.userRepository.existsByEmail(inputUser.getEmail())).thenReturn(true);

		// act: hành động
		Exception ex = assertThrows(IllegalArgumentException.class, () -> {
			this.userService.createUser(inputUser);
		});

		// assert : so sánh
		assertEquals("Email already exists", ex.getMessage());
	}

	@Test
	public void getAllUsers_shouldReturnAllUsers() {
		// arrange : chuẩn bị
		List<User> outputUsers = new ArrayList<>();
		outputUsers.add(new User(1L, "tam", "minhtam.1198@gmail.com", "password", "USER"));
		outputUsers.add(new User(2L, "hary", "test@gmail.com", "password", "USER"));

		when(this.userRepository.findAll()).thenReturn(outputUsers);

		// act: hành động
		List<User> result = this.userService.getAllUsers();

		// assert : so sánh
		assertEquals(2, result.size());
		assertEquals("minhtam.1198@gmail.com", result.get(0).getEmail());
	}

	@Test
	public void getUserById_shouldReturnOptionalUser() {
		// arrange : chuẩn bị
		Long inputId = 1L;
		User inputUser = new User(1L, "tam", "minhtam.1198@gmail.com", "password", "USER");
		Optional<User> userOptionalOutput = Optional.of(inputUser);

		when(this.userRepository.findById(inputId)).thenReturn(userOptionalOutput);

		// act: hành động
		Optional<User> result = this.userService.getUserById(inputId);

		// assert : so sánh
		assertTrue(result.isPresent());
	}

	@Test
	public void deleteUser_ShouldReturnVoid_WhenUserExist() {
		// arrange
		Long inputId = 1L;
		when(this.userRepository.existsById(inputId)).thenReturn(true);

		// act
		this.userService.deleteUser(inputId);

		// assert
		verify(this.userRepository).deleteById(inputId);
	}

	@Test
	public void deleteUser_ShouldReturnException_WhenUserNotExist() {
		// arrange
		Long inputId = 1L;
		when(this.userRepository.existsById(inputId)).thenReturn(false);

		// act
		Exception ex = assertThrows(NoSuchElementException.class, () -> {
			this.userService.deleteUser(inputId);
		});

		// assert
		assertEquals("User not found", ex.getMessage());
	}

	@Test
	public void updateUser_shouldReturnUser_whenValid() {
		// arrange
		Long inputId = 1L;
		User inputUser = new User(1L, "old name", "old@gmail.com", "password", "USER");
		User outputUser = new User(1L, "new name", "new@gmail.com", "password", "USER");

		when(this.userRepository.findById(inputId)).thenReturn(Optional.of(inputUser));
		when(this.passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
		when(this.userRepository.save(inputUser)).thenReturn(outputUser);

		// act
		User result = this.userService.updateUser(inputId, inputUser);

		// assert
		assertEquals("new name", result.getName());
	}
}
