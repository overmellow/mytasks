angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, AuthFactory, LSFactory, $state) {
  // Form data for the login modal
  $scope.user = {email: 'mori@mail.com', password: 2000};
  $scope.currentUser = {}

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
    $scope.loginModal.show();
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signupModal = modal;
    //$scope.signupModal.show();
  });

  // Triggered in the login modal to close it
  $scope.hideLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.showLogin = function() {
    $scope.signupModal.hide();
    $scope.loginModal.show();
  };

  // Triggered in the login modal to close it
  $scope.hideSignup = function() {
    $scope.signupModal.hide();
  };

  // Open the login modal
  $scope.showSignup = function() {
    $scope.loginModal.hide();
    $scope.signupModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.login = function(user) {
    AuthFactory.login(user)
      .then(function(res){
        LSFactory.setData('currentUser', res.data.user, true);
        //$rootScope.user = res.data.user;
        $scope.currentUser = res.data.user;
        LSFactory.setData('token', res.data.token);
        $scope.hideLogin();
        $state.go('tab.conversations')
      }, function(err){
        //$scope.notification = err.data;
      }) 
  };

    // Perform the login action when the user submits the login form
  $scope.signup = function(user) {
    AuthFactory.signup(user)
      .then(function(res){
          $scope.hideSignup();
      }, function(err){
        //$scope.notification = err.data;
      })
    }
  $scope.logout = function(){
    $scope.currentUser = {}
    $scope.user = {}
    LSFactory.removeData('currentUser');
    LSFactory.removeData('token');
    $scope.showLogin()
  }   
})

.controller('conversationsCtrl', function($scope, LSFactory, $http, configuration, ContactFactory, $ionicModal, $state){

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/contacts.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.contactsModal = modal;
  });

  $scope.addContacts = function(){
    $scope.contactsModal.show();
    ContactFactory.getContacts()
      .then(function(res){
        $scope.contacts = res.data;
        //$scope.notification = NotificationFactory.latestNotification();
    })
  }

  $scope.addToMyContacts = function(contact){
    ContactFactory.addToMyContacts(contact)
      .then(function(res){       
        ContactFactory.getMyContacts()
        .then(function(res){
          $scope.mycontacts = res.data;
          $scope.hideContacts();
        })
        //$scope.mycontacts.push(contact)
    })      
  }  

  $scope.hideContacts = function(){
    $scope.contactsModal.hide();
  }

  ContactFactory.getMyContacts()
    .then(function(res){
      $scope.mycontacts = res.data;
    })

  $scope.removeFromMyContacts = function(contact){
    ContactFactory.removeFromMyContacts(contact)
    .then(function(res){
        $scope.mycontacts = $scope.mycontacts.filter(function(element){
          return element != contact;
        })
      //NotificationFactory.addNotification(res.data.message);
     // $location.path('/conversations');
    })      
  }   
})

.controller('conversationCtrl', function($scope, LSFactory, $http, configuration, $rootScope, ContactFactory, $stateParams, ConversationFactory, ConversationMessagesFactory){
    $scope.user = LSFactory.getData('currentUser', true)
    $scope.messages = []    

    ContactFactory.getContactByConversationId($stateParams.conversationId)
      .then(function(res){
        $scope.contact = res.data;
      })

    ConversationFactory.joinRoom($stateParams.conversationId);

    ConversationMessagesFactory.getConversationMessages($stateParams.conversationId)
      .then(function(res){
        $scope.messages = res.data;

        $scope.$watch("messages", function(){
          //$('.conversation-div').scrollTop($('.conversation-div').height())
          //$("#message-input").focus();
        })
      })    

    $scope.newMessage = {message: '', room: $stateParams.conversationId, sender: LSFactory.getData('currentUser', true).id}
    
    $scope.sendMessage = function(newMessage){
      ConversationFactory.sendMessage(newMessage);
      //$rootScope.socket.emit('message', newMessage);
      $scope.newMessage.message = '';
      //$('.conversation-div').scrollTop($('.conversation-div').height())
      //$("#message-input").focus();  
    }

    $scope.back = function(){
      ConversationFactory.leaveRoom($stateParams.conversationId);
      //$rootScope.socket.emit('leave', $stateParams.conversationId);
      //$location.path('/conversations');
    } 

    $rootScope.socket.on('message', function(msg){
      $scope.$apply(function(){
        $scope.messages.push(msg)
      })    
    })
  })

/*.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})*/;
