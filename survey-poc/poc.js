var engine = require("../engine/survey-engine")

var survey = new engine.Survey();

survey.appendElements(
	engine.createText({
		text:"<h1>Welcome to this survey!</h1>",
		format:"html",
	}),
	engine.createSeparator({
		height:10,
	}),
	survey.nameElement(engine.createLikertScale({
		labels:["Absolutely not","","","","","","Absolutely"],
		values:[1,2,3,4,5,6,7],
		variable:"Q_1",
		text:"How much do you like libertysurvey so far?",
		reminded: true,
		required: false,
		template:"likert/basic",
		display:true,
	})),
	survey.nameElement(engine.createLikertScale({
		points:7,
		labels:["Absolutely not","Absolutely"],
		text:"How much do you love libertysurvey so far?",
	})),
);

survey.appendSections(new engine.Section(),new engine.Section());


module.exports = survey;