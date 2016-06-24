package ba.utic.issskalendar.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String firstName;
	private String lastName;
	private String JMBAG;
	@OneToMany(mappedBy = "student")
	private Set<Studeve> studeve;
	
	public Set<Studeve> getStudeve() {
		return studeve;
	}
	public long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getJMBAG() {
		return JMBAG;
	}
	public void setJMBAG(String jMBAG) {
		JMBAG = jMBAG;
	}
}
