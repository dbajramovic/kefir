package ba.utic.issskalendar.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import ba.utic.issskalendar.model.Student;
import ba.utic.issskalendar.model.Event;
import ba.utic.issskalendar.model.Studeve;
@RepositoryRestResource(collectionResourceRel = "studeves", path = "studeves")
public interface StudeveRepository extends PagingAndSortingRepository<Studeve, Long>  {
	
	List<Event> findByStudentid(@Param("studentid") long studentid);

	List<Student> findByEventid(@Param("eventid") long eventid);
	
}
