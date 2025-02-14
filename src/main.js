import './reset.css'
import './style.css'


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


const checkScreenSize = () => {
  const wasWide = isWide;
  const currentWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
  width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  isWide = currentWidth > 960;

  if (wasWide !== isWide) {
    if (isWide) {
      addSpecialCells(110, 14, 89, 92);
      setProofHTML(true)
      setBibleHTML(false)
    } else {
      addSpecialCells(36, 6, 27, 33);
      setProofHTML(false)
      setBibleHTML(true)
    }
  }



  const proofComments = document.querySelectorAll(".proof__mistake")
  proofComments.forEach((comment) => {
    comment.addEventListener(
      "click",
      (event) => {
        const target = comment.dataset.target;
        revealComment(target, event);
      },
      { once: true }
    );
  });
}

const moveToCursor = (element, intensity = 100) => {
  document.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX - elementCenterX;
    const mouseY = e.clientY - elementCenterY;

    element.style.transform = `translate(${-mouseX / intensity}px, ${-mouseY / intensity}px)`;
  });
}



const addSpecialCells = (cellCount, s1, s2, s3) => {
  const specialCells = document.querySelectorAll('.cell--special');
  specialCells.forEach(cell => cell.classList.remove('cell--special'));
  createElements(cellCount)
  let special1 = document.querySelector(`.cell--${s1}`)
  let special2 = document.querySelector(`.cell--${s2}`)
  let special3 = document.querySelector(`.cell--${s3}`)
  special1.classList.add("cell--special--1")
  special2.classList.add("cell--special--2")
  special3.classList.add("cell--special--3")
  special1.classList.add("cell--special")
  special2.classList.add("cell--special")
  special3.classList.add("cell--special")
}


let leftPercent
let topPercent

draggableDiv.addEventListener('mousedown', startDragging);
draggableDiv.addEventListener('touchstart', startDragging);

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);


//I tried converting these to arrow functions but they stop working then
function startDragging(e) {
  if (e.target === draggableDiv) {
    e.preventDefault();
  }

  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);

  if (clientX !== undefined && clientY !== undefined) {
    isDragging = true;

    const rect = draggableDiv.getBoundingClientRect();
    offsetX = (clientX - rect.left);
    offsetY = (clientY - rect.top);

    draggableDiv.style.cursor = 'grabbing';
  }
}

function stopDragging() {
  if (isDragging) {
    isDragging = false;
    draggableDiv.style.cursor = 'grab';
    checkPlantinPos(leftPercent, topPercent);
  }
}

function drag(e) {
  if (!isDragging) return;
  if (e.target === draggableDiv) {
    e.preventDefault();
  }

  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);

  if (clientX !== undefined && clientY !== undefined) {
    const rect = container.getBoundingClientRect();

    let left = clientX - rect.left - offsetX;
    let top = clientY - rect.top - offsetY;

    const centerLeft = left + draggableDiv.offsetWidth / 2;
    const centerTop = top + draggableDiv.offsetHeight / 2;

    left = Math.max(0, Math.min(left, rect.width - draggableDiv.offsetWidth));
    top = Math.max(0, Math.min(top, rect.height - draggableDiv.offsetHeight));

    draggableDiv.style.left = `${left}px`;
    draggableDiv.style.top = `${top}px`;

    leftPercent = (centerLeft / rect.width) * 100;
    topPercent = (centerTop / rect.height) * 100;
  }
}


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
      if (hasBeenToLaiden == true) {
        console.log("plantin in Antwerp")
        mapUnlock2.style.opacity = "1";
        mapUnlock2.style.transform = "translateY(0)";
        draggableDiv.style.setProperty('--before-display', 'none');
      }
    }
  }

}

const toolInfo = {
  ink: "Correct! Ink brings the words to life. It was made from linseed oil and soot, creating a rich, durable black.",
  paper: "Exactly! Paper is essential for printing all the text. In Plantin's time, sheets were often handmade and featured distinct watermarks.",
  icecream: "No, the printing office was no place for icecream. The workplace must remain clean as to avoid staining the paper",
  scissors: "No, scissors werent an essential tool for the book printing process",
  headphones: "Incorrect! Headphones weren't invented until 20th century. And hearing your colleague is essential to not making any errors in your work!",
  press: "That's right! The printing press is the heart of the operation, pressing ink onto paper with precision. Its design revolutionized bookmaking in the 16th century.",
  measuring: "Right! The composing stick holds the letters as they're arranged into lines. It's a crucial tool for typesetting.",
  type: "That's it! Movable type allows printers to arrange and rearrange letters. Each piece was cast from a durable metal alloy.",
  brayer: "Well done! A brayer spreads the ink evenly over the type. Consistent inking ensures a clear and sharp print.",
};

const storyInfo = [
  "The story of Christophe Plantin begins like the assembly of a workshop: piece by piece, each part carefully chosen and fitted to serve a greater purpose. Born in 1520 in Saint-Avertin, France, Plantin's early life provided the raw materials for his future success. He trained as a bookbinder and leatherworker, learning the precision and patience that would later define his printing career",
  "The first piece of Plantin's “workplace” fell into place when he moved to Paris in the 1540s. Paris was a city buzzing with the intellectual energy of the Renaissance. A hive of scholars, artisans, and merchants. It was here that Plantin first encountered the printing press, a revolutionary machine reshaping the distribution of knowledge.",
  "In 1549, Plantin made another critical move, relocating to Antwerp. The city was like a bustling workshop itself, a major port where ideas, goods, and people converged. Antwerp was also home to an emerging network of printers and booksellers, making it the ideal place for Plantin to lay the foundations of his own career.",
  "The cornerstone of Plantin's printing enterprise was laid in 1555 when he established his first workshop, Officina Plantiniana. Starting with just a single press, Plantin's early output was modest: almanacs, religious texts, and small pamphlets. Already, his meticulous craftsmanship was evident. Every book was like a finished piece from the workshop, polished and precise, earning him a growing reputation for quality.",
  "Setting up a printing press required more than tools and talent—it demanded resources and connections. Plantin found his early patrons in Antwerp's mercantile elite, including Gilbert van Schoonbeke, who provided the financial backing necessary to acquire essential materials: presses, movable type, and fine paper.",
  "By the late 1550s, the framework of Plantin's workshop was complete. His business began to attract larger commissions, and his books found an audience beyond Antwerp",
  "As Plantin's reputation grew, so did his ambition. He began seeking not only to produce books but to create works of enduring significance—texts that would showcase his workshop's unparalleled quality. This drive led him to cultivate relationships with scholars and translators, ensuring his publications were not just beautifully crafted but also brimming with knowledge."
];

const clickedButtons = new Set();
let infoProgress = 0

const toolHeading = document.querySelector(".setting__text--heading")
const toolText = document.querySelector(".text--tool")
const storyText = document.querySelector(".text--story")
const toolAmount = document.querySelector(".tool__amount")
const toolContainer = document.querySelector(".setting__control")

const handleToolClick = (dataId, useful) => {

  toolContainer.style.backgroundPosition = "800% 50%";


  setTimeout(() => {
    if (useful === "true") {

      toolContainer.style.backgroundImage = `url('/integration3/assets/tools/${dataId}.png')`;
      toolContainer.style.backgroundPosition = "250% 50%";
    } else {
      toolContainer.style.backgroundImage = `url('/integration3/assets/tools/blank.png')`;
    }

  }, 500);

  toolHeading.textContent = dataId
  if (dataId === "measuring") {
    toolHeading.textContent = "Composing stick"
  }


  if (clickedButtons.has(dataId)) {
    console.log(`Button with id ${dataId} has already been clicked.`);
    return;
  }

  toolText.classList.add('hidden');
  storyText.classList.add('hidden');

  clickedButtons.add(dataId);

  setTimeout(() => {
    toolText.textContent = toolInfo[dataId];
    if (useful === "true") {
      infoProgress++;
    }
    storyText.textContent = storyInfo[infoProgress];

    if (useful === "false") {
      storyText.textContent = "Try again"
    }
    toolText.classList.remove('hidden');
    storyText.classList.remove('hidden');
  }, 500);


  // toolAmount.textContent = 6 - infoProgress
}






const setProofHTML = (width) => {
  const container = document.querySelector(".proof__body")

  if (width === false) {
    console.log("itssswide")
    container.innerHTML = `
            <p class="proof__comment proof__comment--1">Plantin's workshop employed highly skilled proofreaders known as 'correctors,' who were tasked with
              maintaining the
              highest quality. One of his most famous correctors was Cornelis Kiliaan, who later compiled one of the
              first Dutch
              dictionaries.</p>
          <p class="proof__text">
            Proofreading in Christophe Plantin's workshop was a task of vigilance. Every page had to be scrutinized for
            errors
            before <span data-target="proof__comment--1" class="proof__mistake">itleft</span> the press. A misplaced letter, a missing mark, or a smudged line could compromise the integrity
            of the
            text. For Plantin, however, the act of proofreading extended beyond the printed page. In an era marked by
            religious
            upheaval and censorship, his entire career <span data-target="proof__comment--2"
              class="proof__mistake">reqiured</span> careful revision and adjustment to avoid the “errors”
            that could
            <span data-target="proof__comment--3" class="proof__mistake proof__mistake--smudge">endenger</span> his work or even life.
          </p>
            <p class="proof__comment proof__comment--2">All printed works had to comply with the Index Librorum Prohibitorum, a list of banned books maintained
              by the Catholic
              Church. Failure to adhere to these restrictions could result in severe penalties.</p>
            <p class="proof__comment proof__comment--3">Smudging could occur if the ink wasn't applied evenly or if the paper moved during printing. Plantin
              addressed these
              issues by investing in high-quality presses and training his workers to handle the equipment with
              precision.</p>
          `
  } if (width === true) {
    console.log("narrow")
    container.innerHTML = `<p class="proof__text">
            Proofreading in Christophe Plantin's workshop was a task of vigilance. Every page had to be scrutinized for
            errors
            before<span data-target="proof__comment--1" class="proof__mistake">itleft</span> the press. A
            misplaced letter, a missing mark, or a smudged line could compromise the integrity
            of the
            text. For Plantin, however, the act of proofreading extended beyond the printed page. In an era marked by
            religious
            upheaval and censorship, his entire career <span data-target="proof__comment--2"
              class="proof__mistake">reqiured</span> careful revision and
            adjustment to avoid the “errors”
            that could
            <span data-target="proof__comment--3" class="proof__mistake proof__mistake--smudge">endenger</span> his work or even life.
          </p>
          <div class="proof__comments">
            <p class="proof__comment proof__comment--1">Plantin's workshop employed highly skilled proofreaders known as
              'correctors,' who were tasked with
              maintaining the
              highest quality. One of his most famous correctors was Cornelis Kiliaan, who later compiled one of the
              first Dutch
              dictionaries.</p>
            <p class="proof__comment proof__comment--2">All printed works had to comply with the Index Librorum
              Prohibitorum, a list of banned books maintained
              by the Catholic
              Church. Failure to adhere to these restrictions could result in severe penalties.</p>
            <p class="proof__comment proof__comment--3">Smudging could occur if the ink wasn't applied evenly or if the
              paper moved during printing. Plantin
              addressed these
              issues by investing in high-quality presses and training his workers to handle the equipment with
              precision.</p></div>`
  }

}

let proofComments = document.querySelectorAll(".proof__mistake")
let mistakesFound = 0
let mistakeCounter = document.querySelector(".mistake__counter")

const revealComment = (target, event) => {
  const targetMistake = event.target
  targetMistake.classList.add("proof__mistake__found")

  const targetComment = document.querySelector(`.${target}`)
  targetComment.style.opacity = "1";
  targetComment.style.transform = "translateY(0)";
  const commentHeight = targetComment.getBoundingClientRect().height
  if (width < 960) {
    moveVisibleComments(commentHeight)
  }
  targetComment.classList.add("proof__comment--visible")
  mistakesFound++

  mistakeCounter.textContent = 3 - mistakesFound

  if (mistakesFound === 3) {
    const proofInfo = document.querySelector(".proof__info")
    proofInfo.innerHTML = `<span class="info--highlight">Well done!</span> All errors have been found`
  }
}

let moveCommentDistance = 0

const moveVisibleComments = (distance) => {
  const visibleComments = document.querySelectorAll(".proof__comment--visible");

  visibleComments.forEach((comment) => {
    const currentTransform = getComputedStyle(comment).transform;
    let currentY = 0;

    if (currentTransform !== "none") {
      const matrix = currentTransform.match(/matrix.*\((.+)\)/);
      if (matrix) {
        currentY = parseFloat(matrix[1].split(", ")[5]);
      }
    }

    const newY = currentY + distance + 12;
    comment.style.transform = `translateY(${newY}px)`;
  });

  moveCommentDistance += distance + 12;
};



const setBibleHTML = (arg) => {
  const animationContainer = document.querySelector(".bible__animation--container")
  if (arg === false) {


    animationContainer.innerHTML = `
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
            <img class="book__anim" src="assets/book.gif" alt="book animation">
  `
  }

  if (arg === true) {
    animationContainer.innerHTML = ``
  }
}




const bibleInfo = [
  "Commissioned by <em>King Philip II of Spain</em>, the <em>Polyglot Bible</em> was a multilingual masterpiece. It featured the text of the Bible in <em>Hebrew, Greek, Latin, Syriac</em>, and <em>Aramaic</em>, spread across eight massive volumes. This work wasn't merely a display of linguistic scholarship; it was also a <em>political and religious statement</em>, reinforcing Catholic authority in an era of Protestant Reformation.",
  "Printing the <em>Polyglot Bible</em> was akin to building a cathedral, one stone—or in this case, one page—at a time. <em>Each page had to be perfect, free of smudges, alignment errors, or inconsistencies</em>. Plantin's presses hummed with activity as they worked to produce a work that was as much a technical marvel as it was a scholarly one.",
  "While the <em>Polyglot Bible</em> was Plantin's crowning achievement, his workshop produced a wide range of works that spread knowledge across Europe. These included <em>Religious Texts, Scientific Works, Humanist Literature</em>",
];

let bibleProgress = 0

const handleBibleParagraph = (arg) => {

  if (bibleProgress === 0 && arg === -1) {
    return
  }

  if (bibleProgress === 2 && arg === 1) {
    return
  }

  const progressDots = document.querySelectorAll('.progress__dot');
  progressDots.forEach((dot) => {
    dot.classList.remove("progress__dot--current")
  })
  const bibleParagraph = document.querySelector(".bible__description--body")
  bibleProgress = Math.min(Math.max(bibleProgress + arg, 0), bibleInfo.length - 1);


  bibleParagraph.style.opacity = "0";
  if (arg === 1) {
    bibleParagraph.style.transform = "translateX(-20%)";
  } else {
    bibleParagraph.style.transform = "translateX(+20%)";
  }

  setTimeout(() => {
    if (arg === 1) {
      bibleParagraph.style.transform = "translateX(+20%)";
    } else {
      bibleParagraph.style.transform = "translateX(-20%)";
    }
  }, 250);


  setTimeout(() => {
    bibleParagraph.innerHTML = bibleInfo[bibleProgress]
    bibleParagraph.style.opacity = "1";
    bibleParagraph.style.transform = "translateX(0)";
  }, 500);
  progressDots[bibleProgress].classList.add("progress__dot--current")

  if (bibleProgress > 1) {
    buttonBibleNext.innerHTML = `<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0L21 13L0 26L9.41177 13L0 0Z" fill="#BDBDBD"/>
</svg>`
  } else {
    buttonBibleNext.innerHTML = `<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0L21 13L0 26L9.41177 13L0 0Z" fill="#B20C3B"/>
</svg>`
  }

  if (bibleProgress < 1) {
    buttonBiblePrev.innerHTML = `<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 0L0 13L21 26L11.5882 13L21 0Z" fill="#BDBDBD"/>
</svg>`
  } else {
    buttonBiblePrev.innerHTML = `<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 0L0 13L21 26L11.5882 13L21 0Z" fill="#B20C3B"/>
</svg>`
  }
}



const buttonBibleNext = document.querySelector(".bible__progress--next")
const buttonBiblePrev = document.querySelector(".bible__progress--prev")



const slideTypecase = () => {
  const typecase = document.querySelector(".typecase")
  typecase.style.transform = "translateY(0)";
  typecase.style.opacity = "1";
  console.log("AAAA")
}

const slideBooks = () => {
  const books = document.querySelectorAll(".bible__stack")
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      books[i].style.transform = "translateX(0)";
      books[i].style.opacity = "1";
    }, i * 50);
  }
}

const slideType = () => {
  const typeMain = document.querySelector(".type__main")
  const type = document.querySelectorAll(".type__extraview")
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      type[i].style.transform = "translateX(0)";
      type[i].style.opacity = "1";
    }, i * 50);
  }
  typeMain.style.transform = "translateX(0)";
  typeMain.style.opacity = "1";
}



const bibleSection = document.querySelector('.bible__section');
const typecaseSection = document.querySelector('.typecase__section');
const typesettingSection = document.querySelector('.typesetting');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("typecase__section")) {
          slideTypecase();
        } else if (entry.target.classList.contains("bible__section")) {
          slideBooks()
        } else if (entry.target.classList.contains("typesetting")) {
          slideType()
          console.log("typesetting found")
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

observer.observe(typecaseSection);
observer.observe(bibleSection);
observer.observe(typesettingSection);



const updateMaskPosition = (e) => {
  const touch = e.touches[0];
  const rect = maskContainer.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  maskImage.style.setProperty('--x', `${x}px`);
  maskImage.style.setProperty('--y', `${y}px`);
};










const init = () => {

  const plantin = document.querySelector('.plantin');
  moveToCursor(plantin);

  const tools = document.querySelectorAll('.tool');

  tools.forEach(tool => {
    tool.addEventListener('click', () => {
      const id = tool.dataset.id;
      const useful = tool.dataset.useful;
      handleToolClick(id, useful);
    });
  });


  if (width < 960) {
    addSpecialCells(36, 6, 27, 33);
    setProofHTML(true)
    setBibleHTML(true)
  } else {
    addSpecialCells(110, 14, 89, 92);
    setProofHTML(false)
    setBibleHTML(false)
  }


  proofComments = document.querySelectorAll(".proof__mistake")

  proofComments.forEach((comment) => {
    comment.addEventListener(
      "click",
      (event) => {
        const target = comment.dataset.target;
        revealComment(target, event);
      },
      { once: true }
    );
  });



  buttonBibleNext.addEventListener('click', () => {
    handleBibleParagraph(1);
  });

  buttonBiblePrev.addEventListener('click', () => {
    handleBibleParagraph(-1);
  });



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

  maskContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    maskImage.style.setProperty('--scale', '1');
    updateMaskPosition(e);
  });

  maskContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    updateMaskPosition(e);
  });

  maskContainer.addEventListener('touchend', () => {
    maskImage.style.setProperty('--scale', '0.1');
  });




  document.querySelectorAll('.cell--special').forEach((el) => {
    el.addEventListener('touchstart', () => {
      el.classList.toggle('cell--special--open');
    });

    document.addEventListener('click', (e) => {
      if (!el.contains(e.target)) {
        el.classList.remove('cell--special--open');
      }
    });
  });
}

init();