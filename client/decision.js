Template.decision.helpers({
	decisionName: function(){
		//TODO: magical `this` !!!
		return Decisions.findOne({_id: this.paramsProjectId}).name;
	},
	decisions: function(){
		return Decisions.find({$and: [{createdby: Meteor.userId()}, {_id: {$not: this.paramsProjectId}}]});
		//TODO: should return all decisions involving current user!
	}
});