angular.module('myApp')
	.controller('tasksCtrl', function($scope, TaskFactory, LSFactory, NotificationFactory){
		TaskFactory.getTasks()
			.then(function(res){
				$scope.tasks = res.data;
				$scope.notification = NotificationFactory.latestNotification();
			})
	})
	.controller('taskDetailsCtrl', function($scope, TaskFactory, $routeParams, $location, NotificationFactory){
		TaskFactory.getTask($routeParams.id)
			.then(function(res){
				$scope.task = res.data;
				$scope.notification = NotificationFactory.latestNotification();
			})

		$scope.removeTask = function(task){
			var r = confirm('Are you sure to delete this task?')
			if(r == true){
				TaskFactory.removeTask(task)
					.then(function(res){
						NotificationFactory.addNotification(res.data.message);
						$location.path('/');
					})			
			}			
		}
	})	
	.controller('newTaskCtrl', function($scope, TaskFactory, $location, LSFactory, NotificationFactory){
		$scope.newTask = {
			name: '',
			completed: false,
			userId: LSFactory.getData('currentUser', true).id,
		};

		$scope.addTask = function(newTask){
			TaskFactory.addTask(newTask)
				.then(function(res){
					NotificationFactory.addNotification(res.data.message);
					$location.path('/');
				})
		}		
	})
	.controller('updateTaskCtrl', function($scope, TaskFactory, $routeParams, $location, NotificationFactory){
		TaskFactory.getTask($routeParams.id)
			.then(function(res){
				$scope.task = res.data;
			})

		$scope.updateTask = function(task){
			TaskFactory.updateTask(task)
				.then(function(res){
					NotificationFactory.addNotification(res.data.message);
					$location.path('/');
				})
		}		
	})	