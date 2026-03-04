let themeButton = document.getElementById("theme-button");
const form = document.getElementById("form");
const submit = document.getElementById("submit");
const signatures = document.getElementById("signatures");
let signatureCount = 0;
var modal = document.querySelector(".modal");
var span = document.getElementsByClassName("close")[0];

const myElement = document.querySelector('.my-element');
const originalStyles = {};

let person = {
  name: "",
  email: "",
}

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener('click', toggleDarkMode);


const reduceMotionButton = document.getElementById('reduceMotionButton');

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
      
      animateSections(); 


    } 
   
    else {
      reveals[i].classList.remove("active");
    }
    
  }
}

window.addEventListener("scroll", reveal);

function animateSections() {
  $("section").each(function(index) {
    var initialLeft = $(this).position().left;
    var initialFontSize = $(this).css("font-size");
    $(this).delay(index * 500)
          .animate({ left: initialLeft + 40, fontSize: '17px' }, "slow"); 
    
  });
}



const animation = {
  bgRate: 0.5,
  birdRate: 0.5,
  forestRate: 0.15,
  foliageRate: 0.15,
  textRate: 1,
  transitionDelay: '0s' 
  
};

function reduceMotion() {
  var reveals = document.querySelectorAll(".reveal");
  animation.bgRate = 0.2;
  animation.birdRate = 0.2; 
  animation.transitionDelay = '.01s'; 
  for (let i = 0; i < reveals.length; i++) {
    reveals[i].style.animation = 'none';
    reveals[i].classList.remove("active");
    reveals[i].classList.remove("reveal");
    reveals[i].style.transition = 'opacity .01s ease-in-out'; 
    $("section").stop(); // Stops all animations on the element
    $("section").stop(true, true);
  }
  console.log(reduceMotion);
}


const elementsToReduceMotion = document.querySelectorAll('.dropdownMenu,.dropdownItem,.dropdownLink,.reveal'); 

function toggleReduceMotion() {
    const isReduceMotionEnabled = document.body.classList.contains('reveal');
  
    if (isReduceMotionEnabled) {
      document.body.classList.add('reveal');

        reduceMotionButton.textContent = "Reduce Motion"; 
    } 
    else {
      document.body.classList.remove ('reveal');
        reduceMotionButton.textContent = "Motion On";
    }
  
    elementsToReduceMotion.forEach(element => {
        if (isReduceMotionEnabled) {
        element.classList.add('reveal');
        } else {
            element.classList.remove('reveal');
        }
    });
}

reduceMotionButton.addEventListener("click", toggleReduceMotion);


/* 
  Moves the progress bar along and resets it once it reaches 100
*/
var i = 0;

function move(person) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        elem.style.width = "0%";
        width = 0;
        toggleModal(person);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
const modalImage = document.querySelector('.modalImg');
const modalTextContainer = document.querySelector('.modal-text-container');
let scaleFactor = .6;
function scaleImg() {
  if (scaleFactor === .6) {
    scaleFactor = .2;
  }
  else if (scaleFactor === .2) {
    scaleFactor = .6;
  }
  console.log(scaleFactor);
  modalImage.style.transform = `scale(${scaleFactor})`;
}



function toggleModal(person) {
  modal.style.display = 'flex';

  let R = document.querySelector('.T');
  R.innerText = person.name + ' Im proud of you';

  let intervalId = setInterval(() => scaleImg(), 500); // Call scaleImg every 500ms (0.5 seconds)
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);

  }, 4000)

}



const closeModalButton = document.getElementById('closeModalButton');
// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}
// Add event listener to the button
closeModalButton.addEventListener('click', closeModal);

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  var petitionInputs = document.getElementById("form").elements;
  let person = {
    name: petitionInputs[0].value // accesses and saves value of first input
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }

    else if (i === 1) {
      let email = document.getElementById('email').value;
      if (!email.includes('\.') || !email.includes('@')) {
        containsErrors = true;
        petitionInputs[i].classList.add('error');
      }
      else {
        petitionInputs[i].classList.remove('error');
      }
    }
  }

  if (!containsErrors) {
    move(person);
    addSignature(person);

    for (let i = 0; i < petitionInputs.length - 1; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }

  }
}



const addSignature = (person) => {
  let signature = document.createElement("p");
  signature.textContent = `🖊️ ${person.name} supports this cause.`; signatures.appendChild(signature);
  signatureCount += 1;
  document.getElementById("signature-count").textContent = signatureCount;
}

submit.addEventListener('click', validateForm);


$("#hide").click(function() {
  $("p").hide(1000)
});
$("#show").click(function() {
  $("p").show(1000)
});
