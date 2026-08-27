// =====================================
// GANIT SETU - Final Winner System
// =====================================


const winnerDB = window.supabaseClient;


// Default Image

const defaultImage = "assets/images/user.png";



// Daily Champion

async function loadDailyChampion(){


    try{


        const { data, error } = await winnerDB

        .from("results")

        .select("*")

        .order(
            "marks",
            {
                ascending:false
            }
        )

        .limit(1);



        if(error){

            console.log(error);

            return;

        }



        const box = document.getElementById(
            "dailyChampion"
        );



        if(!box){

            return;

        }



        if(data && data.length){


            const winner = data[0];


            box.innerHTML = `

            <div class="champion-card">


            <h3 class="champion-title">

            🏆 Daily Champion

            </h3>



            <img 
            src="${winner.photo || defaultImage}"
            >



            <h4>

            ${winner.name || ""}

            </h4>



            <p>

            Marks : ${winner.marks || 0}

            </p>



            </div>

            `;


        }


    }

    catch(error){

        console.log(error);

    }

}





// Top 10 Students


async function loadTopTen(){


    try{


        const { data,error } = await winnerDB

        .from("results")

        .select("*")

        .order(
            "marks",
            {
                ascending:false
            }
        )

        .limit(10);



        if(error){

            console.log(error);

            return;

        }



        const list = document.getElementById(
            "topTenList"
        );



        if(!list){

            return;

        }



        list.innerHTML="";



        data.forEach(
            (student,index)=>{


                let medal = index + 1;


                if(index===0)
                medal="🥇";


                if(index===1)
                medal="🥈";


                if(index===2)
                medal="🥉";



                list.innerHTML += `


                <div class="top-card">


                    <div class="rank-badge">

                    ${medal}

                    </div>



                    <img 
                    src="${student.photo || defaultImage}"
                    >



                    <div>


                    <h4>

                    ${student.name || ""}

                    </h4>


                    <p>

                    Marks : ${student.marks || 0}

                    </p>


                    </div>


                </div>


                `;


            }
        );


    }


    catch(error){

        console.log(error);

    }


}





// Load Automatically

document.addEventListener(
"DOMContentLoaded",
()=>{


    loadDailyChampion();


    loadTopTen();


});