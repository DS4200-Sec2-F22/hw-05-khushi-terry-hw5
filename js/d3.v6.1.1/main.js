//global variables for storing x and y inputs
var x;
var y;
// set dimensions for frame and margins
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 100, right: 100, top: 100, bottom: 100};

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
    // console.log(data);
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
        "," + (MARGINS.bottom) +")") 
    .call(d3.axisLeft(Y_SCALE).ticks(4))
            .attr('font-size', '20px');


    // Add event listeners
    FRAME1.selectAll(".point")
    .on("click", changeCircle); //add event listeners    


    // function to change the state of the circle (outline/no outline).
    function changeCircle() {   
        console.log(d3.select(this).attr('stroke'));
        if(d3.select(this).attr('stroke') === 'greenyellow') {
            d3.select(this)
            .attr("stroke", "none")
        } else{
            d3.select(this)
            .attr('stroke', 'greenyellow')
            .attr("stroke-width", "5px");
        }
    }

    function addPoint() {

        // determine selected x coordinate
        let x_list = document.getElementById('x-point');
        x = x_list.options[x_list.selectedIndex].text;
        console.log(x);

        // determine selected y coordinate
        let y_list = document.getElementById('y-point');
        y = y_list.options[y_list.selectedIndex].text;
        console.log(y)
        data.push({'x':x, 'y':y});

        FRAME1.selectAll('.point')
            .remove()
        FRAME1.selectAll('points')
            .data(data) // passed from .then  
            .enter()      
            .append("circle")  
                .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left);}) 
                .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.top);}) 
                .attr("r", 20)
                .attr("class", "point")
                    .on('click', changeCircle)
         }




    document.getElementById('submit').addEventListener('click',addPoint);

  });



 




