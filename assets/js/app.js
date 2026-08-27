// =====================================
// GANIT SETU - App Control
// =====================================


document.addEventListener(
"DOMContentLoaded",
()=>{


// Class 9 Button

const class9 =
document.getElementById(
"class9Button"
);


if(class9){

class9.onclick = ()=>{

window.location.href =
"class9.html";

};

}



// Class 10 Button

const class10 =
document.getElementById(
"class10Button"
);


if(class10){

class10.onclick = ()=>{

window.location.href =
"class10.html";

};

}



// Daily Test Button

const test =
document.getElementById(
"testButton"
);


if(test){

test.onclick = ()=>{

window.location.href =
"test.html";

};

}



// Profile Button

const profile =
document.getElementById(
"profileButton"
);


if(profile){

profile.onclick = ()=>{


const section =
document.querySelector(
".profile-card"
);



if(section){

section.scrollIntoView(
{
behavior:"smooth"
}
);

}


};

}



});