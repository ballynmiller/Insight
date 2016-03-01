var Dispatcher = Dispatcher || {};

var App = function(){
    Dispatcher.call(this);
};

App.prototype = Object.create(Dispatcher.prototype);
App.prototype.constructor = App;

App.prototype.notifyClick = function(obj){
    this.dispatch({
        action: "CLICK",
        source: obj
    });
}

App.prototype.notifyReset = function(){
    this.dispatch({
        action: "RESET",
        source: null
    });
}

App.prototype.notifyTimeout = function(obj){
    this.dispatch({
        action: "TIMEOUT",
        source: obj
    })
}
