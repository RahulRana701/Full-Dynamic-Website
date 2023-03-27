let bg=document.querySelector(".burger");
let a=document.querySelector(".jatt");
let b=document.querySelector(".navbar");

bg.addEventListener("click",()=>{
    a.classList.toggle('v-class');
    b.classList.toggle('h-class');
})



