function createElement({type="unspecified"}={}) {
    return arguments[0];
}

module.exports.createElement = createElement;

module.exports.createText = function({format="html",text="[text]"} = {}) {
    return createElement({
        type:"text", 
        format: format, 
        text:text,
    });
}

module.exports.createSeparator = function({height=10} = {}) {
    return createElement({
        type:"separator", 
        height:height,
    });
}

module.exports.createPageSeparator = function() {
    return createElement({
        type:"page_separator",
    });
}

module.exports.createLikertScale = function({
    points=5, 
    values=[1,2,3,4,5], 
    variable=undefined, 
    text="", 
    labels=[], 
    reminded=false, 
    required=false, 
    template="likert/basic",
    }) {

    while(labels.length<points) {
        labels.splice(1, 0, "");
    }

    if(labels.length > points) {
        points=labels.length;
    }

    return createElement(Object.assign(arguments[0], {type:"likert"}));
}