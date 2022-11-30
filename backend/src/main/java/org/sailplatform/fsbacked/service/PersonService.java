package org.sailplatform.fsbacked.service;

import java.util.List;

import org.sailplatform.fsbacked.model.Person;
import org.sailplatform.fsbacked.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public Person add(Person toAdd){
        
        return personRepository.save(toAdd);
    }

    public List<Person> getAll(){
        return personRepository.findAll();
    }
}
