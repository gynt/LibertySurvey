
function Namer(prefix="Q") {
    this.prefix=prefix;
    this.number=0;
}

Namer.prototype.nextVariableName = function() {
    this.number+=1;
    return this.prefix+this.number;
}

function Section() {
    this.elements=[];
}

module.exports.Section = Section;

//

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

Survey.prototype.nextVariableName = function() {
    return this.varnamer.nextVariableName();
}

module.exports.Survey = Survey;

//

module.exports.createElement = function(element) {
    return element;
}

module.exports.createText = function({format="html",text="[text]"} = {}) {
    return {type:"text", format: format, text:text};
}

module.exports.createSeparator = function({height=10} = {}) {
    return {type:"separator", height:height};
}

module.exports.createLikertScale = function({
    points=5, 
    values=[1,2,3,4,5], 
    variable=undefined, 
    text="", 
    labels=[], 
    reminded=false, 
    required=false, 
    template="likert/basic"
    }) {

    while(labels.length<points) {
        labels.splice(1, 0, "");
    }

    if(labels.length > points) {
        points=labels.length;
    }

    return Object.assign(arguments[0], {type:"likert"});
}

module.exports.render = function() {

}