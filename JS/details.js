const detailsContainer =
document.getElementById("detailsContainer");


// Get dance name from URL       
// console.log(window)
const params =
new URLSearchParams(window.location.search);


// brings encoded url  to normal texttt form.. 
const danceName =
decodeURIComponent(
    params.get("dance")
);



async function fetchDanceDetails(){


    try{
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(danceName)}`
        );


        if(!response.ok){
            throw new Error("Dance not found");
        }


        const data =
        await response.json();

        displayDetails(data);
    }

    catch(error){
        detailsContainer.innerHTML = `

            <h2>
            Unable to fetch dance details
            </h2>

            <p>
            ${error.message}
            </p>
        `;


    }


}
function displayDetails(dance){
    const image =
    dance.thumbnail
    ? dance.thumbnail.source
    : "https://via.placeholder.com/600";



    detailsContainer.innerHTML = `
        <img src="${image}">

        <h2>
        ${dance.title}
        </h2>

        <p>

        ${dance.extract}

        </p>
    `;
}

fetchDanceDetails();