
var status_username = null;
var status_dob = null;
var status_email = null;
var status_pass1 = null;
var status_pass2= null;
var status_pin = null;

// USERNAME CHECK
var uname_test = document.getElementById("uname_test");
function checkuname(){
    var _username = document.getElementById("uname_test").value;
    let uname_ans = document.getElementById("uname_ans");
    uname_ans.innerHTML = "";
    if(_username == ''){
        document.getElementById("uname_ans").style.color = "red";
        uname_ans.innerHTML = "<li>*Please fill the Username</li>"
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open("GET","../scripts/users.json",true);
        xhr.onload=function(){
            if(xhr.status == 200){
                var data = JSON.parse(this.responseText);

                try{
                    for(var i=0;i<=data.length;i++){
                        if(data[i].username==_username){
                            status_username=false;
                            document.getElementById("uname_ans").style.color = "red";
                            document.getElementById("uname_ans").innerHTML = "<li>*Username not available</li>";
                            break;
                        }
                        else{
                            status_username=true;
                        }
                    }
                }
                catch(err){
                    document.getElementById("uname_ans").style.color = "green";
                    document.getElementById("uname_ans").innerHTML = "<li>*Username available</li>";
                }

            }
            else{
                console.log("Error")
            }
        }
        xhr.send();
    }
    
}

// DATE check

function check_date(dob){
    var date_ans = document.getElementById("date_ans");
    date_ans.innerHTML="";
    let now = new Date();
    let dob_list = dob.split("-");
    console.log("Entered date",dob_list[2], dob_list[1], dob_list[0]);
    var date = now.getDate();
    var month = now.getMonth();
    var year = now.getFullYear();
    console.log(date,month,year);
    if(year - dob_list[0] < 12){
        status_dob=false;
        document.getElementById("date_ans").innerHTML = "<li>*Age should be greater than 12 years</li>";
    }
    else{
        status_dob=true;
    }
    if(year - dob_list[0] == 12){
        if(month < dob_list[1]){
            status_dob=false;
            date_ans.innerHTML = "<li>*Age should be greater than 12 years</li>";
        }
        else if(month == dob_list[0]){
            if(date < dob_list[2]){
                status_dob=false;
                date_ans.innerHTML = "<li>*Age should be greater than 12 years</li>";
            }
            else{
                status_dob=true;
            }
        }
        else{
            status_dob=true;
        }
    }
}


// EMAIL-ID CHECK
var email_test = document.getElementById("email_test");
function check_email(){
    var re = /\S+@\S+\.\S+/;
    let _email = document.getElementById("email_test").value;
    console.log(_email);
    let val = re.test(_email);
    document.getElementById("email_ans").innerHTML = "";
    if(val == false){
        document.getElementById("email_ans").innerHTML = "<li>*Please enter valid email</li>";
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open("GET","../scripts/users.json",true);
        xhr.onload=function(){
            if(xhr.status==200){
                var data = JSON.parse(xhr.responseText);
                try{
                    for(var i=0;i<=data.length;i++){
                        if(data[i].email==_email){
                            status_email=false;
                            document.getElementById("email_ans").innerHTML = "<li>*Email id taken</li>";
                            break;
                        }
                        else{
                            status_email=true;
                        }
                    }
                }
                catch(err){
                    console.log("id not found");
                }
            }
            else{
                console.log("ERROR!!");
            }
        }
        xhr.send();
    }
}
//abc@bcd.efg

/*
# RULES for INDIAN pincode
1) It can be only six digits.
2) It should not start with zero.
3) First digit of the pin code must be from 1 to 9.
4) Next five digits of the pin code may range from 0 to 9.
*/
//011007x
//1-9
//411007
// PINCODE CHECK
var pincode_test = document.getElementById("pincode_test");
function check_pincode(){
    var pincode = document.getElementById("pincode_test").value;
    let pincode_ans = document.getElementById("pincode_ans");
    pincode_ans.innerHTML = "";
    if(pincode.length != 6 || pincode[0] == '0' || pincode[0] == 'e' || pincode[0] == 'E'){
        status_pin=false;
        pincode_ans.innerHTML = "<li>*Please enter valid pincode</li>";
    }
    else{
        status_pin=true;
    }
    for(var i = 1 ; i < pincode.length; i++){
        if(pincode[i] == 'E' || pincode[i] == 'e' || pincode[i] == '+' || pincode[i] == '-' || pincode[i] == '.'){
            status_pin=false;
            pincode_ans.innerHTML = "";
            pincode_ans.innerHTML = "<li>*Please enter valid pincode</li>";
            break;
        }
        else{
            status_pin=true;
        }
    }
}

// PASSWORD CHECK
function checkpass(){
    var password = document.getElementById("pass_test1").value;
    console.log(password);
    let sc_count = 0;
    let cap_count = 0;
    let num_count = 0;
    for (var i = 0 ; i < password.length ; i++){
        let j = password[i];
        if(j >= 'A' && j <= 'Z'){
            cap_count++;
        }
        if(j >= 0 && j <= 9){
            num_count++;
        }
        if(j=='@' || j=='#' || j=='$' || j=='^' || j=='&' || j=='*' || j=='%' || j=='~' || j=='`' || j=='!'){
            sc_count++;
        }
    }
    document.getElementById("pass_ans1").innerHTML = "";
    let pass_ans1 = document.getElementById("pass_ans1");
    if(password.length < 8){
        status_pass1=false;
        pass_ans1.innerHTML = "<li>*Password should contain atleast 8 characters</li>" + pass_ans1.innerHTML;
    }
    else{
        status_pass1=true;
    }

    if(cap_count == 0){
        status_pass1=false;
        pass_ans1.innerHTML = "<li>*Password should contain atleast one uppercase letter</li>" + pass_ans1.innerHTML;
    }
    else{
        status_pass1=true;
    }

    if(num_count == 0){
        status_pass1=false;
        pass_ans1.innerHTML = "<li>*Password should contain atleast one number</li>" + pass_ans1.innerHTML;
    }
    else{
        status_pass1=true;
    }

    if(sc_count == 0){
        status_pass1=false;
        pass_ans1.innerHTML = "<li>*Password should contain atleast one special character</li>" + pass_ans1.innerHTML;
    }
    else{
        status_pass1=true;
    }
}

// PASSWORD RE-ENTER CHECK
function confirmpass(){
    var confirmkey = document.getElementById("pass_test2").value;
    var password = document.getElementById("pass_test1").value;
    console.log(confirmkey);
    pass_ans2.innerHTML = "";
    if(password != confirmkey){
        status_pass2=false;
        pass_ans2.innerHTML = "<li>*Please make sure your passwords match</li>";
    }
    else{
        status_pass2=true;
    }
}

//Submit to database
