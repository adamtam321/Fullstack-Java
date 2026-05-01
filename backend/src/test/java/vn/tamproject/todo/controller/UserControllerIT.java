package vn.tamproject.todo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import vn.tamproject.todo.IntegrationTest;
import vn.tamproject.todo.entity.ApiResponse;
import vn.tamproject.todo.entity.User;
import vn.tamproject.todo.repository.UserRepository;

@IntegrationTest
@AutoConfigureMockMvc
@Transactional
@Disabled
public class UserControllerIT {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ObjectMapper objectMapper;

	@BeforeEach
	public void init() {
		this.userRepository.deleteAll();
	}

	@Test
	public void createUser_shouldReturnUser_whenValid() throws Exception {
		// arrange
		User inputUser = new User(null, "tam", "minhtam.1198@gmail.com", "password", "USER");

		// action
		byte[] payload = Objects.requireNonNull(objectMapper.writeValueAsBytes(inputUser));
		String resultStr = mockMvc
				.perform(post("/users").contentType(MediaType.APPLICATION_JSON_VALUE).content(payload))
				.andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

		// assert
		ApiResponse<User> response = objectMapper.readValue(resultStr, new TypeReference<ApiResponse<User>>() {
		});

		assertEquals("success", response.getStatus(), "Status phải là 'success'");
		assertNotNull(response.getMessage(), "Message không được null");
		assertNotNull(response.getData(), "Data không được null");
		assertEquals(inputUser.getName(), response.getData().getName(), "Tên user không khớp");
		assertEquals(inputUser.getEmail(), response.getData().getEmail(), "Email user không khớp");
		assertNull(response.getErrorCode(), "ErrorCode phải là null khi thành công");
		assertNotNull(response.getTimestamp(), "Timestamp không được null");
	}

	@Test
	public void getAllUsers() throws Exception {
		// arrange
		User user1 = new User(null, "name1", "minhtam.1198@gmail.com", "password", "USER");
		User user2 = new User(null, "name2", "test@gmail.com", "password", "USER");
		List<User> data = List.of(user1, user2);
		this.userRepository.saveAll(Objects.requireNonNull(data));

		// action
		String resultStr = mockMvc.perform(get("/users")).andExpect(status().isOk()).andReturn().getResponse()
				.getContentAsString();

		// assert
		ApiResponse<List<User>> response = objectMapper.readValue(resultStr,
				new TypeReference<ApiResponse<List<User>>>() {
				});

		assertEquals("success", response.getStatus(), "Status phải là 'success'");
		assertNotNull(response.getMessage(), "Message không được null");
		assertNotNull(response.getData(), "Data không được null");
		assertEquals(2, response.getData().size(), "Số lượng user không đúng");
		assertEquals("minhtam.1198@gmail.com", response.getData().get(0).getEmail(), "Email user đầu tiên không khớp");
		assertNull(response.getErrorCode(), "ErrorCode phải là null khi thành công");
		assertNotNull(response.getTimestamp(), "Timestamp không được null");
	}

	@Test
	public void getUserById() throws Exception {
		// arrange
		User user = new User(null, "name-get-by-id", "minhtam.1198@gmail.com", "password", "USER");
		User userInput = this.userRepository.saveAndFlush(user);

		// action
		String resultStr = mockMvc.perform(get("/users/{id}", userInput.getId())).andExpect(status().isOk()).andReturn()
				.getResponse().getContentAsString();

		// assert
		ApiResponse<User> response = objectMapper.readValue(resultStr, new TypeReference<ApiResponse<User>>() {
		});

		assertEquals("success", response.getStatus(), "Status phải là 'success'");
		assertNotNull(response.getMessage(), "Message không được null");
		assertNotNull(response.getData(), "Data không được null");
		assertEquals("name-get-by-id", response.getData().getName(), "Tên user không khớp");
		assertNull(response.getErrorCode(), "ErrorCode phải là null khi thành công");
		assertNotNull(response.getTimestamp(), "Timestamp không được null");
	}

	@Test
	public void getUserById_shouldReturnError_whenIdNotFound() throws Exception {
		// arrange
		long nonExistentId = 0L;

		// action
		String resultStr = mockMvc.perform(get("/users/{id}", nonExistentId)).andExpect(status().isNotFound())
				.andReturn().getResponse().getContentAsString();

		// assert
		ApiResponse<Object> response = objectMapper.readValue(resultStr, new TypeReference<ApiResponse<Object>>() {
		});

		assertEquals("error", response.getStatus(), "Status phải là 'error'");
		assertNotNull(response.getMessage(), "Message không được null");
		assertNull(response.getData(), "Data phải là null khi lỗi");
		assertEquals("USER_NOT_FOUND", response.getErrorCode(), "ErrorCode không đúng");
		assertNotNull(response.getTimestamp(), "Timestamp không được null");
	}

	@Test
	public void updateUser() throws Exception {
		// arrange
		User user = new User(null, "old-name", "old@gmail.com", "password", "USER");
		User userInput = this.userRepository.saveAndFlush(user);
		User updateUser = new User(userInput.getId(), "new-name", "new@gmail.com", "password", "USER");

		// action
		byte[] payload = Objects.requireNonNull(objectMapper.writeValueAsBytes(updateUser));
		String resultStr = mockMvc.perform(
				put("/users/{id}", userInput.getId()).contentType(MediaType.APPLICATION_JSON_VALUE).content(payload))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		// assert
		ApiResponse<User> response = objectMapper.readValue(resultStr, new TypeReference<ApiResponse<User>>() {
		});

		assertEquals("success", response.getStatus(), "Status phải là 'success'");
		assertNotNull(response.getMessage(), "Message không được null");
		assertNotNull(response.getData(), "Data không được null");
		assertEquals("new-name", response.getData().getName(), "Tên user không khớp");
		assertEquals("new@gmail.com", response.getData().getEmail(), "Email user không khớp");
		assertNull(response.getErrorCode(), "ErrorCode phải là null khi thành công");
		assertNotNull(response.getTimestamp(), "Timestamp không được null");
	}

	@Test
	public void deleteUser() throws Exception {
		// arrange
		User user = new User(null, "delete-name", "delete@gmail.com", "password", "USER");
		User userInput = this.userRepository.saveAndFlush(user);

		// action
		String resultStr = mockMvc
				.perform(delete("/users/{id}", userInput.getId()).contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

		// assert
		if (!resultStr.isEmpty()) { // Nếu API trả về body
			ApiResponse<Object> response = objectMapper.readValue(resultStr, new TypeReference<ApiResponse<Object>>() {
			});
			assertEquals("success", response.getStatus(), "Status phải là 'success'");
			assertNotNull(response.getMessage(), "Message không được null");
			assertNull(response.getData(), "Data phải là null khi xóa");
			assertNull(response.getErrorCode(), "ErrorCode phải là null khi thành công");
			assertNotNull(response.getTimestamp(), "Timestamp không được null");
		}
		long countDB = this.userRepository.count();
		assertEquals(0, countDB, "Số lượng user trong DB phải là 0 sau khi xóa");
	}
}