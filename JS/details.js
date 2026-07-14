const API = "https://6a550134e49d9eb2cc557238.mockapi.io/Dance";


// it is getting the  id from URL

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const detailsContainer = document.getElementById("detailsContainer");
const loader = document.getElementById("loader");


// Fetch all dances and find matching id
fetch(API)

.then(response => response.json())

.then(dances => {


    const dance = dances.find(item => item.id == id);

    if(!dance){
        throw new Error("Dance not found");

    }
    loader.style.display = "none";



    detailsContainer.innerHTML = `


        <img 
        src="${dance.image}"
        alt="${dance.name}">


        <h2>
            ${dance.name}
        </h2>


        <h3>
            Origin : ${dance.origin}
        </h3>


        <h3>
            Category : ${dance.category}
        </h3>


        <p>
            ${dance.description}
        </p>

        <br>
        <p>
            <strong>History:</strong>
        </p>


        <p>
            ${dance.history}
        </p>

        <button id="backBtn">
            Back
        </button>


    `;



    document.getElementById("backBtn") .addEventListener("click",()=>{

        window.location.href="index.html";
    });



})

.catch(error=>{


    console.log(error);


    loader.style.display="none";


    detailsContainer.innerHTML = `

        <h2>
            Dance Not Found
        </h2>

        <button id="backBtn">
            Back
        </button>

    `;


    document
    .getElementById("backBtn")
    .addEventListener("click",()=>{


        window.location.href="index.html";
    });
});