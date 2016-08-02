package ba.utic.issskalendar.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
@Entity
public class Studeve {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long studentid;
	private long eventid;
	private String username;
	@ManyToOne
	private Event event;
	
	public Event getEvent() {
		return event;
	}
	@ManyToOne
	private Student student;
	
	public Student getStudent() {
		return student;
	}
	public long getStudentid() {
		return studentid;
	}
	public void setStudentid(long studentid) {
		this.studentid = studentid;
	}
	public long getEventid() {
		return eventid;
	}
	public void setEventid(long eventid) {
		this.eventid = eventid;
	}
	public Studeve() {}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	};
	
}
