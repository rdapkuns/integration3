import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// 36

//960px

//72 + 24 + 12

const typecase = document.querySelector(".typecase")

const mq = window.matchMedia("(min-width: 500px)");
let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

const createElements = (cellCount) => {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    // cell.textContent = i
    cell.classList.add("cell", `cell--${i}`);
    typecase.appendChild(cell);
  }
}

const reportWindowSize = () => {
  width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  typecase.innerHTML = ""

  const specialCells = document.querySelectorAll('.cell--special');
  specialCells.forEach(cell => cell.classList.remove('cell--special'));

  if (width < 960) {
    createElements(36)
    let special1 = document.querySelector(".cell--6")
    let special2 = document.querySelector(".cell--27")
    let special3 = document.querySelector(".cell--33")
    special1.classList.add("cell--special")
    special2.classList.add("cell--special")
    special3.classList.add("cell--special")
  } else {
    createElements(110)
    let special1 = document.querySelector(".cell--14")
    let special2 = document.querySelector(".cell--89")
    let special3 = document.querySelector(".cell--92")
    special1.classList.add("cell--special")
    special2.classList.add("cell--special")
    special3.classList.add("cell--special")
  }
}

const init = () => {
  if(width < 960){
    createElements(36)
    let special1 = document.querySelector(".cell--6")
    let special2 = document.querySelector(".cell--27")
    let special3 = document.querySelector(".cell--33")
    special1.classList.add("cell--special")
    special2.classList.add("cell--special")
    special3.classList.add("cell--special")
  } else {
    createElements(110)
    let special1 = document.querySelector(".cell--14")
    let special2 = document.querySelector(".cell--89")
    let special3 = document.querySelector(".cell--92")
    special1.classList.add("cell--special")
    special2.classList.add("cell--special")
    special3.classList.add("cell--special")
  }
  window.addEventListener("resize", reportWindowSize);
}

init();