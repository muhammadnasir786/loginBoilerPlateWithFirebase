var database = firebase.database().ref('/');
var email = document.getElementById('email');
var password = document.getElementById('password');


var loginBtn = document.getElementById('loginBtn');
var signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click',  (e)=> {
    e.preventDefault();
    var user = {
        email: email.value,
        password: password.value
    };
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then( (res) =>{
        console.log(res.uid); // ID set In Authentication table

        database.child('user/' + res.uid).set(user).then( ()=> {
            console.log(user); // Return Object Set in above line 17
        })
        alert("User Sucessfully SignUp")
        email.innerHTML = "";
        password.innerHTML = "";
        
    }).catch( (error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });

});

// Login Logics Here !


loginBtn.addEventListener('click',  (e) =>{
    e.preventDefault();
   
    var user = {
        email: email.value,
        password: password.value
    };
  
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then( (res)=> {
        console.log(res.uid) //  
        database.child('user/'+res.uid).once('value',(snap)=>{
            localStorage.setItem('email',snap.val().email);
            localStorage.setItem('uid',res.uid);
            window.location = '';// After login page  
        })
    }).catch( (error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });


});