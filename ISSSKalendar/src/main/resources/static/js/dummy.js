var app = angular.module('dummy', [ 'ngRoute', 'ngResource', 'ngCookies','ngAnimate','mwl.calendar', 'ui.bootstrap','angularjs-dropdown-multiselect','feeds','uiGmapgoogle-maps','pascalprecht.translate']);

// Angular translate configuration
var translationsBS = {
		 HOME: {
			 HEADLINE: 'ISSS Kalendar',
			 INTRO_PARAGRAPH: 'Dobrodošli na Vaš ISSS kalendar. Vaši događaji i oni koji su Vam dodani su prikazani ispod.',
			 COMMING_EVENTS: 'Vaši nadolazeći događaji:',
			 TITLE_EVENT: 'Naziv',
			 EVENT_NAME: 'Ime',
			 EVENT_LOCATION: 'Mjesto',
			 EVENT_ENDDATE: 'Vrijeme završetka',
			 NEWS: 'Vijesti',
			 VIEW: 'Pogledaj'
		  },
		  EVENTS: {
			    HEADLINE: 'Događaji',
			    TITLE_EVENT: 'Naziv',
			    BUTTON_VIEW: 'Detalji',
			    BUTTON_EDIT: 'Uredi',
			    BUTTON_ADD_STUD: 'Dodaj osobe na događaj',
			    BUTTON_DELETE: 'Briši',
			    BUTTON_ADD_EVENT: 'Novi događaj',
			},
			CALENDAR: {
			    HEADLINE: 'Vaš kalendar',
			    CAL_LAST_MONTH: 'Prošli mjesec',
			    CAL_TODAY: 'Danas',
			    CAL_NEXT_MONTH: 'Sljedeći mjesec',
			    CAL_YEAR: 'Godina',
			    CAL_MONTH: 'Mjesec',
			    CAL_WEEK: 'Sedmica',
			    CAL_DAY: 'Dan',
			},
		  NAMESPACE: {
		    PARAGRAPH: 'And it comes with awesome features!'
		  }
		};

var translationsEN = {
		  HOME: {
			  HEADLINE: 'ISSS Calendar',
			  INTRO_PARAGRAPH: 'Welcome to your ISSS calendar. Your events and those you are added to are shown below.',
			  COMMING_EVENTS: 'Your upcoming events:',
			  TITLE_EVENT: 'Title',
			  EVENT_NAME: 'Name',
			  EVENT_LOCATION: 'Location',
			  EVENT_ENDDATE: 'Date of end',
			  NEWS: 'News',
			  VIEW: 'View'
		  },
		  EVENTS: {
			    HEADLINE: 'Events',
			    TITLE_EVENT: 'Title',
			    BUTTON_VIEW: 'View',
			    BUTTON_EDIT: 'Edit',
			    BUTTON_ADD_STUD: 'Add students to events',
			    BUTTON_DELETE: 'Delete',
			    BUTTON_ADD_EVENT: 'New event',
			},
			CALENDAR: {
			    HEADLINE: 'Your calendar',
			    CAL_LAST_MONTH: 'Last month',
			    CAL_TODAY: 'Today',
			    CAL_NEXT_MONTH: 'Next month',
			    CAL_YEAR: 'Year',
			    CAL_MONTH: 'Month',
			    CAL_WEEK: 'Week',
			    CAL_DAY: 'Day',
			},
		  NAMESPACE: {
		    PARAGRAPH: 'And it comes with awesome features!'
		  }
		};
var translationsDE = {
		  HOME: {
			  HEADLINE: 'ISSS Kalendar',
			  INTRO_PARAGRAPH: 'Willkommen in Ihrem ISSS Kalender. Ihre Ereinginsse und diejenigen, die Sie auch gehören haben Sie unten.',
			  COMMING_EVENTS: 'Ihre bevorstehende Ereignisse:',
			  TITLE_EVENT: 'Titel',
			  EVENT_NAME: 'Name',
			  EVENT_LOCATION: 'Standort',
			  EVENT_ENDDATE: 'Enddatum',
			  NEWS: 'Nachrichten',
			  VIEW: 'Mehr'
		  },
		  EVENTS: {
			    HEADLINE: 'Ereignisse',
			    TITLE_EVENT: 'Name',
			    BUTTON_VIEW: 'Einzelheiten',
			    BUTTON_EDIT: 'Bearbeiten',
			    BUTTON_ADD_STUD: 'Personen zu Ereignissen hinzufügen',
			    BUTTON_DELETE: 'Löschen',
			    BUTTON_ADD_EVENT: 'Neues Ereigniss',
			},
			CALENDAR: {
			    HEADLINE: 'Ihr kalendar',
			    CAL_LAST_MONTH: 'Lezter Monat',
			    CAL_TODAY: 'Heute',
			    CAL_NEXT_MONTH: 'Nächster Monat',
			    CAL_YEAR: 'Jahr',
			    CAL_MONTH: 'Monat',
			    CAL_WEEK: 'Woche',
			    CAL_DAY: 'Tag',
			},
		  NAMESPACE: {
		    PARAGRAPH: 'And it comes with awesome features!'
		  }
		};
app.config(['$translateProvider',function($translateProvider) {
	 $translateProvider.translations('bs', translationsBS);
	 $translateProvider.translations('en', translationsEN);
	 $translateProvider.translations('de', translationsDE);
	 $translateProvider.preferredLanguage('bs');
	 
	 /*
		 * // remember language $translateProvider.useLocalStorage();
		 */
}]);
app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
	  GoogleMapApi.configure({
		    key: 'AIzaSyBVHKN0C3XOQPDyd4nn_LUGsNnT10nIIH0',
		    v: '3.24',
		    libraries: 'weather,geometry,visualization,places'
		  });
		}]);

// Routing
app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : 'partials/home1.html',
		controller : 'home',
		controllerAs : 'controller'
	})
	.when('/students', {
		templateUrl: 'partials/student-list.html', controller: 'StudentListCtrl'
		})
	.when('/students/:id/view', {
		templateUrl: 'partials/student-view.html', controller: 'StudentViewCtrl'
		})
	.when('/students/new', {
		templateUrl: 'partials/student-add.html',  controller: 'StudentCreateCtrl'
		})
	.when('/students/:id/edit', {
		templateUrl: 'partials/student-edit.html', controller: 'StudentEditCtrl'
		})
	.when('/events', {
		templateUrl: 'partials/event-list.html', controller: 'EventListCtrl'
		})
	.when('/events/:id/view', {
		templateUrl: 'partials/event-view.html', controller: 'EventViewCtrl'
		})
	.when('/events/new', {
		templateUrl: 'partials/event-add.html',  controller: 'EventCreateCtrl'
		})
	.when('/events/:id/edit', {
		templateUrl: 'partials/event-edit.html', controller: 'EventEditCtrl'
		})
	.when('/:username/calendar', {
		templateUrl: 'partials/calendar-full.html', controller: 'CalendarCtrl'
		})
	.when('/:eventid/addToEvent', {
		templateUrl: 'partials/addToEvent.html', controller: 'EventEditCtrl'
		})
	.when('/:username/settings', {
		templateUrl: 'partials/userSettings.html', controller: 'SettingsCtrl'
		})
	.otherwise('/');

}).controller('navigation',

function($rootScope, $http, $location, $route,$translate,$scope,$cookies,$log,UserConfigurationService) {

	var self = this;

	self.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};
	
	$http.get('user').then(function(response) {
		if (response.data.name) {
			$rootScope.authenticated = true;
			$rootScope.username = response.data.name;
			UserConfigurationService.query({username: $rootScope.username}).$promise.then(S,E);
			  function S(response) {
				  var uc = response;
				  $rootScope.userconfiguration = uc[0];
				  if($rootScope.userconfiguration.preferedlanguage === 1) 
				  {	
					  $log.debug('BS');
					  $rootScope.changeLanguage('bs');
				  }
				  if($rootScope.userconfiguration.preferedlanguage === 2)
					  $rootScope.changeLanguage('en');
				  if($rootScope.userconfiguration.preferedlanguage === 3)
					  $rootScope.changeLanguage('de');
				  $log.debug($scope.userconfiguration);
			  };
			  function E(response)  {
				  $log.debug(response);
			  };  
		} else {
			$rootScope.authenticated = false;
		}
	}, function() {
		$rootScope.authenticated = false;
	});
	
    $rootScope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
      
	self.credentials = {};

	self.logout = function() {
		$http.post('logout', {}).finally(function() {
			$rootScope.authenticated = false;
			$location.path("/");
		});
	}

}).controller('home', function($http) {
	var self = this;
	$http.get('resource/').then(function(response) {
		self.greeting = response.data;
	})
});

app.factory('StudentService', function($resource) {
  return $resource('/resource/students/:id', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'} },
      delete: { method: 'DELETE', params: {id: '@id'} }
  });
});

app.factory('StudentsService', function($resource) {
  return $resource('/resource/students', {}, {
      query: { method: 'GET', isArray: true,
          transformResponse: function(data) {
              return angular.fromJson(data)._embedded.students;
            }
      },
      create: { method: 'POST' }
  });
});

app.factory('EventService', function($resource) {
	  return $resource('/resource/events/:id', {}, {
	      show: { method: 'GET' },
	      update: { method: 'PUT', params: {id: '@id'} },
	      delete: { method: 'DELETE', params: {id: '@id'} }
	  });
	});

app.factory('EventsService', function($resource,$log) {
	  return $resource('/resource/events', {}, {
	      query: { method: 'GET', isArray: true,
	          transformResponse: function(data) {
	              return angular.fromJson(data)._embedded.events;
	            }
	      },
	      create: { method: 'POST',
	    	  transformResponse: function(data, callback) {
	    		  var json = angular.fromJson(data);
	    		  $log.debug(json._links.event.href.split("/")[5]);
	              return json._links.event.href.split("/")[5];
	            }
	      	}
	  });
	});
app.factory('StudeveService', function($resource) {
	  return $resource('/resource/studeves/:username', {}, {
	      show: { method: 'GET' },
	      update: { method: 'PUT', params: {id: '@id'} },
	      delete: { method: 'DELETE', params: {id: '@id'} }
	  });
	});

app.factory('StudevesService', function($resource) {
	  return $resource('/resource/studeve/:username/:pagenum', {}, {
	      query: { method: 'GET', isArray: true, params: {username: '@username', pagenum: '@pagenum'},
	          transformResponse: function(data) {
	        	  return angular.fromJson(data);
	             // return angular.fromJson(data)._embedded.studeves;
	            }
	      },
	      create: { method: 'POST' }
	  });
	});
app.factory('UserConfigurationService',function($resource) {
	  return $resource('/resource/userconfiguration/:username', {}, {
	      query: { method: 'GET', isArray: true, params: {username: '@username'},
	          transformResponse: function(data) {
	        	  return angular.fromJson(data);
	             // return angular.fromJson(data)._embedded.studeves;
	            }
	      },
	      create: { method: 'POST' },
	      update: { method: 'POST', params: { username: '@username' } }
	  });
	});
// app.controller('StudentListCtrl', function($scope, $state, popupService,
// $window, StudentService) {
app.controller('StudentListCtrl',  function($scope, $window, StudentsService, StudentService, $location) {
	  var qry = StudentsService.query();
	  $scope.students = qry; 

      // callback for ng-click 'editStudent':
      $scope.editStudent = function (studentId) {
          $location.path('/students/' + studentId + "/edit");
      };

      // callback for ng-click 'deleteStudent':
      $scope.deleteStudent = function (studentId) {
    	  StudentService.delete({ id: studentId });
          $scope.students = StudentsService.query();
      };

      // callback for ng-click 'createNewStudent':
      $scope.createNewStudent = function () {
          $location.path('/students/new');
      };
	  
}).controller('StudentViewCtrl', function($scope, $routeParams, StudentService, $location) {

    // callback for ng-click 'updateStudent':
    $scope.updateStudent = function () {
    	StudentService.update($scope.student);
        $location.path('/students');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path('/students');
    };

    $scope.student = StudentService.show({id: $routeParams.id});
    
}).controller('StudentCreateCtrl', function($scope, StudentsService, $location) {
    // callback for ng-click 'createNewStudent':
    $scope.createNewStudent = function () {
    	StudentsService.create($scope.student);
        $location.path('/students');
    }
    
}).controller('StudentEditCtrl', function($scope, $routeParams, StudentService, $location) {

    // callback for ng-click 'updateStudent':
    $scope.updateStudent = function () {
    	StudentService.update($scope.student);
        $location.path('/students');
    };

    // callback for ng-click 'cancel':
    $scope.cancel = function () {
        $location.path('/students');
    };

    $scope.student = StudentService.show({id: $routeParams.id});

});
app.controller('EventListCtrl',  function($scope, $window, EventsService, StudevesService, EventService, $location,$log,$rootScope,$translate) {
	// init function to grab events
	$scope.init = function() {
		// Two queries, one for number of events, with one parameter
		  StudevesService.query({username: $rootScope.username}).$promise.then(S,E);
		  function S(response) {
			  var eve = response;
			  // number of events is chosen to fit page, 7 per page
			  var pages = eve.length/7;
			  // Second query, used to get paged queries
			  StudevesService.query({username: $rootScope.username, pagenum:0}).$promise.then(S1,E1);
			  function S1(response) {
				  $scope.events = response;
				  $scope.pagenums = [];
				  for(var i = 0;i<pages;i++) {
					  $scope.pagenums.push(i+1);
				  }
			  }
			  function E1(response)  {
				  $log.debug(response);
			  }  
		  };
		  function E(response)  {
			  $log.debug(response);
		  }  
	    };
	    // Query for switching pages
	    $scope.getPagedQuery = function(newPageNum) {
			  var pg = newPageNum-1;
			  var qry = StudevesService.query({username: $rootScope.username, pagenum:pg}).$promise.then(S,E);
			  function S(response) {
				  $scope.events = response;
			  };
			  function E(response) {
				  $log.debug(response);
			  };
		    };
	  // callback for ng-click 'viewevent':
	    $scope.viewEvent = function (eventId) {
	        $location.path('/events/' + eventId + "/view");
	    };
    // callback for ng-click 'addStudentstoEvent'
    $scope.editEvent = function (eventId) {
        $location.path('/events/'+eventId + '/edit');
    };
    // callback for ng-click 'deleteEvent':
    $scope.deleteEvent = function (eventId) {
  	  eventService.delete({ id: eventId });
        $scope.events = EventsService.query();
    };

    // callback for ng-click 'createNewevent':
    $scope.createNewEvent = function () {
        $location.path('/events/new');
    };
	  
    $scope.addStudentstoEvent = function(eventId) {
        $location.path('/'+eventId+'/addToEvent');
    };
    
}).controller('EventViewCtrl', function($scope, $routeParams, $log,EventService, $location) {

  // callback for ng-click 'updateevent':
  $scope.updateevent = function () {
  	eventService.update($scope.event);
      $location.path('/events');
  };

  // callback for ng-click 'cancel':
  $scope.cancel = function () {
      $location.path('/events');
  };
  $scope.editEvent = function() {
      $location.path('/events/'+$routeParams.id+'/edit');
  };
  $scope.event = EventService.show({id: $routeParams.id});
  
}).controller('EventCreateCtrl', function($scope, EventsService, StudevesService, $location,$log,$http,$cookies,$rootScope,uiGmapGoogleMapApi) {
	$scope.markers = [];
	$scope.lat = 43.85616158077486;
    $scope.lon = 18.396466970443726;
	$scope.mapinit = function()  {
		$scope.event = {};
		// Create a map object and specify the DOM element for display.
		 uiGmapGoogleMapApi.then(function(maps) {
			 $scope.map = { center: { latitude: 43.85616158077486, longitude: 18.396466970443726 }, zoom: 13};
			 $scope.marker = {
				      id: 0,
				      coords: {
				        latitude: 43.85616158077486,
				        longitude: 18.396466970443726
				      },
				      options: { draggable: true },
				      events: {
				        dragend: function (marker, eventName, args) {
				         
				        var lattemp = marker.getPosition().lat();
				           var lontemp = marker.getPosition().lng();
				          $log.log(lattemp);
				          $log.log(lontemp);
				          $scope.lat = lattemp;
				          $scope.lon = lontemp;
				          $scope.marker.options = {
				            draggable: true,
				            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
				            labelAnchor: "100 0",
				            labelClass: "marker-labels"
				          };
				        }
				      }
				    };
			 $scope.searchbox = {
					 template:'partials/searchbox.tpl.html',
					 parentdiv: 'location',
			          events:{
			            places_changed: function (searchBox) {
			            	var result = searchBox.getPlaces();
			            	if(result != null) {
			            		$scope.lat = result[0].geometry.location.lat();
			            		$scope.lon = result[0].geometry.location.lng();
			            		$scope.locationstring = result[0].name +", "+result[0].formatted_address;
			            		$scope.marker.coords = { latitude: $scope.lat, longitude: $scope.lon };
			            		$scope.map.center = { latitude: $scope.lat, longitude: $scope.lon };	            		
			            	}
			            }
			          },
			 options: {
				 bounds: new google.maps.LatLngBounds(new google.maps.LatLng(45.16267407976457,15.830612182617188),new google.maps.LatLng(42.595554553719204,18.522262573242188))
			 }
			 };
		    });
    };
	$scope.items = [
	                  'Exam',
	                  'Tutorial',
	                  'Lecture',
	                  'Else'
	                ];
 $scope.selectedType = 'Else';
	                $scope.status = {
	                  isopen: false
	                };

	                $scope.toggled = function(open) {
	                  
	                };

	                $scope.toggleDropdown = function($event) {
	                  $event.preventDefault();
	                  $event.stopPropagation();
	                  $scope.status.isopen = !$scope.status.isopen;
	                };

	                $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
	                $scope.typeChosen = function(choice){ 
	                	$scope.selectedType = choice;
	                };
	                // callback for ng-click 'createNewevent':
  $scope.createNewEvent = function () {
	  $scope.event.begindate.setHours($scope.beginhour.getHours());
	  $scope.event.begindate.setMinutes($scope.beginhour.getMinutes());
      $scope.event.enddate.setHours($scope.endhour.getHours());
      $scope.event.enddate.setMinutes($scope.endhour.getMinutes());
      $scope.event.ended = false;
      $scope.event.location = $scope.locationstring;
      $scope.event.typeofevent = $scope.selectedType;
      $scope.event.creatorusername = $rootScope.username;
      $scope.event.latitude = $scope.lat;
      $scope.event.longitude = $scope.lon;
      $log.debug($scope.event);
      if($scope.event.begindate < $scope.event.enddate) { 
    		EventsService.create($scope.event).$promise.then(successOnGetEvent, errorOnGetEvent);
    		 function successOnGetEvent(eventid) {
    			    var size_of_json = Object.keys(eventid).length - 2; // promise
																		// and
																		// resolve
																		// are
																		// taken
																		// out
    	            $scope.eventid = "";
    	            var i = 0;
    	            // Because the json returns the id in a array, I had to
					// merge it back together
    	            while(size_of_json > i) { 
    	            	$scope.eventid += angular.fromJson(eventid)[i];
    	            	i++;
    	            }
    	    	    $scope.studeve = { 
    	    	    		eventid: $scope.eventid,
    	    	    		username: $rootScope.username
    	    	    };
    	    	    $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('XSRF-TOKEN');
    	    		 var data = $scope.studeve;
    	    		 $http.post('/resource/studeves',data).then(function successCallback(response) {
    	    			    $log.debug(response);
    	    			  }, function errorCallback(response) {
    	    			    $log.debug(response);
    	    			  });
    	    	    $location.path('/events/'+$scope.eventid+"/view");
    		 };
    	        function errorOnGetEvent(response) {
    	            console.log(response)
    	        }; 	       
      }
  }
  $scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function() {
	    $scope.dt = null;
	  };

	  $scope.options = {
	    customClass: getDayClass,
	    minDate: new Date(),
	    showWeeks: true
	  };

	  // Disable weekend selection
	  function disabled(data) {
	    var date = data.date,
	      mode = data.mode;
	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  }

	  $scope.toggleMin = function() {
	    $scope.options.minDate = $scope.options.minDate ? null : new Date();
	  };

	  $scope.toggleMin();

	  $scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	  };

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date(tomorrow);
	  afterTomorrow.setDate(tomorrow.getDate() + 1);
	  $scope.events = [
	    {
	      date: tomorrow,
	      status: 'full'
	    },
	    {
	      date: afterTomorrow,
	      status: 'partially'
	    }
	  ];

	  function getDayClass(data) {
	    var date = data.date,
	      mode = data.mode;
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i = 0; i < $scope.events.length; i++) {
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }

	    return '';
	  }
	  $scope.hstep = 1;
	  $scope.mstep = 1;

	  $scope.options = {
	    hstep: [1, 2, 3],
	    mstep: [1, 5, 10, 15, 25, 30]
	  };

	  $scope.ismeridian = true;
	  $scope.toggleMode = function() {
	    $scope.ismeridian = ! $scope.ismeridian;
	  };

	  $scope.update = function() {
	    var d = new Date();
	    d.setHours( 14 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	  };

	  $scope.changed = function () {
	    
	  };

	  $scope.clear = function() {
	    $scope.mytime = null;
	  };
}).controller('EventEditCtrl', function($scope, $routeParams,$http, EventService,StudentsService,StudevesService, $location, $log, $cookies, $rootScope, uiGmapGoogleMapApi) {
	$scope.lat = 43.85616158077486;
    $scope.lon = 18.396466970443726;
	$scope.mapinit = function()  {
		// Create a map object and specify the DOM element for display.
		EventService.show({id: $routeParams.id}).$promise.then(function(response) {
			$scope.event = response;
			var parts = $scope.event.begindate.match(/(\d+)/g);
			var sd = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4]);
			$scope.beginhour = new Date();
			$scope.beginhour.setHours(sd.getHours());
			$scope.beginhour.setMinutes(sd.getMinutes());
			var parts = $scope.event.enddate.match(/(\d+)/g);
			var sd = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4]);
			$scope.endhour = new Date();
			$scope.endhour.setHours(sd.getHours());
			$scope.endhour.setMinutes(sd.getMinutes());
			uiGmapGoogleMapApi.then(function(maps) {
				 $scope.map = { center: { latitude: $scope.event.latitude, longitude: $scope.event.longitude }, zoom: 13 };
				 $scope.marker = {
					      id: 0,
					      coords: {
					        latitude: $scope.event.latitude,
					        longitude: $scope.event.longitude
					      },
					      options: { draggable: true },
					      events: {
					        dragend: function (marker, eventName, args) {
					        var lattemp = marker.getPosition().lat();
					           var lontemp = marker.getPosition().lng();
					          $log.log(lattemp);
					          $log.log(lontemp);
					          $scope.event.latitude = lattemp;
					          $scope.event.longitude = lontemp;
					          $scope.marker.options = {
					            draggable: true,
					            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
					            labelAnchor: "100 0",
					            labelClass: "marker-labels"
					          };
					        }
					      }
					    };
				 $scope.searchbox = {
						 template:'partials/searchbox.tpl.html',
						 parentdiv: 'editlocation',
				          events:{
				            places_changed: function (searchBox) {
				            	var result = searchBox.getPlaces();
				            	if(result != null) {
				            		$scope.lat = result[0].geometry.location.lat();
				            		$scope.lon = result[0].geometry.location.lng();
				            		$scope.locationstring = result[0].name +", "+result[0].formatted_address;
				            		$scope.marker.coords = { latitude: $scope.lat, longitude: $scope.lon };
				            		$scope.map.center = { latitude: $scope.lat, longitude: $scope.lon };	            		
				            	}
				            }
				          },
				 options: {
					 bounds: new google.maps.LatLngBounds(new google.maps.LatLng(45.16267407976457,15.830612182617188),new google.maps.LatLng(42.595554553719204,18.522262573242188))
				 }
				 };
			    });
		});
    };
	$scope.Success = true;
	$scope.listOfStudentsToAddToEvent = [];
	   $scope.studentsmodel = [];
	   $scope.studentscustomTexts = {buttonDefaultText: 'Select students to add:' };
	   $scope.studentssettings = {displayProp: 'lastName', enableSearch: true ,scrollable: true , scrollableHeight: '500px'};
	$scope.getStudents = function () {
	   $scope.eventid = $routeParams.eventid;
       StudentsService.query({username: $rootScope.username}).$promise.then(S,E);
       function S(response)  {
    	   $scope.students = response;
       };
       function E(response)  {
    	   $log.debug(response);
       };
      };
      $scope.addToListofStudents = function(selectedStudent) {
    	  $log.debug($scope.studentsmodel);
      };
     $scope.addToEvent = function() {
    	 angular.forEach($scope.studentsmodel, function(value, key) {
    		 $scope.listOfStudentsToAddToEvent.push($scope.students[value.id-1]);
   		});
    	 angular.forEach($scope.listOfStudentsToAddToEvent, function(value, key) {
    		 $scope.studeve = { 
	    	    		eventid: $routeParams.eventid,
	    	    		username: $rootScope.username
	    	    };
    		 $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('XSRF-TOKEN');
    		 var data = $scope.studeve;
    		 $http.post('/resource/studeves',data).then(function successCallback(response) {
    			    $scope.Success = true;
    			    $log.debug(response);
    			  }, function errorCallback(response) {
    			    $log.debug(response);
    			  });
   		});
    };
	$scope.items = [
	                  'Exam',
	                  'Tutorial',
	                  'Lecture',
	                  'Else'
	                ];
$scope.selectedType = 'Else';
	                $scope.status = {
	                  isopen: false
	                };

	                $scope.toggled = function(open) {
	                  
	                };

	                $scope.toggleDropdown = function($event) {
	                  $event.preventDefault();
	                  $event.stopPropagation();
	                  $scope.status.isopen = !$scope.status.isopen;
	                };

	                $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
	                $scope.typeChosen = function(choice){ 
	                	$scope.selectedType = choice;
	                };
	                $scope.today = function() {
	            	    $scope.dt = new Date();
	            	  };
	            	  $scope.today();

	            	  $scope.clear = function() {
	            	    $scope.dt = null;
	            	  };

	            	  $scope.options = {
	            	    customClass: getDayClass,
	            	    minDate: new Date(),
	            	    showWeeks: true
	            	  };

	            	  // Disable weekend selection
	            	  function disabled(data) {
	            	    var date = data.date,
	            	      mode = data.mode;
	            	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	            	  }

	            	  $scope.toggleMin = function() {
	            	    $scope.options.minDate = $scope.options.minDate ? null : new Date();
	            	  };

	            	  $scope.toggleMin();

	            	  $scope.setDate = function(year, month, day) {
	            	    $scope.dt = new Date(year, month, day);
	            	  };

	            	  var tomorrow = new Date();
	            	  tomorrow.setDate(tomorrow.getDate() + 1);
	            	  var afterTomorrow = new Date(tomorrow);
	            	  afterTomorrow.setDate(tomorrow.getDate() + 1);
	            	  $scope.events = [
	            	    {
	            	      date: tomorrow,
	            	      status: 'full'
	            	    },
	            	    {
	            	      date: afterTomorrow,
	            	      status: 'partially'
	            	    }
	            	  ];

	            	  function getDayClass(data) {
	            	    var date = data.date,
	            	      mode = data.mode;
	            	    if (mode === 'day') {
	            	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	            	      for (var i = 0; i < $scope.events.length; i++) {
	            	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	            	        if (dayToCheck === currentDay) {
	            	          return $scope.events[i].status;
	            	        }
	            	      }
	            	    }

	            	    return '';
	            	  }
	            	  $scope.hstep = 1;
	            	  $scope.mstep = 1;

	            	  $scope.options = {
	            	    hstep: [1, 2, 3],
	            	    mstep: [1, 5, 10, 15, 25, 30]
	            	  };

	            	  $scope.ismeridian = true;
	            	  $scope.toggleMode = function() {
	            	    $scope.ismeridian = ! $scope.ismeridian;
	            	  };

	            	  $scope.update = function() {
	            	    var d = new Date();
	            	    d.setHours( 14 );
	            	    d.setMinutes( 0 );
	            	    $scope.mytime = d;
	            	  };

	            	  $scope.changed = function () {
	            	    
	            	  };

	            	  $scope.clear = function() {
	            	    $scope.mytime = null;
	            	  };
  // callback for ng-click 'updateevent':
  $scope.updateevent = function () {
	  var a = new Date($scope.event.begindate);
	  a.setHours($scope.beginhour.getHours());
	  a.setMinutes($scope.beginhour.getMinutes());
	  $scope.event.begindate = a;
	  a = new Date($scope.event.enddate);
	  a.setHours($scope.endhour.getHours());
	  a.setMinutes($scope.endhour.getMinutes());
	  $scope.event.enddate = a;
  	  EventService.update($scope.event);
      $location.path('/events');
  };

  // callback for ng-click 'cancel':
  $scope.cancel = function () {
      $location.path('/events');
  };

});
app.controller('CalendarCtrl',  function($scope, $window, $log,$routeParams, StudentService, EventsService, StudevesService, EventService, $location,$rootScope, $translate) {
    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();
    $scope.CalendarEvents = [];
    $scope.studeves = [];
    $log.debug($routeParams.id);
    StudevesService.query({username: $rootScope.username}).$promise.then(successOnGetStudEve, errorOnGetStudEve);
    function successOnGetStudEve(response) {
    	$scope.events = response;
        angular.forEach($scope.events, function(value, key) {
        	  $log.debug($scope.events[i]);
        	  var typeOfEvent = 'info';
        	  // $log.debug($scope.events[i].studeeve[0]);
        	  if($scope.events[i].typeofevent === 'Exam') typeOfEvent = 'warning';
        	  if($scope.events[i].typeofevent === 'Tutorial') typeOfEvent = 'important';
        	  if($scope.events[i].typeofevent === 'Lecture') typeOfEvent = 'inverse';
    		  var calevent =  {
    			  link: 'http://localhost:8080/resource/events/'+$scope.events[i].id,
    			  title: $scope.events[i].name,
    			  type: typeOfEvent,
    			  startsAt: new Date($scope.events[i].begindate),
    			  endsAt: new Date($scope.events[i].enddate),
    			  draggable: false,
    			  resizable: false
    			}
    		  $scope.CalendarEvents.push(calevent);
    		  i++;
    		});
    };
    function errorOnGetStudEve(response) {
        console.log(response)
    }; 	
   // EventsService.query().$promise.then(successOnGetEvent, errorOnGetEvent);
    var i = 0;
    function successOnGetEvent(response) {
    	$scope.events = response;
        angular.forEach($scope.events, function(value, key) {
        	  var typeOfEvent = 'info';
        	  if($scope.events[i].typeofevent === 'Exam') typeOfEvent = 'warning';
        	  if($scope.events[i].typeofevent === 'Tutorial') typeOfEvent = 'important';
        	  if($scope.events[i].typeofevent === 'Lecture') typeOfEvent = 'inverse';
    		  var calevent =  {
    			  link: $scope.events[i]._links.event.href,
    			  title: $scope.events[i].name,
    			  type: typeOfEvent,
    			  startsAt: new Date($scope.events[i].begindate),
    			  endsAt: new Date($scope.events[i].enddate),
    			  draggable: false,
    			  resizable: false
    			}
    		  $scope.CalendarEvents.push(calevent);
    		  i++;
    		});
 };
    function errorOnGetEvent(response) {
        console.log(response)
    }; 	       
	
    $scope.isCellOpen = true;

    $scope.eventClicked = function(event) {
    	$location.path('/events/'+event.link.split("/")[5]+ '/view');
    };

    $scope.eventEdited = function(event) {
    	$location.path('/events/'+event.link.split("/")[5]+ '/edit')
    };

    $scope.eventDeleted = function(event) {
    	$location.path('/events/'+event.link.split("/")[5]+ '/delete')
    };

    $scope.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

});
app.controller('HomeCtrl',  function($scope, $window, EventsService, StudevesService, EventService, $location,$log,$rootScope) {
	$scope.init = function() {
		  StudevesService.query({username: $rootScope.username}).$promise.then(S,E);
		  function S(response) {
			  var eve = response;
			  var pages = eve.length/7;
			  var qry = StudevesService.query({username: $rootScope.username, pagenum:0});
			  $scope.events = qry;
			  $scope.pagenums = [];
			  $log.debug(response);
			  for(var i = 0;i<pages;i++) {
				  $scope.pagenums.push(i+1);
			  }
		  };
		  function E(response)  {
			  $log.debug(response);
		  }  
	    };
	  $scope.getPagedQuery = function(newPageNum) {
		  var pg = newPageNum-1;
		  var qry = StudevesService.query({username: $rootScope.username, pagenum:pg}).$promise.then(S,E);
		  function S(response) {
			  $scope.events = response;
		  };
		  function E(response) {
			  $log.debug(response);
		  };
	    };
});
app.controller('SettingsCtrl',  function($scope, $window, UserConfigurationService, $location,$log,$rootScope,$http,$cookies) {
	$scope.init = function() {
		$scope.isCollapsed = true;
		UserConfigurationService.query({username: $rootScope.username}).$promise.then(S,E);
		  function S(response) {
			  var uc = response;
			  $scope.userconfiguration = uc[0];
			  $log.debug($scope.userconfiguration);
		  };
		  function E(response)  {
			  $log.debug(response);
		  }  
	    };
	    // Language codes -> Bosnian - 1 English - 2 German - 3
	    $scope.setLanguage = function(lang) {
			 $scope.userconfiguration.defaultlanguage = lang;
			 $log.debug($scope.userconfiguration);
		  };
		  
	    $scope.updateSettings = function()  {
 		 $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('XSRF-TOKEN');
 		 var data = $scope.userconfiguration;
 		 $http.post('/resource/userconfiguration/edit/:username',data).then(function successCallback(response) {
 			    var Success = response;
 			    $log.debug(Success);
 			    // $location.path('/'+$rootScope.username+'/settings');
 			  }, function errorCallback(response) {
 			    $log.debug(response);
 			  });
		  }
});