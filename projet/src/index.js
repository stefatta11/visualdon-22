import * as d3 from "d3";
import data from "../data/world.geojson";
import capitals from "../data/capital.csv";
import fifaPlayer from "../data/FIFA-21_Complete.csv"

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    


const projection = d3.geoMercator()
    .scale(225)
    .translate([width / 2, height / 1.6]);
const path = d3.geoPath(projection);

//console.log(data);

function drawMap(data, capitals) {
    
    //Dessine la carte
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "#3655b3")
        .attr("d", path)
        .attr("id", "map")
        .style("stroke", "#d3deff")
    

    drawPointCountry(capitals);//envoyer les données capitals

}

drawMap(data, capitals);





let zoom = d3.zoom()
    .on("zoom", handleZoom)
    .scaleExtent([1, 5])
    .translateExtent([[0, 0], [width, height]]);

function handleZoom(e) {
    d3.select("svg g")
        .attr("transform", e.transform);
}

d3.select("svg")
    .call(zoom);



function drawPointCountry(capitals) {

    
    d3.select("svg g")
        .selectAll("circles")
        .data(capitals)
        .enter()
        .append("circle")
        

        .attr("cx", function (d) {
            return projection([d.CapitalLongitude, d.CapitalLatitude])[0];
        })
        .attr("cy", function (d) {
            return projection([d.CapitalLongitude, d.CapitalLatitude])[1];
        })
        .attr("id", function (d) {
            return d.CountryName;
        })

        .attr("fill", "red")
        .attr("r", 3)
        .attr("class", "circle")
        .on("mouseover", function (d) {
            //console.log(this)
            d3.select(this)
                .attr("fill", "black")
                .append("title")
                .text(this.id)
                .attr("country", function (d) {
                    //console.log(d.CountryName)
                    return d.CountryName;
                })
                 
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .attr("fill", "red")

        })
        
       
        .on("click", function (d){
            drawRect(this.id)
            boutonRetour(capitals)

            d3.select("#logoFifa")
            .style("display", "none")

            d3.select("#contexteProjet")
            .style("display", "none")
            
            
        })


}

function drawRect(country){
    //console.log("click")
    //console.log(country)//recoit this.id
    effaceCercle()
    

    
    d3.select("#pageLaterale")
    .style("display", "block")
    .append("class", "nomPays")
    .append("h1")
    .text(country)

    d3.select("#tabPlayers")
    .style("display", "block")

    //recupere joueurs par pays
    let desJoueurs;//joueurs par pays
    let nbJoueursPays;//compte le nb de joueur par pays
    let sumOverall;// additionne les overall
    let overallAverage;// moyenne de l'overall
    let sortPosition;//filtre par position
    let sumAge;
    let ageAverage;
    let arrondiAge;
    //let sumPosition;
    // let dixPremiersJoueurs;
    desJoueurs = fifaPlayer.filter(fp => fp.nationality === country)
    //console.log(desJoueurs) 

    //console.log(dixPremiersJoueurs)

    sumOverall = d3.sum(desJoueurs, function(d) {
        return d.overall;
      });
    //console.log(sumOverall)
    
    nbJoueursPays = desJoueurs.length
    //console.log(nbJoueursPays) 
    
    overallAverage = Math.round(sumOverall / nbJoueursPays) ;
    //console.log(overallAverage)

    sortPosition = d3.sort(desJoueurs, function(d) {
        return d.pos;
      });
    //console.log(sortPosition)
    sumAge = d3.sum(desJoueurs, function(d) {
        return d.age;
      });
    
      //console.log(sumAge)
    
    ageAverage = sumAge / nbJoueursPays;

    arrondiAge = ageAverage.toFixed(1)

    //console.log(arrondiAge)

    d3.select("#pageLaterale")
    .append("class", "nbJoueur")
    .append("h2")
    .text(nbJoueursPays)

    d3.select("#pageLaterale")
    .append("text")
    .text("Joueurs dans le jeu")

    d3.select("#pageLaterale")
    .append("class", "overallMoyen")
    .append("h2")
    .text(overallAverage)

    d3.select("#pageLaterale")
    .append("text")
    .text("Overall Moyen")
    //.style("padding-left", "10px")

    d3.select("#pageLaterale")
    .append("class", "ageMoyen")
    .append("h2")
    .text(arrondiAge)

    d3.select("#pageLaterale")
    .append("text")
    .text("Moyenne d'age")
    //.style("padding-left", "10px")

    const NB_MIN = Math.min(10, desJoueurs.length )

    for (let i = 0; i < NB_MIN; i++) {
         let dixPremiersJoueurs = desJoueurs[i];
         d3.select("#tabPlayers tbody")
        .append("tr")

        d3.select("#tabPlayers tbody")
        .append("td")
        .append("text")
        .append("class", "nomPlayers")
        .text(dixPremiersJoueurs.name)
        .append("br")

        d3.select("#tabPlayers tbody")
        .append("td")
        .append("text")
        .text(dixPremiersJoueurs.overall)
        .append("br")

        d3.select("#tabPlayers tbody")
        .append("td")
        .append("text")
        .text(dixPremiersJoueurs.pos)
        .append("br")

        d3.select("#tabPlayers tbody")
        .append("td")
        .append("text")
        .text(dixPremiersJoueurs.age)
        .append("br")

        d3.select("#tabPlayers tbody")
        .append("tr")
        


         
        //console.log(dixPremiersJoueurs.name, dixPremiersJoueurs.overall, dixPremiersJoueurs.pos)
        

        

    }
    

    
    

}

function boutonRetour(capitals){
//     //d3.select("#map")

// //Fonctionnel
//     // d3.select("svg g") 
//     // .append("rect")
//     // .attr("x", 50)
//     // .attr("y", 50)
//     // .attr("width", 100)
//     // .attr("height", 50)
//     // .attr("class", "retour")
//     // .attr("id", "rect")
//     // .style("fill", "green")
//     // .style("opacity", 1)
//     // .on("click", function(d){
//     //     effaceRect()

//     // })
   
//     console.log("hi")
    
    d3.select("#boutonRetour")
    .style("display", "block")
    .on("click", function(d){
        effaceRect()
        effaceBouton()
        drawPointCountry(capitals)
    })
    

}



function effaceRect(){
    d3.select("#pageLaterale")
    .style("display", "none")
    
    d3.select("#pageLaterale h1")
    .remove("h1")
    
    d3.selectAll("#pageLaterale h2")
    .remove("h2")
    

    d3.selectAll("#pageLaterale text")
    .remove("text")



    d3.select("#tabPlayers")
    .style("display", "none")
    
    d3.selectAll("#tabPlayers td")
    .remove("td")

    d3.selectAll("#tabPlayers tbody tr")
    .remove("tr")


    d3.select("#logoFifa")
            .style("display", "block")
    
    d3.select("#contexteProjet")
            .style("display", "block")


    
    
    
        
}

function effaceBouton(){
    d3.select("#boutonRetour")
    .style("display", "none")
    
        
}


function effaceCercle(){
    svg.selectAll("circle").remove()
    
        
}


