const container=document.querySelector(".container");
const seat=document.querySelectorAll(".row .seat:not(.reserved)");
const count=document.getElementById("count");
const total=document.getElementById("total");
const movieSelect=document.getElementById("movie");

populateUI();
let ticketPrice= +movieSelect.value;
//console.log(ticketPrice);
//save salacted movie price and index
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex',movieIndex);
  localStorage.setItem('selectedMoviePrice',moviePrice);
}

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected')
    
    //const seatsIndex= [...selectedSeats].map((seat) => [...seats].indexOf(seats));
    const seatsIndex= [...selectedSeats].map(function (seat) {
         return [...selectedSeats].indexOf(seat);
    });
    //console.log(seatsIndex);
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText=selectedSeatsCount;
    total.innerText=selectedSeatsCount*ticketPrice;
    
    //console.log(selectedSeatsCount);
};
// get data from localstorage and populate the UI
function populateUI(){
  const selectedSeats =JSON.parse(localStorage.getItem("selectedSeats"));

  if(selectedSeats !==null && selectedSeats.length> 0) {
    seat.forEach((seat,index) => {
      if (selectedSeats.indexOf(index)>-1){
        seat.classList.add("selected");
      }      
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex != null){
    movieSelect.selectedIndex=selectedMovieIndex;
  }
}
// move select event
movieSelect.addEventListener('change',(e)=> {
    ticketPrice=e.target.value;
    //console.log(e.target.seatsIndex);
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
}); 

container.addEventListener("click", (e) => {
  //console.log(e.target);
    if (e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved"))
     {  
            //console.log(e.target);
            e.target.classList.toggle("selected");
    }  
   updateSelectedCount()     
});
updateSelectedCount();