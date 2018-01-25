
function Namer(prefix="Q") {
    this.prefix=prefix;
    this.number=1;
    this.names=[];
}

Namer.prototype.registerName = function(name) {
    this.names.push(name);
}

Namer.prototype.nextVariableName = function() {
    while(this.names.indexOf(this.prefix+this.number)!=-1) {
        this.number+=1;
    }
    this.registerName(this.prefix+this.number);
    return this.prefix+this.number;
}

module.exports = Namer;