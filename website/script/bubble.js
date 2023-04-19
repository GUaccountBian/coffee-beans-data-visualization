// Replace this with your actual data
var data = [
    {id: "Mexico", total_cup_points: 81.67, x: 0.4, y: 0.482,plot_url:"./pages/plotly_plot0.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png"},
    {id: "Colombia", total_cup_points: 83.33, x: 0.4, y: 0.6,plot_url:"./pages/plotly_plot1.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1920px-Flag_of_Colombia.svg.png"},
    {id: "Guatemala", total_cup_points: 82.41, x: 0.3, y: 0.7,plot_url:"./pages/plotly_plot2.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Flag_of_Guatemala.svg/1920px-Flag_of_Guatemala.svg.png"},
    {id: "Brazil", total_cup_points: 82.50, x: 0.5, y: 0.5,plot_url:"./pages/plotly_plot3.html",background_image_url:"https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png"},
    {id: "China", total_cup_points: 82.08, x: 0.4, y: 0.6,plot_url:"./pages/plotly_plot4.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png"},
    {id: "Hawaii", total_cup_points: 83.17, x: 0.4542, y: 0.7087,plot_url:"./pages/plotly_plot5.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Hawaii.svg/1920px-Flag_of_Hawaii.svg.png"},
    {id: "Honduras", total_cup_points: 81.59, x:  0.5021, y: 0.6729,plot_url:"./pages/plotly_plot6.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Honduras.svg/1920px-Flag_of_Honduras.svg.png"},
    {id: "Costa Rica", total_cup_points: 83.18, x : 0.4321, y : 0.3195,plot_url:"./pages/plotly_plot7.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Costa_Rica.svg/1920px-Flag_of_Costa_Rica.svg.png"},
    {id: "Ethiopia", total_cup_points: 85.46, x : 0.3956, y : 0.6498,plot_url:"./pages/plotly_plot8.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/1920px-Flag_of_Ethiopia.svg.png"},
    {id: "Tanzania", total_cup_points: 82.34, x : 0.3379, y : 0.7423,plot_url:"./pages/plotly_plot9.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/1920px-Flag_of_Tanzania.svg.png"},
    {id: "Uganda", total_cup_points: 83.97, x : 0.3565, y : 0.5287,plot_url:"./pages/plotly_plot10.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/1920px-Flag_of_Uganda.svg.png"},
    {id: "Thailand", total_cup_points: 82.66, x : 0.5776, y : 0.5739,plot_url:"./pages/plotly_plot11.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1920px-Flag_of_Thailand.svg.png"},
    {id: "Nicaragua", total_cup_points: 80.96, x : 0.4348, y : 0.4191,plot_url:"./pages/plotly_plot12.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Nicaragua.svg/1920px-Flag_of_Nicaragua.svg.png"},
    {id: "Kenya", total_cup_points: 84.49, x : 0.3491, y : 0.3865,plot_url:"./pages/plotly_plot13.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/1920px-Flag_of_Kenya.svg.png"},
    {id: "El Salvador", total_cup_points: 83.34, x : 0.5612, y : 0.3812,plot_url:"./pages/plotly_plot14.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/1920px-Flag_of_El_Salvador.svg.png"},
    {id: "Indonesia", total_cup_points: 82.99, x : 0.4596, y : 0.5893,plot_url:"./pages/plotly_plot15.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/1920px-Flag_of_Indonesia.svg.png"},
    {id: "India", total_cup_points: 81.84, x : 0.4798, y : 0.4869,plot_url:"./pages/plotly_plot16.html",background_image_url:"https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1920px-Flag_of_India.svg.png"},
    {id: "Malawi", total_cup_points: 81.83, x : 0.4284, y : 0.4954,plot_url:"./pages/plotly_plot17.html",background_image_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_Malawi.svg/1920px-Flag_of_Malawi.svg.png"}
];

var width = 800;
var height = 600;
var svg = d3.select("#bubble_chart")
    .attr("width", width)
    .attr("height", height);

var xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

var sizeScale = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.total_cup_points))
    .range([10, 60]);

var tooltip = d3.select("#tooltip");

var simulation = d3.forceSimulation(data)
.force("x", d3.forceX(d => xScale(d.x)).strength(0.1))
.force("y", d3.forceY(d => yScale(d.y)).strength(0.1))
.force("collide", d3.forceCollide(d => sizeScale(d.total_cup_points) + 1))
.on("tick", simulationTick);


// Add an SVG pattern for each image
const defs = svg.append("defs");

defs.selectAll(".image-pattern")
    .data(data)
    .join("pattern")
    .attr("id", (d, i) => `image-pattern-${i}`)
    .attr("class", "image-pattern")
    .attr("width", 1)
    .attr("height", 1)
    .attr("patternUnits", "objectBoundingBox")
    .append("image")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", d => sizeScale(d.total_cup_points) * 2)
    .attr("height", d => sizeScale(d.total_cup_points) * 2)
    .attr("href", d => d.background_image_url)
    .attr("preserveAspectRatio", "xMidYMid slice");
    
var bubbles = svg.selectAll(".bubble")
    .data(data)
    .join("circle")
    .attr("class", "bubble")
    .attr("r", d => sizeScale(d.total_cup_points))
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("data-plot", d => d.plot_url)
    .style("fill", (d, i) => `url(#image-pattern-${i})`)
    .call(drag(simulation));
  

      
async function loadPlotlyPlot(containerId, plotUrl) {
    try {
      const response = await fetch(plotUrl);
      const htmlContent = await response.text();
      
      // Create an iframe element
      const iframe = document.createElement("iframe");
      
      // Apply some basic styling to the iframe
      iframe.style.width = "100%";
      iframe.style.height = "600px";
      iframe.style.border = "none";
      
      // Insert the iframe into the container
      const container = document.getElementById(containerId);
      container.innerHTML = "";
      container.appendChild(iframe);
      
      // Write the content of the plotly_plot.html file into the iframe
      iframe.contentDocument.open();
      iframe.contentDocument.write(htmlContent);
      iframe.contentDocument.close();
    } catch (error) {
      console.error("Error loading Plotly plot:", error);
    }
}


bubbles.on("mouseover", (event, d) => {
        tooltip.style("display", "block")
            .html("ID: " + d.id + "<br/>Total Cup Points: " + d.total_cup_points);
    })
    .on("mousemove", (event, d) => {
        tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", (event, d) => {
        tooltip.style("display", "none");
    })
    .on("click", (event, d) => {
      //loadPlotlyPlot("plotly_container",  d.plot_url);
      const plotlyObject = document.getElementById("plotly_object");
      plotlyObject.setAttribute("data", d.plot_url); // Replace "new_plot_path.html" with the desired path to your new HTML file

    });

  function bounceEaseOut(t) {
      const b = 7.5625;
      const c = 2.75;
      if (t < 1 / c) {
          return b * t * t;
      } else if (t < 2 / c) {
          t -= 1.5 / c;
          return b * t * t + 0.75;
      } else if (t < 2.5 / c) {
          t -= 2.25 / c;
          return b * t * t + 0.9375;
      } else {
          t -= 2.625 / c;
          return b * t * t + 0.984375;
      }
  }
  
function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0).alpha(0.5).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0).alpha(0.5);
      d.fx = null;
      d.fy = null;
      d3.select(this)
          .transition()
          .duration(1)
          .ease(bounceEaseOut)
          .attr("cx", xScale(d.x))
          .attr("cy", yScale(d.y));
  }


    return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}   

function simulationTick() {
bubbles
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}


simulation.restart()
