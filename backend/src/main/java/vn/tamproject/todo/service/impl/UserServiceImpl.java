package vn.tamproject.todo.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import vn.tamproject.todo.entity.User;
import vn.tamproject.todo.repository.UserRepository;
import vn.tamproject.todo.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User createUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new IllegalArgumentException("Email already exists");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		if (user.getRole() == null || user.getRole().isEmpty()) {
			user.setRole("USER");
		}
		return userRepository.save(Objects.requireNonNull(user));
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public Optional<User> getUserById(Long id) {
		return userRepository.findById(Objects.requireNonNull(id));
	}

	public User updateUser(Long id, User updatedUser) {
		return userRepository.findById(Objects.requireNonNull(id)).map(user -> {
			user.setName(updatedUser.getName());
			user.setEmail(updatedUser.getEmail());
			if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
				user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
			}
			if (updatedUser.getRole() != null && !updatedUser.getRole().isEmpty()) {
				user.setRole(updatedUser.getRole());
			}
			return userRepository.save(Objects.requireNonNull(user));
		}).orElseThrow(() -> new NoSuchElementException("User not found"));
	}

	public void deleteUser(Long id) {
		if (!userRepository.existsById(Objects.requireNonNull(id))) {
			throw new NoSuchElementException("User not found");
		}
		userRepository.deleteById(Objects.requireNonNull(id));
	}
}
