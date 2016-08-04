/**
 * Created by i97139 on 26/07/2016.
 */
angular.module('App').service('myStates', function() {

  var model= this;
  model.myStatesArray=[];
  model.selectedStates=function(states){
    model.myStatesArray=[];

    for(i=0; i<51;i++){

        if(states[i].checked==true){
          model.myStatesArray.push(states[i].name);
        }

      }
  };
  model.returnStates=function(){
    return model.myStatesArray;
  };
  model.getPercentage=function () {
    return model.myStatesArray.length/50;
  }
});
