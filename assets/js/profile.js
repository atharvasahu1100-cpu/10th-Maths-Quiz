// =====================================
// GANIT SETU - Profile System (Supabase)
// =====================================

const profileDB = window.supabaseClient;
const defaultImage = "assets/images/user.png";

function getStudentId(){
    return localStorage.getItem("student_id") ||
           localStorage.getItem("studentId") ||
           localStorage.getItem("mobile") ||
           localStorage.getItem("studentMobile");
}

function showPhoto(photo){
    const img=document.getElementById("studentPhotoPreview");
    if(img){
        img.src = photo || defaultImage;
    }
}

async function loadProfile(){

    const id=getStudentId();

    if(!id){
        console.log("Student ID not found");
        return;
    }

    try{

        const {data,error}=await profileDB
        .from("students")
        .select("*")
        .or(`student_id.eq.${id},mobile.eq.${id}`)
        .single();

        if(error){
            console.log("Profile error:",error);
            showPhoto(defaultImage);
            return;
        }

        if(data){

            const name=document.getElementById("studentName");
            const cls=document.getElementById("studentClass");
            const mobile=document.getElementById("studentMobile");

            if(name) name.innerHTML=data.name || data.student_name || "";
            if(cls) cls.innerHTML=data.class || data.class_name || "";
            if(mobile) mobile.innerHTML=data.mobile || "";

            showPhoto(data.photo || data.image || defaultImage);

            window.currentStudent=data;
        }

    }catch(e){
        console.log(e);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    loadProfile();
});
