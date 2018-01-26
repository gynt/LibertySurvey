
var Section = require('./Section');
var Namer = require('./Namer');

function Survey() {
    this.pages=[];
    this.sections=[new Section()];
    this.section=this.sections[0];
    this.varnamer = new Namer("Q_");
    this.sectionnamer = new Namer("Section_");
}

Survey.prototype.appendElements = function() {
    var section = this.section;
    Array.apply(null, arguments).forEach(function(el) {
        section.elements.push(el);
    });
}

Survey.prototype.appendSections = function() {
    var sections = this.sections;
    Array.apply(null, arguments).forEach(function(el) {
        sections.push(el);
    });    
}

Survey.prototype.nameElement = function({variable=undefined} = {}) {
    if(variable === undefined) {
        variable = this.varnamer.nextVariableName();
    } else {
        this.varnamer.registerName(variable);
    }
    return Object.assign(arguments[0], {variable:variable});
}

Survey.prototype.nameSection = function({name=undefined} = {}) {
    if(name === undefined) {
        name = this.sectionnamer.nextVariableName();
    } else {
        this.sectionnamer.registerName(name);
    }
    return Object.assign(arguments[0], {name:name});
}

module.exports = Survey;