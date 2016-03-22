Template.header.events({
	'click #sign-out': function(event){
		event.preventDefault();
		Meteor.logout();
	}
});

Template.header.helpers({
	username: function() {
		return Meteor.user()['username'];
	}
});