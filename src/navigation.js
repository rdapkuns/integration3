// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }

const items = document.querySelectorAll(".item")
items.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (sidebarBox.classList.contains("active")) {
      sidebarBtn.classList.remove("active");
      sidebarBox.classList.remove("active");
    }
  })
})


const sidebarBox = document.querySelector("#box"),
  sidebarBtn = document.querySelector("#btn"),
  pageWrapper = document.querySelector("#page-wrapper");

sidebarBtn.addEventListener("click", (event) => {
  sidebarBtn.classList.toggle("active");
  sidebarBox.classList.toggle("active");
});

pageWrapper.addEventListener("click", (event) => {
  if (sidebarBox.classList.contains("active")) {
    sidebarBtn.classList.remove("active");
    sidebarBox.classList.remove("active");
  }
});

window.addEventListener("keydown", (event) => {
  if (sidebarBox.classList.contains("active") && event.keyCode === 27) {
    sidebarBtn.classList.remove("active");
    sidebarBox.classList.remove("active");
  }
});


const init = () => {
}

init();