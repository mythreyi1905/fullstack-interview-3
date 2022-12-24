package org.sailplatform.fsbackend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FsbackendApplicationTests {

	@Autowired
	PersonRepository dummyRepo;

	Person dummyP = new Person();

	@Test
	public void testPersonSave() {
		//FsbackendApplication FsbackendService = mock(FsbackendApplication.class);
		dummyP.setFirstName("Myth");
		dummyP.setLastName("R");

		dummyRepo.deleteAll();
		dummyRepo.flush();

		dummyRepo.save(dummyP);

		List<Person> listP = dummyRepo.findAll();
		assertEquals(dummyP.getFirstName(), listP.get(0).getFirstName());
		assertEquals(dummyP.getLastName(), listP.get(0).getLastName());
	}

	@Test
	public void testPersonUpdate() {

		dummyP.setFirstName("Myth");
		dummyP.setLastName("R");

		dummyRepo.save(dummyP);

		List<Person> listP = dummyRepo.findAll();
		dummyP = listP.get(0);

		dummyP.setLastName("Ragothuman");
		dummyRepo.save(dummyP);

		List<Person> listP1 = dummyRepo.findAll();
		assertEquals(dummyP.getFirstName(), listP1.get(0).getFirstName());
		assertEquals(dummyP.getLastName(), listP1.get(0).getLastName());
	}

	@Test
	public void testDeletePerson() {
		List<Person> listP = dummyRepo.findAll();
		dummyP = listP.get(0);

		dummyRepo.delete(dummyP);

		List<Person> listP2 = dummyRepo.findAll();
		assertEquals(0, listP2.size());
	}

	@Test
	public void testFindByFirstName() {
		dummyP.setFirstName("Myth");
		dummyP.setLastName("R");

		dummyRepo.save(dummyP);

		List<Person> temp = dummyRepo.findByFirstName("Myth");

		assertEquals(temp.get(0).getFirstName(), "Myth");
	}

}
