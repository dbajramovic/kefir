package ba.utic.issskalendar.controller;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ba.utic.issskalendar.model.Student;

@RepositoryRestResource(collectionResourceRel = "students", path = "students")

public interface StudentRepository extends PagingAndSortingRepository<Student, Long>  {

	List<Student> findByLastName(@Param("name") String name);

	List<Student> findByLastNameOrderByLastName(@Param("name") String name);
	
	   /* @Query("SELECT c.LastName FROM Person c where c.id = :id") 
    Person findLastNameById(@Param("id") Long id);*/
}
