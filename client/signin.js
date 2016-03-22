Template.signin.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();
        Meteor.loginWithPassword(username, password, function(error){
            if(error){
                var errorHTML = "<div class='alert alert-danger' role='alert'>"+error.reason+"</div>";
                console.log(errorHTML);
                $('.form-signin').prepend(errorHTML);
            }
            else{
                Router.go('/decisions');
            }
        });
    },
    'click #toSignUp': function(event){
    	event.preventDefault();
    	Session.set("toRegister", true);
        Router.go('/');
    }
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();
        Accounts.createUser({
            username: username,
            password: password
        }, function(error){
            if(error){
                var errorHTML = "<div class='alert alert-danger' role='alert'>"+error.reason+"</div>";
                console.log(errorHTML);
                $('.form-signin').prepend(errorHTML);
            } else {
                Router.go("/decisions"); // Redirect user if registration succeeds
            }
        });
    },
    'click #toSignIn': function(event){
        event.preventDefault();
        Session.set("toRegister", false);
        Router.go('/');
    }
});