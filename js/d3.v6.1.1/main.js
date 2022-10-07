
// set dimensions for frame and margins
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 75, right: 75, top: 75, bottom: 75};

// dimensions for scaling
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.left - MARGINS.right;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.top - MARGINS.bottom; 

// define a frame that will hold the scatterplot
const FRAME1 = d3.select("#scatter") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// Open scatter-data and pass data into function
d3.csv("data/scatter-data.csv").then((data) => { 
  
    // find max X
    const MAX_X = d3.max(data, (d) => { return parseInt(d.x); });

    // find max Y
    const MAX_Y = d3.max(data, (d) => { return parseInt(d.y); });

    // Define scale functions that maps our data values 
    // (domain) to pixel values (range)
    const X_SCALE = d3.scaleLinear() 
            .domain([0, (MAX_X)]) // add some padding  
            .range([0, VIS_WIDTH]); 

    // Define scale functions that maps our data values 
    // (domain) to pixel values (range)
    const Y_SCALE = d3.scaleLinear() 
            .domain([0, (MAX_Y)]) // add some padding  
            .range([VIS_HEIGHT,0]); 

    // Use X_SCALE to plot our points
    var circles = FRAME1.selectAll("points")  
            .data(data) // passed from .then  
            .enter()       
            .append("circle")  
                .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left);}) 
                .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.top);}) 
                .attr("r", 20)
                .attr("class", "point");

    // Add an x-axis to the vis  
    FRAME1.append("g") 
    .attr("transform", "translate(" + MARGINS.left + 
        "," + (VIS_HEIGHT + MARGINS.top) + ")") 
    .call(d3.axisBottom(X_SCALE).ticks(4)) 
    .attr("font-size", '20px'); 

    // Add an y-axis to the vis  
    FRAME1.append('g')  // g is a general SVG
    .attr('transform', "translate(" + MARGINS.left +
        "," + (MARGINS.bottom) +")") // transform can transalte things by whatever you tell it, we want over a bit on x and down by top margin and visheight
    .call(d3.axisLeft(Y_SCALE).ticks(4))
            .attr('font-size', '20px');

    // click event handler to change outline of circle when clicked
    var totalClicks = 0;
    circles.on('click', function(d) {
        if (totalClicks == 0 || totalClicks%2==0) {
            console.log(d)
            d3.select(this)
              .attr("stroke", "greenyellow")
              .attr("stroke-width", "5px");
            totalClicks+=1;
        } else {
            d3.select(this)
            .attr("stroke", "none");
            totalClicks+=1;
        }

    })

  });