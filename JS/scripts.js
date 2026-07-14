const API = "https://6a550134e49d9eb2cc557238.mockapi.io/Dance";


const danceContainer = document.getElementById("danceContainer");
const loader = document.getElementById("loader");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const addDanceBtn = document.getElementById("addDanceBtn");

const formSection = document.getElementById("formSection");
const danceForm = document.getElementById("danceForm");

const formTitle = document.getElementById("formTitle");

const nameInput = document.getElementById("name");
const originInput = document.getElementById("origin");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("image");
const descriptionInput = document.getElementById("description");
const historyInput = document.getElementById("history");

const cancelBtn = document.getElementById("cancelBtn");



let dances = [];





// 1. data is FETCHed 


fetchDances();


async function fetchDances(){

    try{

        loader.style.display="block";


        const response = await fetch(API);


        dances = await response.json();


        displayDances(dances);


        loader.style.display="none";


    }
    catch(error){

        console.log(error);

        loader.innerHTML="Failed to load data";

    }

}




// DISPLAY CARDS


function displayDances(data){


    danceContainer.innerHTML="";


    data.forEach(dance=>{


        danceContainer.innerHTML += `


        <div class="card">


            <img 
            src="${dance.image}"
            alt="${dance.name}"
            onerror="this.src='https://placehold.co/400x250?text=No+Image'">


            <div class="cardcontent">


                <h3>${dance.name}</h3>


                <p>
                <b>Origin:</b>
                ${dance.origin}
                </p>


                <p>
                <b>Category:</b>
                ${dance.category}
                </p>



                <div class="btn-group">


                    <button 
                    class="details-btn"
                    onclick="viewDetails('${dance.id}')">

                    Details

                    </button>



                    <button 
                    class="delete-btn"
                    onclick="deleteDance('${dance.id}')">

                    Delete

                    </button>


                </div>


            </div>


        </div>


        `;


    });


}







// DETAILS PAGE

function viewDetails(id){


    window.location.href=`details.html?id=${id}`;


}





// SEARCH



searchBtn.addEventListener("click",searchDance);


searchInput.addEventListener("keyup",searchDance);



function searchDance(){


    const value = searchInput.value.toLowerCase();



    const filteredData = dances.filter(dance=>


        dance.name.toLowerCase().includes(value)


    );

    displayDances(filteredData);


}








// OPEN ADD FORM .. 
addDanceBtn.addEventListener("click",()=>{


    formSection.style.display="block";


    formTitle.innerText="Add Dance";


    danceForm.reset();


});








// CREATE DATA
danceForm.addEventListener("submit",saveDance);
async function saveDance(event){


    event.preventDefault();



    const dance={


        name:nameInput.value.trim(),
        origin:originInput.value.trim(),
        category:categoryInput.value.trim(),
        image:imageInput.value.trim(),
        description:descriptionInput.value.trim(),
        history:historyInput.value.trim()
    };


    try{
        const response = await fetch(API,{

            method:"POST",

            headers:{

                "Content-Type":"application/json" // yeh apan data bhej rahe hain wo Json.. format me hai.
            },
            body:JSON.stringify(dance)


        });



        await response.json();



        alert("Dance added successfully");
        danceForm.reset();
        formSection.style.display="none";
        fetchDances();
    }


    catch(error){
        console.log(error);
        alert("Something went wrong");


    }
}









// DELETE DATA
async function deleteDance(id){


    const confirmDelete = confirm(
        "Are you sure you want to delete?"
    );


    if(!confirmDelete){

        return;

    }



    try{


        await fetch(`${API}/${id}`,{

            method:"DELETE"

        });



        alert("Deleted successfully");


        fetchDances();


    }


    catch(error){


        console.log(error);


    }


}








// CANCEL FORM
cancelBtn.addEventListener("click",()=>{
    danceForm.reset();
    formSection.style.display="none";
});








// HIDE FORM INITIALLY
formSection.style.display="none";







// GLOBAL FUNCTIONS
window.viewDetails=viewDetails;

window.deleteDance=deleteDance;