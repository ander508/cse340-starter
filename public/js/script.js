const pswBtn = document.getElementById("pswBtn");

pswBtn.addEventListener("click", function(){
    const pword = document.getElementById("account_password")

    const type = pword.getAttribute("type")

    if(type == "password"){
        pword.setAttribute("type", "text")
        pswBtn.innerHTML = "Hide Password"
    }
    else{
        pword.setAttribute("type", "password")
        pswBtn.innerHTML = "Show Password"

    }
})