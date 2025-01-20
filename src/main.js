import './reset.css'
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


let isWide = (window.innerWidth > 0 ? window.innerWidth : screen.width) > 960;

const typecase = document.querySelector(".typecase")

const maskImage = document.getElementById('mask-image');
const maskContainer = document.getElementById('mask-container');

let offsetX, offsetY;
let isDragging = false;
const draggableDiv = document.querySelector(".map__plantin")
const container = document.querySelector(".map__container")

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


function checkScreenSize() {
  const wasWide = isWide;
  const currentWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  isWide = currentWidth > 960;

  if (wasWide !== isWide) {
    if (isWide) {
      addSpecialCells(110, 14, 89, 92);
    } else {
      addSpecialCells(36, 6, 27, 33);
    }
  }
}

const addSpecialCells = (cellCount, s1, s2, s3) => {
  const specialCells = document.querySelectorAll('.cell--special');
  specialCells.forEach(cell => cell.classList.remove('cell--special'));
  createElements(cellCount)
  let special1 = document.querySelector(`.cell--${s1}`)
  let special2 = document.querySelector(`.cell--${s2}`)
  let special3 = document.querySelector(`.cell--${s3}`)
  special1.classList.add("cell--special")
  special2.classList.add("cell--special")
  special3.classList.add("cell--special")
}


let leftPercent
let topPercent

draggableDiv.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
  draggableDiv.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  draggableDiv.style.cursor = 'grab';
  checkPlantinPos(leftPercent, topPercent)
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const rect = container.getBoundingClientRect();
  let left = e.clientX - rect.left - offsetX;
  let top = e.clientY - rect.top - offsetY;

  const centerLeft = left + draggableDiv.offsetWidth / 2;
  const centerTop = top + draggableDiv.offsetHeight / 2;

  // Constrain within the parent container
  left = Math.max(0, Math.min(left, rect.width - draggableDiv.offsetWidth));
  top = Math.max(0, Math.min(top, rect.height - draggableDiv.offsetHeight));

  draggableDiv.style.left = `${left}px`;
  draggableDiv.style.top = `${top}px`;

  leftPercent = (centerLeft / rect.width) * 100;
  topPercent = (centerTop / rect.height) * 100;
  // Update coordinate display
  // console.log(leftPercent.toFixed(2), topPercent.toFixed(2));

  // checkPlantinPos(leftPercent, topPercent)
});

let hasBeenToLaiden = false
const mapUnlock1 = document.querySelectorAll(".map__unlock--1")
const mapUnlock2 = document.querySelector(".map__unlock--2")

const checkPlantinPos = (left, top) => {

  if (left > 40 && top > 30) {
    if (left < 50 && top < 40) {
      console.log("plantin in Leiden")
      mapUnlock1.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      })
      hasBeenToLaiden = true
    }
  }

  if (left > 38 && top > 54) {
    if (left < 50 && top < 60) {
      if(hasBeenToLaiden == true){
        console.log("plantin in Antwerp")
        mapUnlock2.style.opacity = "1";
        mapUnlock2.style.transform = "translateY(0)";
      }
    }
  }

}

const init = () => {
  if (width < 960) {
    addSpecialCells(36, 6, 27, 33);
  } else {
    addSpecialCells(110, 14, 89, 92);
  }
  window.addEventListener("resize", checkScreenSize);

  maskContainer.addEventListener('mouseenter', () => {
    maskImage.style.setProperty('--scale', '1');
  });

  maskContainer.addEventListener('mouseleave', () => {
    maskImage.style.setProperty('--scale', '0.1');
  });

  maskContainer.addEventListener('mousemove', (e) => {
    const rect = maskContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    maskImage.style.setProperty('--x', `${x}px`);
    maskImage.style.setProperty('--y', `${y}px`);
  });
}

init();