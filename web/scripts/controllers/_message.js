angular.module('myApp')
	.controller('messageCtrl', function($scope, $location, LSFactory, $http, apiUrl){
		
    var socket = io.connect('http://localhost:3000', {
    	//query: 'token=' + LSFactory.getData('token')
  	});

		$scope.newMessage = {message: ''}
		$scope.messages = []

		$scope.sendMessage = function(newMessage){
		  socket.emit('message', newMessage);
		  $scope.newMessage = {message: ''}  
		}	

		socket.on('message', function(msg){
			$scope.$apply(function(){
				$scope.messages.push(msg)
			})		
		})
	})
	