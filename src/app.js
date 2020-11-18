import './main.scss'
import {symbol} from './scripts/symbols.js'
var chatApp = angular.module('chatApp', ['ngSanitize']);
// Define the `ChatController` controller on the `phonecatApp` module
chatApp.controller('ChatController', 
    ['$scope', '$http', '$timeout', 
    function($scope, $http, $timeout) {
      // Déclaration des 2 users
      var USER = {
        imgLong : './assets/user.jpg',
        img : 'user.jpg',
        name : 'Utilisateur (moi)',
        type : 'operator'
      };

      var OPERATOR = {
        imgLong : './assets/operator.jpg',
        img : 'operator.jpg',
        name : 'Opérateur',
        type : 'user'
      }

      // La liste des messages
      $scope.messages = new Array();
      // L'objet qui indique quel utilisateur est en train de taper. 
      $scope.messageInput = null;
      // Le contenu de l'input 
      $scope.currentMessage = ''; 
      
      /**
       * Gestion du message en cours
       */
      $scope.updateInput = function(){
        var size = $scope.currentMessage.length;
        if (!$scope.messageInput && size > 0){
          $scope.messageInput ={
            author: USER.name,
            img : USER.imgLong,
            type : USER.type

          } 
        }else if(size === 0){
          $scope.messageInput = null;
        }
      }

      /**
       * Ajout d'un nouveau message'
       */
      $scope.sendMessage = function(){
        if ($scope.currentMessage.length > 0){
          addUserMessage($scope.currentMessage+'', true);
          
          // On néttoie et on simule la conversation
          $scope.currentMessage = '';
          $scope.messageInput = null;

          $timeout(function fakeAnswer(){
            $scope.messageInput = {
              author: OPERATOR.name,
              img : OPERATOR.imgLong,
              type : OPERATOR.type
            };
            $http({
              method: 'GET',
              url: 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'
            })
            .then(function callBackFakeMessage(response){

              $scope.messageInput = null;
              addUserMessage(response.data[0], false);
            },
            function callBackError(){
              $scope.messageInput = null;
            });
          }, 500);
        }
      }

      /**
       * Fonction utilitaire pour l'ajout d'un message
       */
      function addUserMessage(message, me){
        $scope.messages.push({
          author: me ? USER.name : OPERATOR.name,
          time: new Date(),
          message: message,
          img : './assets/'+ (me ? USER.img : OPERATOR.img),
          me: me 
        })
      }

      /**
       * Fonction utilitaire pour ajouter un commentaire avec la touche enter
       */
      $scope.addEvent = function() {
        document.querySelector('.send_submit').addEventListener('keypress', function (e) {
          if (e.key === 'Enter') {
            $scope.updateInput()
          }
        });
        
      }()

      /**
       * Fonction utilitaire pour ajouter les symboles svg
       */
      $scope.symbols = function() {
        document.querySelector('.symbols').innerHTML = symbol;
      }()

}]);



