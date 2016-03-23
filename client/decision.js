Template.decision.helpers({
	decisionName: function(){
		//TODO: magical `this` !!!
		return Decisions.findOne({_id: this.paramsProjectId}).name;
	}
});