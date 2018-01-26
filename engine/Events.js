
function Events() {
    this.events={
        "onNewVisit":function(participant) {
            if(participant.condition===undefined) {
                participant.condition = Math.floor(Math.random() * 5);
            }
        }
    };
}

module.exports.registerEvent = function(name, callback) {
    this.events[name]=callback;
}

module.exports.fireEvent = function(name, participant) {
    for(var key in this.events) {
        if(key==name) {
            this.events[key](participant);
            break;
        }
    }
}

module.exports = Events;