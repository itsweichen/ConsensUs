Template.signin.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();
        Meteor.loginWithPassword(username, password, function(err){
            if(err){
                console.log(err);
            }
        });
    }
});