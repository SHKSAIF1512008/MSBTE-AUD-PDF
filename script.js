document.addEventListener("DOMContentLoaded",()=>{

const searchInput=document.querySelector(".search-input");
const resultsBox=document.querySelector(".search-results");

if(!searchInput || !resultsBox) return;

const cards=[...document.querySelectorAll(".unit-card")];

const units=cards.map(card=>({

title:card.querySelector("h4").textContent,

badge:card.querySelector(".unit-badge").textContent,

element:card

}));

let currentIndex=-1;

searchInput.addEventListener("input",searchUnits);

searchInput.addEventListener("keydown",handleKeys);

document.addEventListener("click",e=>{

if(!e.target.closest(".search-wrapper")){

resultsBox.classList.remove("show");

}

});

function searchUnits(){

const value=searchInput.value.trim().toLowerCase();

resultsBox.innerHTML="";

currentIndex=-1;

cards.forEach(c=>c.style.display="");

if(value===""){

resultsBox.classList.remove("show");

return;

}

const matches=units.filter(unit=>

unit.title.toLowerCase().includes(value) ||

unit.badge.toLowerCase().includes(value)

);

cards.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"":"none";

});

if(matches.length===0){

resultsBox.innerHTML=`<div class="no-search-result">No units found.</div>`;

resultsBox.classList.add("show");

return;

}

matches.forEach((unit,index)=>{

const item=document.createElement("div");

item.className="search-item";

const highlighted=unit.title.replace(

new RegExp(`(${value})`,"ig"),

"<mark>$1</mark>"

);

item.innerHTML=`

<div>

<h6>${highlighted}</h6>

<small>${unit.badge}</small>

</div>

<i class="bi bi-arrow-up-right"></i>

`;

item.onclick=()=>openUnit(unit);

resultsBox.appendChild(item);

});

resultsBox.classList.add("show");

}

function handleKeys(e){

const items=[...resultsBox.querySelectorAll(".search-item")];

if(!items.length) return;

if(e.key==="ArrowDown"){

e.preventDefault();

currentIndex=(currentIndex+1)%items.length;

updateActive(items);

}

if(e.key==="ArrowUp"){

e.preventDefault();

currentIndex=(currentIndex-1+items.length)%items.length;

updateActive(items);

}

if(e.key==="Enter"){

e.preventDefault();

if(currentIndex>=0){

items[currentIndex].click();

}

}

}

function updateActive(items){

items.forEach(i=>i.classList.remove("active"));

items[currentIndex].classList.add("active");

items[currentIndex].scrollIntoView({

block:"nearest"

});

}

function openUnit(unit){

resultsBox.classList.remove("show");

searchInput.value=unit.title;

unit.element.scrollIntoView({

behavior:"smooth",

block:"center"

});

unit.element.style.transform="scale(1.03)";

setTimeout(()=>{

unit.element.style.transform="";

},400);

}

});