import * as d3 from 'd3';


// C'est ici que vous allez écrire les premières lignes en d3!
var b = d3.select("body")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600)
    
    
var c1 = b.append("circle")
    .attr("cx", 50).attr("cy", 50)
    .attr("r", "40px")
    .style("fill", "blue");

var c2 = b.append("circle")
    .attr("cx", 150).attr("cy", 150)
    .attr("r", "40px")
    .style("fill", "yellow");    

var c3 = b.append("circle")
    .attr("cx", 250).attr("cy", 250)
    .attr("r", "40px")
    .style("fill", "blue");     

    
// changer couleur 2eme cercle
//c2.style("fill", "blue");
d3.select("circle:nth-child(2)").style("fill", "black");

 //déplacer cercle 1 et 2 de 50px vers la droite
// c1.attr("cx", 100)
// c2.attr("cx", 200)

d3.select("circle").attr("transform", "translate(50,0)");

d3.select("circle:nth-child(2)").attr("transform", "translate(50,0)");

//ajoutez texte en dessous de tous les cercles
//  d3.select("circle")
//    .append("text")
//    .text("cercle")
//    .style("font-size", "12px")

// c1.append("text")
// .text("Cercle1")
// .attr("x", 120)
// .attr("y", 100)
// .attr("text-anchor", "middle")
// .style("font-size", ".75em")


b .append("text")
  .text("Cercle1")
  .attr("x", 100)
  .attr("y", 110)
  .attr("text-anchor", "middle");

b .append("text")
  .text("Cercle2")
  .attr("x", 200)
  .attr("y", 210)
  .attr("text-anchor", "middle");

b .append("text")
  .text("Cercle3")
  .attr("x", 250)
  .attr("y", 310)
  .attr("text-anchor", "middle");
    
//Evenement
d3.select("circle:nth-child(3)").on("click", function () {
    d3.selectAll("circle, text")
      .attr("cx", 100)
      .attr("x", 100)
      .attr("transform", "translate(50,0)");
  });

//Données
const rect = [20, 5, 25, 8, 15]

b .selectAll("rect")
  .data(rect)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", (d) => d * 10)
  .attr("y", (d) => 500 - d * 10)
  .attr("x", (i) => i * 20)
  .attr("fill", "blue");