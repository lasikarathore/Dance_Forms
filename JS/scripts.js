const danceForms = [
    "Bharatanatyam",
    "Kathak",
    "Kathakali",
    "Odissi",
    "Kuchipudi",
    "Mohiniyattam",
    "Ballet",
    "Salsa_(dance)",
    "Flamenco",
    "Tango"
];



const danceContainer = document.getElementById("danceContainer");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");



// we will store here ..  fetched data

let dances = [];


// fetchingg..

async function fetchDances(){
    try{

        loader.style.display = "block";


        const promises = danceForms.map(async(dance)=>{


            const response = await fetch(

                `https://en.wikipedia.org/api/rest_v1/page/summary/${dance}`

            );
            const data = await response.json();
           // console.log(data);      

            return data;
        });



        dances = await Promise.all(promises);
        displayDances(dances);
    }
    catch(error){

        console.log(error);

        danceContainer.innerHTML =
        `
        <h2>
        Failed to load dances
        </h2>
        `;

    }
    finally{

        loader.style.display = "none";

    }

}










function displayDances(data){


    danceContainer.innerHTML = "";
    data.forEach((dance)=>{


        const image = dance.thumbnail 
        ? dance.thumbnail.source 
        : "https://via.placeholder.com/400";



        const card = document.createElement("div");

        card.classList.add("card");
        card.innerHTML = `

            <img src="${image}"">


            <div class="cardcontent">

                <h3>
                    ${dance.title}
                </h3>
                <p>
                    ${dance.extract 
                    ? dance.extract.substring(0,120) + "..."
                    : "No description is available right now for this dance form"}
                </p>


    
                <button 
                class="details-btn"
                onclick="viewDetails('${dance.title}')">

                    View Details

                </button>


            </div>

        `;

        danceContainer.appendChild(card);


    });


}






searchBtn.addEventListener("click",()=>{


    const searchvalue = searchInput.value.toLowerCase();
    const filterdataa = dances.filter((dance)=>{


        return dance.title
        .toLowerCase()
        .includes(searchvalue);
    });

    displayDances(filterdataa);

});


function viewDetails(danceName){
    window.location.href = 
    `details.html?dance=${danceName}`;

}


fetchDances();