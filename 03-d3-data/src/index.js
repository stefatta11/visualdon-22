import { json } from 'd3-fetch'
import * as d3 from 'd3';

d3.select("body").append("div").attr("class", "container");
d3.select(".container").append("strong").text("Nombre de posts par utilisateur : ");
let desposts;
let longestPost = 0;
let uselessVariable;
let postWithLongestId;
let tab=[];
let i =0;
Promise.all([
    json('https://jsonplaceholder.typicode.com/users'),
    json('https://jsonplaceholder.typicode.com/posts')
])

    .then(([users, posts]) => {


        users.forEach(u => {
            desposts = posts.filter(post => post.userId === u.id)

            d3.select(".container").append("p").text(u.username + " a fait " + desposts.length + " posts")
        });

        posts.forEach(count => {

            if (count.body.length > longestPost) {
                longestPost = count.body.length
                postWithLongestId = count.userId;

            }
        })

        console.log(postWithLongestId);
        console.log(longestPost);

        d3.select("body")
        .append("div")
        .attr("class", "container2");

        d3.select(".container2")
        .append("strong")
        .text("le post le plus long c'est : "); 

        d3.select(".container2")
        .append("p")
        .text(users[postWithLongestId].username+", avec un post de "+longestPost+" caractères");

    const WIDTH = 500
    const HEIGHT = 500

    d3.select("body").append("div").attr("class","mon-svg");
    d3.select(".mon-svg").append("svg");
    const myDiv2 = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
  
    /* It's a loop that find the user with the longest post. */
    users.forEach(usr => {
      let post_filtered = posts.filter(post=>post.userId === usr.id)
      tab[i]= post_filtered.length;
      i++;
    })

/* It's a loop that create a rectangle with the number of post of each user. */
    const widthRect = 30;
    myDiv2.selectAll("rect")
      .data(tab)
      .enter()
      .append("rect")
      .attr('x', (d,i) => (i*40+50))
      .attr('y', d => 300-d*10)
      .attr('width', widthRect)
      .attr('height', d => d*10)
      .attr('stroke', 'none')
      .attr('fill', 'royalblue');

/* It's a loop that create a text with the number of post of each user. */
      var texts = myDiv2.selectAll("text")
	      .data(tab)
	      .enter()
	      .append("text");

      texts
      .attr('x', (d,i) => (i*40+55))
      .attr('y', d => 300+20)
	    .text(function(d){ return d});

    });