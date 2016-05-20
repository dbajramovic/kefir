package ba.utic.issskalendar;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import ba.utic.issskalendar.model.Event;
import ba.utic.issskalendar.model.Student;

@Configuration
public class MyRepositoryRestMvcConfiguration extends RepositoryRestMvcConfiguration {
 
    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.setBasePath("/resource");
        config.exposeIdsFor(Student.class);
        config.exposeIdsFor(Event.class);
    }
}
