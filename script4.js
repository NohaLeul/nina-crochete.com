const checkbox = document.getElementById("agree");
const joinBtn = document.getElementById("joinBtn");

checkbox.addEventListener("change", () => {

  if(checkbox.checked){

    joinBtn.classList.add("active");

  } else {

    joinBtn.classList.remove("active");

  }

});