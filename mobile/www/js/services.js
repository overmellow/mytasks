angular.module('starter.services', [])

/*.factory('Chats', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return $http.get('http://192.168.74.131:3000/users')
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})*/

.factory("LSFactory", function($window) {
  return {
    setData: function(key, val, stringify = false) {
      if(stringify)
      {
        val = JSON.stringify(val);
      }     
      $window.localStorage && $window.localStorage.setItem(key, val);
      return this;
    },
    getData: function(key, stringify = false) {
      if(stringify)
      {
        return JSON.parse($window.localStorage && $window.localStorage.getItem(key))
      }
      return $window.localStorage && $window.localStorage.getItem(key);
    },
    removeData: function(key) {
      return $window.localStorage && $window.localStorage.removeItem(key);
    }
  };
})
