// =====================================
// GANIT SETU - Final Ranking System
// =====================================


const rankDB = window.supabaseClient;



async function loadStudentRank(){


    const studentId =

    localStorage.getItem("student_id") ||

    localStorage.getItem("studentId");



    if(!studentId){

        const box =
        document.getElementById(
            "todayRankResult"
        );


        if(box){

            box.innerHTML =
            "⚠️ Student ID नहीं मिली";

        }


        return;

    }





    try{


        const {data,error}=await rankDB

        .from("results")

        .select("*")

        .order(
            "marks",
            {
                ascending:false
            }
        );



        if(error){

            console.log(error);

            return;

        }





        let rank = 0;



        data.forEach(
            (student,index)=>{


                if(
                student.student_id == studentId
                ){

                    rank = index + 1;

                }


            }
        );





        const box =
        document.getElementById(
            "todayRankResult"
        );



        if(box){


            if(rank){

                box.innerHTML =
                `
                🏆 आपकी Rank :
                <b>${rank}</b>
                `;

            }

            else{

                box.innerHTML =
                `
                ❌ आपका Result नहीं मिला
                `;

            }


        }



    }


    catch(err){

        console.log(err);

    }


}





// Rank Button Connection


document.addEventListener(
"DOMContentLoaded",
()=>{


    const rankBtn =
    document.getElementById(
        "todayRankButton"
    );



    if(rankBtn){


        rankBtn.onclick =
        loadStudentRank;


    }


});