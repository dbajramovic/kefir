var app = angular.module('dummy', [ 'ngRoute', 'ngResource', 'mwl.calendar', 'ui.bootstrap' ]);

app.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : 'partials/home.html',
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
		.when('/:id/calendar', {
		templateUrl: 'partials/calendar-full.html', controller: 'CalendarCtrl'
		})
	.otherwise('/');

}).controller('navigation',

function($rootScope, $http, $location, $route) {

	var self = this;

	self.tab = function(route) {
		return $route.current && route === $route.current.controller;
	};

	$http.get('user').then(function(response) {
		if (response.data.name) {
			$rootScope.authenticated = true;
		} else {
			$rootScope.authenticated = false;
		}
	}, function() {
		$rootScope.authenticated = false;
	});

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
	  return $resource('/resource/studeves/:id', {}, {
	      show: { method: 'GET' },
	      update: { method: 'PUT', params: {id: '@id'} },
	      delete: { method: 'DELETE', params: {id: '@id'} }
	  });
	});

app.factory('StudevesService', function($resource) {
	  return $resource('/resource/studeves', {}, {
	      query: { method: 'GET', isArray: true,
	          transformResponse: function(data) {
	              return angular.fromJson(data)._embedded.events;
	            }
	      },
	      create: { method: 'POST' }
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
app.controller('EventListCtrl',  function($scope, $window, EventsService, EventService, $location) {
	  var qry = EventsService.query();
	  $scope.events = qry; 
	  
	  // callback for ng-click 'viewevent':
	    $scope.viewEvent = function (eventId) {
	        $location.path('/events/' + eventId + "/view");
	    };
    // callback for ng-click 'editevent':
    $scope.editEvent = function (eventId) {
        $location.path('/events/' + eventId + "/edit");
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
	  
}).controller('EventViewCtrl', function($scope, $routeParams, EventService, $location) {

  // callback for ng-click 'updateevent':
  $scope.updateevent = function () {
  	eventService.update($scope.event);
      $location.path('/events');
  };

  // callback for ng-click 'cancel':
  $scope.cancel = function () {
      $location.path('/events');
  };

  $scope.event = EventService.show({id: $routeParams.id});
  
}).controller('EventCreateCtrl', function($scope, EventsService, StudevesService, $location,$log) {
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
      $scope.event.typeofevent = $scope.selectedType;
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
    	          // placeholder id
    	    	    $scope.studentid = 1;
    	    	    $scope.studeve = { 
    	    	    		eventid: $scope.eventid,
    	    	    		studentid: $scope.studentid
    	    	    };
    	    	    StudevesService.create($scope.studeve);
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
	  $scope.mstep = 15;

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
}).controller('EventEditCtrl', function($scope, $routeParams, EventService, $location, $log) {
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
	            	  $scope.mstep = 15;

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
	
  	eventService.update($scope.event);
      $location.path('/events');
  };

  // callback for ng-click 'cancel':
  $scope.cancel = function () {
      $location.path('/events');
  };

  $scope.event = EventService.show({id: $routeParams.id});

});
app.controller('CalendarCtrl',  function($scope, $window, $log, StudentService, EventsService, EventService, $location) {
    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();
    $scope.CalendarEvents = [];
    EventsService.query().$promise.then(successOnGetEvent, errorOnGetEvent);
    var i = 0;
    function successOnGetEvent(response) {
    	$scope.events = response;
        angular.forEach($scope.events, function(value, key) {
        	 //$log.debug($scope.events[0]._links.event.href);
        	  var typeOfEvent = 'info';
        	  $log.debug($scope.events[i].typeofevent);
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
