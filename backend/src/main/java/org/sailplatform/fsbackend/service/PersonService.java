package org.sailplatform.fsbackend.service;

import java.util.List;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public Person add(Person toAdd){
        return personRepository.save(toAdd);
    }



    public Person update(Person toUpdate){
        return personRepository.findById(toUpdate.getId()).map(person -> {
            person.setFirstName(toUpdate.getFirstName());
            person.setLastName(toUpdate.getLastName());
            return personRepository.save(person);
        }).orElseGet(() -> {
            return personRepository.save(toUpdate);
        });
    }



    public void delete(Person toDelete){
        personRepository.delete(toDelete);
        return;
    }

    public List<Person> getAll(){
        return personRepository.findAll();
    }

    public List<Person> findByFirstName(String firstName){
        return personRepository.findByFirstName(firstName);
    }
}
