package ba.utic.issskalendar.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserConfiguration {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String userrole;
	private Boolean showended;
	private String username;
	private long defaultlanguage;
	
	public void setId(long Id) {
		id = Id;
	}
	public long getId() {
		return id;
	}
	
	public UserConfiguration() {}

	public String getUserrole() {
		return userrole;
	}
	public void setUserrole(String userrole) {
		this.userrole = userrole;
	}
	public long getDefaultlanguage() {
		return defaultlanguage;
	}
	public void setDefaultlanguage(long defaultlanguage) {
		this.defaultlanguage = defaultlanguage;
	}
	public Boolean getShowended() {
		return showended;
	}
	public void setShowended(Boolean showended) {
		this.showended = showended;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	};
}
