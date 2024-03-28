//api nyckel <Q6tpagmLDWWr3IOOu2Nde4JldDI4ygvr7TwRUfB0>
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=Q6tpagmLDWWr3IOOu2Nde4JldDI4ygvr7TwRUfB0

const apiNasa = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-6-3&api_key=Q6tpagmLDWWr3IOOu2Nde4JldDI4ygvr7TwRUfB0"
// skapa ref till swithBTN
const switchBtn = document.querySelector('#switchBtn');
// console.log(switchBtn);
const bodyRef = document.querySelector('body');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';
const inputText = document.querySelector('#inputText');
const nameText = document.querySelector('#name');
const addBtn = document.querySelector('#btn_add');
fetch(apiNasa)
.then ((respons) => respons.json())
.then ((data) => {
    console.log(data);
    const nasaImage = data.photos;
    const imgContainer = document.querySelector(".cardContainer");

    const fourCards = nasaImage.slice(0, 4);
    if (fourCards.length !== 0) {
        //om detta stämmer så finns det data
        console.log("det finns data");
        //skapar loop
        fourCards.forEach((nasaCard) => {
            console.log(nasaCard.name);

            const newCard = createCard(nasaCard);
            imgContainer.append(newCard);

        })
        
    } else {
        console.log("Det finns tyvärr ingen data");
        const noImg = document.createElement("h3");
        noImg.classList.add("noImg"); 
        noImg.textContent= "Bilden kan inte laddass in";
        imgContainer.appendChild(noImg);
    }

}).catch((error) => console.log(`detta är felet: ${error}`));

function createCard(nasaCard) {

    const card = document.createElement ("article");
    const fig = document.createElement ("figure");
    const image = document.createElement ("img");
    const heading = document.createElement ("h3");
    const info = document.createElement ("p");
    
    card.classList.add("card");
    fig.classList.add("imgHolder");
    image.classList.add("image");
    heading.classList.add("heading");
    info.classList.add("info");
    
    heading.textContent = `NASA Rover heading: ${nasaCard.camera.name}`;
    info.textContent = `Date of photo: ${nasaCard.earth_date}`;
    card.appendChild(heading);
    card.appendChild (info);

    
    //hämtar bilder + lägger till dem
    image.src = nasaCard.img_src;
    image.alt = "Mars Image";
    card.appendChild(fig);
    fig.appendChild(image);
    return card;
}
// kontrollera om det finns något i localStorage
if (localStorage.getItem(darkModeKey)=== darkModeValue) {
    // om detta är sant så finns det i localStorage
    console.log('det finns något i localStorage');
    // anropa funktion för att lägga till klassen darkmode
    enabledDarkMode();
} 
else {
    
}

// lyssnare på kanppen
switchBtn.addEventListener('click' , () => {
    // vad ska hända när du klickar?
    // console.log('du klickade på switchBtn');
    // bodyRef.classList.toggle('dark');
    // anropa funktionen som kontrollerar om dark finns
    toggleDarkMode(); 
});
// skapa en funktion
function toggleDarkMode (){
    // funktionen som ska kontrollera om klassen finns på body
    console.log('toggleDarkMode körs');
    // Om body har classen dark
    if (bodyRef.classList.contains('dark')) {
        // blir sann om dark finns på body
        console.log('body har klassen dark');
        disableDarkMode();
    }
    else{
        console.log('body har inte classen dark');
        // Om dark inte finns så vill vi lägga till den 
        enabledDarkMode();
    }
}
function enabledDarkMode () {
    // funktion för att lägga till dark
    console.log('enabledDarkMode körs');
    // lägga till klass på body
    bodyRef.classList.add ('dark');
    // anrop till funktion
    setlocalStorage();
    switchBtn.checked = true;
}
function disableDarkMode(){
    // funktion för att ta bort klassen dark
    console.log('disabledDarkMode körs');
    // för att sätta input till checken 
    switchBtn.checked = false;
    bodyRef.classList.remove ('dark');
    // för att ta bort localStorage
    removelocalStorage();
}
function setlocalStorage(){
    // funktion för att sätta localStorage
    console.log('sätter localStorage');
    // sätter localStorage
    localStorage.setItem(darkModeKey,darkModeValue);
    
}
function removelocalStorage(){
    console.log(' removelocalStorage körs');
    // för att ta bort localStorage
    localStorage.removeItem(darkModeKey);
}
addBtn.addEventListener('click', () => {
    // console.log('du klickade på btn');
    //vad ska hända när vi klickar på addBtn
    // console.log('Ditt namn visas');
    // hämtar värdet i input 
    // lägger till text i ett html element
    nameText.textContent = inputText.value;
    // rensar input på värde 
    inputText.value = '';
});

inputText.addEventListener('keyup', () => {
    console.log(inputText.value.length);
    let getValueLength = inputText.value.length;
    if (getValueLength > 3) {
        console.log('mer än tre bokstäver');
        addBtn.disabled = false;
    } else {
        console.log('det är mindre än tre tecken');
        addBtn.disabled = true;
    }
});
btn_add.addEventListener('click', () => {
    //om det är tomt i unput
    if (inputText.value === ''){
        // om det är tomt i input
        console.log('det finns inget i input');
        addBtn.disabled = true;  
    }
})

