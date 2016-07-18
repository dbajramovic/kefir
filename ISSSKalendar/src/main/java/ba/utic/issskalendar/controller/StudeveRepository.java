package ba.utic.issskalendar.controller;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ba.utic.issskalendar.model.Student;
import ba.utic.issskalendar.model.Event;
import ba.utic.issskalendar.model.Studeve;

@RepositoryRestResource(collectionResourceRel = "studeves", path = "studeves")
public interface StudeveRepository extends JpaRepository<Studeve, Long> {
	List<Student> findStudentByEventid(@Param("eventid") long eventid);

	@RequestMapping(value = "/studentid/{a}", method = RequestMethod.GET)
	@ResponseBody
	@Query(value = "SELECT e.id,e.begindate,e.creatorid,e.enddate,e.ended,e.location,e.name,e.typeofevent from Event e, Studeve se where e.id = se.eventid AND se.studentid = :studentid")
	List<Object[]> findEventByStudentid(@Param("studentid") long studentid);
}
