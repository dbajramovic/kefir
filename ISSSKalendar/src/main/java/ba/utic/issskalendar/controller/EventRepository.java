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

	List<Event> findByCreatorusername(@Param("creatorusername") String creatorusername);
	
	List<Event> findByBegindate(@Param("begindate") Timestamp begindate);
	
	List<Event> findByEnddate(@Param("enddate") Timestamp enddate);
	
	Event findById(@Param("id") long id);
	
}
