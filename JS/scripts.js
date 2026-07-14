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


let editId = null;


// FETCH DATA


fetchDances();

async function fetchDances(){


   try{


       loader.style.display = "block";

       const response = await fetch(API);
       dances = await response.json();


       displayDances(dances);




       loader.style.display = "none";


   }

   catch(error){


       console.log(error);


       loader.innerHTML = "Failed to load data";


   }
}

// DISPLAY CARDS..

function displayDances(data){

   danceContainer.innerHTML = "";
   data.forEach(dance => {

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
                   class="edit-btn"
                   onclick="editDance('${dance.id}')">
                   Edit
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
   window.location.href = `details.html?id=${id}`;
}

// SEARCH

searchBtn.addEventListener("click", searchDance);
searchInput.addEventListener("keyup", searchDance);


function searchDance(){

   const value = searchInput.value.toLowerCase();

   const filteredData = dances.filter(dance =>
       dance.name.toLowerCase().includes(value)
   );

   displayDances(filteredData);

}

// OPEN ADD FORM

addDanceBtn.addEventListener("click",()=>{
   formSection.style.display="block";
   formTitle.innerText="Add Dance";
   danceForm.reset();
   editId = null;
});

// CREATE/ edit
danceForm.addEventListener("submit", saveDance);

async function saveDance(event){
   event.preventDefault();

   const dance = {
       name:nameInput.value.trim(),
       origin:originInput.value.trim(),
       category:categoryInput.value.trim(),
       image:imageInput.value.trim(),
       description:descriptionInput.value.trim(),
       history:historyInput.value.trim()
   };

   try{
       let url = API;

       let method = "POST";  

       if(editId){
           url = `${API}/${editId}`;
           method = "PUT";
       }

       const response = await fetch(url,{
           method:method,
           headers:{
            // tells that json format data is being sent.
               "Content-Type":"application/json"

           },
           body:JSON.stringify(dance)
           // converts js objects into string .

       });
       await response.json();

       if(editId){
           alert("Dance updated successfully");
       }
       else{
           alert("Dance added successfully");
       }
       danceForm.reset();
       formSection.style.display="none";
       editId = null;
       fetchDances();

   }
   catch(error){
       console.log(error);
       alert("Something went wrong");
   }
}


// EDIT DATA
function editDance(id){
   const dance = dances.find(


       dance => dance.id == id


   );
   if(!dance){


       return;


   }
   editId = id;
   formSection.style.display="block";
   formTitle.innerText="Edit Dance";
   nameInput.value = dance.name;
   originInput.value = dance.origin;

   categoryInput.value = dance.category;
   imageInput.value = dance.image;
   descriptionInput.value = dance.description;
   historyInput.value = dance.history;
}


// delete -
async function deleteDance(id){
   const confirmDelete = confirm(
       "Are you sure you want to delete?"
   );

   if(!confirmDelete){
       return;
   }

   try{
       const response = await fetch(`${API}/${id}`,{
           method:"DELETE"
       });
       if(response.ok){
           alert("Deleted successfully");
           fetchDances();
       }
       else{
           alert("Delete failed");
       }
   }
   catch(error){
       console.log(error);
   }

}


// cancel
cancelBtn.addEventListener("click",()=>{
   danceForm.reset();
   formSection.style.display="none";
   editId = null;
});


// HIDE FORM (as we will hide form initially..)
formSection.style.display="none";


//global funct.
window.viewDetails = viewDetails;
window.editDance = editDance;
window.deleteDance = deleteDance;
