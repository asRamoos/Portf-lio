// LOADER
window.addEventListener("load",()=>{
document.getElementById("loader").style.opacity="0";
setTimeout(()=>{
document.getElementById("loader").style.display="none";
},600);
});

// HEADER SCROLL
const header=document.querySelector("header");
window.addEventListener("scroll",()=>{
if(window.scrollY>80){
header.classList.add("scrolled");
}else{
header.classList.remove("scrolled");
}
});

// SCROLL REVEAL
const reveals=document.querySelectorAll(".reveal");

function revealOnScroll(){
reveals.forEach(el=>{
const windowHeight=window.innerHeight;
const elementTop=el.getBoundingClientRect().top;
if(elementTop<windowHeight-100){
el.classList.add("active");
}
});
}

window.addEventListener("scroll",revealOnScroll);

// GITHUB API
const username="asRamoos";
const reposDesejados=["BigStreet"];

fetch(`https://api.github.com/users/${username}/repos`)
.then(res=>res.json())
.then(data=>{
const container=document.getElementById("repos");

data
.filter(repo=>reposDesejados.includes(repo.name))
.forEach(repo=>{
const card=document.createElement("div");
card.classList.add("project-card");

card.innerHTML=`
<h3>${repo.name}</h3>
<p>${repo.description?repo.description:"Projeto profissional Full Stack."}</p>
<a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
`;

container.appendChild(card);
});
})
.catch(err=>console.error(err));
