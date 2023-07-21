let slider = document.querySelector('#slider');
let innerSlider = document.querySelector('#slider-inner');
let column = document.querySelectorAll('.slider-columns');
let col = column[2].getBoundingClientRect();
                                   
let pressed = false;                
let startx;                         
let x;                               
                                   
slider.addEventListener('mousedown', (e)=>{
    pressed = true;               
    startx = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = 'grabbing';
});                               
                                  
slider.addEventListener('mouseenter', ()=>{
    slider.style.cursor = 'grab'; 
});                              
                                  
                                  
slider.addEventListener('mouseup', ()=>{
    slider.style.cursor = 'grab';
});

window.addEventListener('mouseup', ()=>{
    pressed = false;
});

slider.addEventListener('mousemove', (e)=>{
    if(!pressed) return;
    e.preventDefault();

    x = e.offsetX;
    innerSlider.style.left = `${x - startx}px`;

    checkBoundary();
});

function checkBoundary(){
    let outer = slider.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if(parseInt(innerSlider.style.left) > 0){
        innerSlider.style.left = '0px';
    }       
} 

// let taskbar = document.querySelector('#taskbar');
// let tabFriends = ["Gab", "Flo", "Ali", "Lolo"];
// let tabStyleColor = ["#F4221C", "#E6BBAD", "lightgrey", "#BCE6AD"]
// let tabOffset = 0;
// let p;

// let head = document.querySelector('head');
// let title = head.querySelector('title');
// title = title.textContent;
// let begin = title.indexOf('(');
// let end = title.lastIndexOf(')');
// title = title.substring(begin + 1, end);

// let innerSlid = document.querySelector('#slider-inner');
// let colSlider = innerSlid.querySelectorAll('.slider-columns');
// colSlider[0].style.backgroundColor = "#F4221C";

// for(var j = 0; j < tabFriends.length - 1; j++){
//     colSlider[j].style.backgroundColor = tabStyleColor[j];
//     for(var i = 0; i < tabFriends.length; i++){
//         let child = document.createElement("p");
//         taskbar.appendChild(child);
//     }
//     p = taskbar.querySelectorAll('p');
//     if(title != tabFriends[j]){
//         p[j].textContent = `${j+1}- ${tabFriends[j + tabOffset]}`;
//         p[j].style.color = tabStyleColor[j];
//     }
//     else{
//         p[j].textContent = `${j+1}- ${tabFriends[j+1]}`;
//         p[j].style.color = tabStyleColor[j];
//         tabOffset++;
//     }
    
// }



/* const nbCours = 2;

for(var i = 0; i < nbCours; i++){
    let nomCours = prompt(`Entrez le nom de votre cours ${i+1}`);
    let lieuCours = prompt(`Entrez le lieu de votre cours (POC-P002)`);
    PutInUser(nomCours, lieuCours, i);
}  

/* function PutInUser(nomCours, lieuCours, plageHoraire){
    td = document.getElementById(plageHoraire.toString());
    td.innerHTML = nomCours + "<br>" + lieuCours;
    
}

button onclick=function AjoutD'amis = createElement();*/