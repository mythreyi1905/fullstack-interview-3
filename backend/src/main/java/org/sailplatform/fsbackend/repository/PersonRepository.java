package org.sailplatform.fsbackend.repository;
import java.util.List;
import org.sailplatform.fsbackend.model.Person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    List<Person> findByFirstName(String firstName);
}
