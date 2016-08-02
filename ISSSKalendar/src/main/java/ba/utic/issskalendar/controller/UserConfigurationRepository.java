package ba.utic.issskalendar.controller;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import ba.utic.issskalendar.model.UserConfiguration;
@RepositoryRestResource(collectionResourceRel = "userconfiguration", path = "userconfiguration")

public interface UserConfigurationRepository extends JpaRepository<UserConfiguration, String>  {

	List<UserConfiguration> findByUsername(@Param("username") String username);
	
}
