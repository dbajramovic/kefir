package ba.utic.issskalendar;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ba.utic.issskalendar.model.Event;
import ba.utic.issskalendar.model.Studeve;
import ba.utic.issskalendar.model.UserConfiguration;
import ba.utic.issskalendar.controller.EventRepository;
import ba.utic.issskalendar.controller.StudeveRepository;
import ba.utic.issskalendar.controller.UserConfigurationRepository;
@RestController
@EntityScan(basePackages = {
		  "ba.utic.issskalendar.model"
		  })
@EnableJpaRepositories(basePackages = {
		  "ba.utic.issskalendar.controller"
		  })
@RequestMapping("/resource")
public class ResourceController {
	final EventRepository eventRepository;
	final StudeveRepository studeveRepository;
	final UserConfigurationRepository userConfigurationRepository;
	
	@Autowired
	public ResourceController(EventRepository er,StudeveRepository sr, UserConfigurationRepository ucr) {
	    this.eventRepository = er;
	    this.studeveRepository = sr;
	    this.userConfigurationRepository = ucr;
	}
	@RequestMapping(value="/studeve/{username}/{pagenum}",method = RequestMethod.GET)
	@ResponseBody
		public List<Event> readEvents(@PathVariable String username, @PathVariable long pagenum){
		    List<Object[]> ce = this.studeveRepository.findEventByUsername(username, new PageRequest((int) pagenum,7));
		    List<Event> ce1 = new ArrayList<Event>();
		    for(Object[] row : ce)  {
		    	Event e = new Event();
		    	e.setId((Long) row[0]);
		    	e.setBegindate((Timestamp) row[1]);
		    	e.setCreatorid((Long) row[2]);
		    	e.setEnddate((Timestamp) row[3]);
		    	e.setEnded((Boolean) row[4]);
		    	e.setLocation((String) row[5]);
		    	e.setName((String) row[6]);
		    	e.setTypeofevent((String) row[7]);
		    	ce1.add(e);
		    }
			return ce1;
		}
	@RequestMapping(value="/studeve/{username}",method = RequestMethod.GET)
	@ResponseBody
		public List<Event> readEventsAll(@PathVariable String username){
		    List<Object[]> ce = this.studeveRepository.findEventByUsernameAll(username);
		    List<Event> ce1 = new ArrayList<Event>();
		    for(Object[] row : ce)  {
		    	Event e = new Event();
		    	e.setId((Long) row[0]);
		    	e.setBegindate((Timestamp) row[1]);
		    	e.setCreatorid((Long) row[2]);
		    	e.setEnddate((Timestamp) row[3]);
		    	e.setEnded((Boolean) row[4]);
		    	e.setLocation((String) row[5]);
		    	e.setName((String) row[6]);
		    	e.setTypeofevent((String) row[7]);
		    	ce1.add(e);
		    }
			return ce1;
		}
	@RequestMapping(value="/userconfiguration/{username}",method = RequestMethod.GET)
	@ResponseBody
		public List<UserConfiguration> getSettings(@PathVariable String username){
		    List<UserConfiguration> ce = this.userConfigurationRepository.findByUsername(username);
		    List<UserConfiguration> ce1 = new ArrayList<UserConfiguration>();
		    for(UserConfiguration row : ce)  {
		    	UserConfiguration e = new UserConfiguration();
		    	e = row;
		    	ce1.add(e);
		    }
			return ce1;
		}
}
