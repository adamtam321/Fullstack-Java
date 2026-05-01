package vn.tamproject.todo;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@Disabled
@ActiveProfiles("test")
class TodoApplicationTests {

	@Value("${spring.application.name}")
	private String title;

	@Test
	void contextLoads() {
		System.out.println(">>> run here " + title);
	}

}
