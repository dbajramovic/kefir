package ba.utic.issskalendar;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import ba.utic.issskalendar.controller.EventRepository;
import ba.utic.issskalendar.controller.StudeveRepository;
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
	
	@Autowired
	public ResourceController(EventRepository er,StudeveRepository sr) {
	    this.eventRepository = er;
	    this.studeveRepository = sr;
	}
	@RequestMapping(value="/studeve/{studentid}",method = RequestMethod.GET)
	@ResponseBody
		public List<Event> readEvents(@PathVariable long studentid){
		    List<Object[]> ce = this.studeveRepository.findEventByStudentid(studentid);
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
}
