package org.sailplatform.fsbacked.controller;

import java.util.List;

import org.sailplatform.fsbacked.model.Person;
import org.sailplatform.fsbacked.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "*"})
public class PersonController {

    @Autowired PersonService personService;

    @GetMapping("/all")
	public List<Person> getAll() {
		return personService.getAll();
	}

    @PostMapping("/add")
	public Person add(Person toAdd) {
		return personService.add(toAdd);
	}
}
