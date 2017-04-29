angular.module('app.services', ['firebase'])

.factory('Actions', ['$firebaseArray', function($firebaseArray){
    var actionsRef = firebase.database().ref('actions');
    return $firebaseArray(actionsRef);
}])

.service('BlankService', [function(){

}]);