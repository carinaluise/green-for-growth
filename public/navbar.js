const dropdownLogo = document.getElementById('dropdown-logo');
const dropdownLinks = document.getElementsByClassName('dropdown-l');

dropdownLogo.addEventListener("click" , (e) =>{
    
    for(var i = 0; i < 4; i++){
        if(dropdownLinks[i].style.display == "none"){
            dropdownLinks[i].style.display = "block";
        } else {dropdownLinks[i].style.display = "none";}
    }

});
