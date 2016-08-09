package ba.utic.issskalendar.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long creatorid;
	private String name;
	private Timestamp begindate;
	private Timestamp enddate;
	private Boolean ended;
	private String location;
	private String typeofevent;
	private String creatorusername;
	private String latitude;
	private String longitude;
	@OneToMany(mappedBy = "eventid")
	private Set<Studeve> studeve;
	public void setId(long Id) {
		id = Id;
	}
	public long getId() {
		return id;
	}
	public Set<Studeve> getStudeeve() {
		return studeve;
	}
	public long getCreatorid() {
		return creatorid;
	}
	public void setCreatorid(long creatorid) {
		this.creatorid = creatorid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Timestamp getBegindate() {
		return begindate;
	}
	public void setBegindate(Timestamp begindate) {
		this.begindate = begindate;
	}
	public Timestamp getEnddate() {
		return enddate;
	}
	public void setEnddate(Timestamp enddate) {
		this.enddate = enddate;
	}
	public Boolean getEnded() {
		return ended;
	}
	public void setEnded(Boolean ended) {
		this.ended = ended;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getTypeofevent() {
		return typeofevent;
	}
	public void setTypeofevent(String type) {
		this.typeofevent = type;
	}
	public Event() {}
	public String getCreatorusername() {
		return creatorusername;
	}
	public void setCreatorusername(String creatorusername) {
		this.creatorusername = creatorusername;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	};
}
