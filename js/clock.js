// New Application specific dispatcher
var App = new App();

// Constants
var DEFAULT_TIME = 240;
var PLAYER_INDEX = 0;

function Clock(selector){
    this.runningTime = DEFAULT_TIME;
    this.selector = selector;
    this.timer = null;
    this.playerIndex = PLAYER_INDEX += 1
    if(this.playerIndex > 2) throw new Error("You've exceeded two clocks");

    App.register(this.callback.bind(this));
};

Clock.prototype.formatTime = function(runningTime){
    var hours   = Math.floor(runningTime / 60);
    var minutes = runningTime % 60;
    return hours + " : " + minutes;
}

// can't combine this function with formatTime due to
// dynamic html creation in render func
Clock.prototype.setText = function(text){
    document.querySelector("#counter-" + this.playerIndex).innerHTML = text;
}

Clock.prototype.click = function(){
    App.notifyClick(this);
}

// registered action listener
Clock.prototype.callback = function(payload){
    var action = payload.action;
    var origin = payload.source;

    // reset timer & update depending on action
    clearInterval(this.timer);

    switch (action){
        case "CLICK":
            if(origin !== this){
                this.timer = setInterval(function(){
                    this.runningTime -= 1;
                    this.setText(this.formatTime(this.runningTime));
                    if(this.runningTime <= 0) App.notifyTimeout(this);
                }.bind(this), 1000);
            }

            break

        case "TIMEOUT":
            if(origin !== this){
                this.runningTime = DEFAULT_TIME;
                alert("Player " + this.playerIndex + " is the winner!");
                App.notifyReset(this);
            }
            break

        case "RESET":
            this.runningTime = DEFAULT_TIME;
            this.setText(this.formatTime(this.runningTime));
            break
    }
}

Clock.prototype.render = function(){
    elm = document.querySelector(this.selector);

    var _div = document.createElement("div");
    _div.className = "clock-container";

    var _counter = document.createElement("span");
    _counter.id  = "counter-" + this.playerIndex;
    _counter.innerHTML = this.formatTime(this.runningTime);;

    var _btn = document.createElement("button");
    _btn.className = 'pure-button pure-button-primary';
    _btn.innerHTML = "Player " + this.playerIndex + " Timer";
    _btn.onclick = this.click.bind(this);

    _div.appendChild(_btn);
    elm.appendChild(_counter);
    elm.appendChild(_div);

};
