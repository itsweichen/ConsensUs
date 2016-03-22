Template.signin.events({
    'submit form': function(event){
        event.preventDefault();
        var userName = $('#inputUsername').val();
        var password = $('#inputPassword').val();
        Accounts.createUser({
            email: username,
            password: password
        });
    }
});