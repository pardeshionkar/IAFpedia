document.getElementById("submit").addEventListener("click",pass_test);

function pass_test(){
    var uname_test = document.getElementById("uname_test").value;
    var pass_test = document.getElementById("pass_test").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET","../scripts/users.json",true);
    xhr.onload=function(){
        if(xhr.status == 200){
            var stat =null;
            var _data = JSON.parse(this.responseText);
            try{
                for(var i=0;i<=_data.length;i++){
                    var count = parseInt(i);
                    if(uname_test == _data[count].username && pass_test == _data[count].password){
                        stat = true;
                        break;
                    }
                    else{
                        stat = false;
                    }
                }
                if(stat==true){
                    window.location.assign("main_page.html");
                }
                else{
                    document.getElementById("db_ans").innerHTML = "<li>*Username and password don't match</li>";
                }
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            console.log("Error")
        }
    }
    xhr.send();
}