const rect1 = document.querySelector("#rect1");

rect1.addEventListener("click", function () {
  if (rect1.style.fill == "red") {
    rect1.style.fill = "green";
  } else {
    rect1.style.fill = "red";
  }
});

const hover = document.querySelector("#hoverCircle")

hover.addEventListener("mouseover", function () {
  hover.setAttribute("r", "80px");
})

hover.addEventListener("mouseout", function() {
  hover.setAttribute("r", "60px");
})