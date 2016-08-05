package ba.utic.issskalendar.controller;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import ba.utic.issskalendar.model.UserConfiguration;
@RepositoryRestResource(collectionResourceRel = "userconfiguration", path = "userconfiguration")

public interface UserConfigurationRepository extends JpaRepository<UserConfiguration, String>  {

	List<UserConfiguration> findByUsername(@Param("username") String username);
	@Modifying
	@Transactional
	@Query(value="UPDATE UserConfiguration u SET u.defaultlanguage=:defaultlanguage, u.showended =:showended, u.userrole= :userrole WHERE u.username= :username")
	void setSettings(@Param("username") String username, @Param("defaultlanguage") Long defaultlangugage, @Param("showended") Boolean showended, @Param("userrole") String userrole);
}
