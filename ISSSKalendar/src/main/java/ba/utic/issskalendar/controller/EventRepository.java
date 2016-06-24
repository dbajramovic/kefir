package ba.utic.issskalendar.controller;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ba.utic.issskalendar.model.Event;
@RepositoryRestResource(collectionResourceRel = "events", path = "events")

public interface EventRepository extends JpaRepository<Event, Long>  {

	List<Event> findByName(@Param("name") String name);

	List<Event> findByCreatorid(@Param("creatorid") long creatorid);
	
	List<Event> findByBegindate(@Param("begindate") Timestamp begindate);
	
	List<Event> findByEnddate(@Param("enddate") Timestamp enddate);
	
	   /* @Query("SELECT c.LastName FROM Person c where c.id = :id") 
    Person findLastNameById(@Param("id") Long id);*/
}
