Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    if(Session.get("toRegister")){
    	this.render('register');
    }
    else{
    	this.render('signin');
    }
    	
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});



Router.route('/', function() {
  this.redirect('/decisions');
});

Router.route('/decisions', function() {
  this.render('decisions');
});

Router.route('/decision/:_id/:_uid', function(){
  this.render('decision');
});
