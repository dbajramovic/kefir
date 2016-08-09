package ba.utic.issskalendar.controller;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ba.utic.issskalendar.model.StandardLocation;
@RepositoryRestResource(collectionResourceRel = "standardlocations", path = "standardlocations")

public interface StandardLocationRepository extends JpaRepository<StandardLocation, Long>  {

	List<StandardLocation> findByName(@Param("name") String name);
	
}
