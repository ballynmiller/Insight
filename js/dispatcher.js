function Dispatcher(){
    this.callbacks = [];
};

/*
    @{param} {function} callback method to hit for object
*/
Dispatcher.prototype.register = function(callback){
    this.callbacks.push(callback);
}

/*
    @param {data} {
        action: "Action_Type",
        origin: Object that dispatched
    }
*/
Dispatcher.prototype.dispatch = function(payload){
    this.callbacks.forEach(function(callback){
        callback(payload);
    });
};
