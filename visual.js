
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 200},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
//Read the data
function createYAxis(yMin, yMax, translateX = 0,height,className){
    let y = d3.scaleLinear()
      .domain( [yMin, yMax])
      .range([ height, 0 ]);
       svg.append("g")
       .attr("transform", `translate(${translateX},0)`)
       .attr("class", className)
      .call(d3.axisLeft(y));
      return y;
      
}
function createXAxis(xMin, xMax, width,className){
  let x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { 
        
        return d.date; }))

      .range([ 0, width ])
      
}
function createTrend(dataPath, color, y, commonX=false){
  d3.csv(dataPath,
  // When reading the csv, I must format variables:
  function(d){
    return ({ date : d3.timeParse("%d.%m.%Y_%H:%M:%S:%L")(d.date), value : +d.value });
  },
  // Now I can use this dataset:
  function(data) {
    // Add X axis --> it is a date format
    
    var x = d3.scaleTime()


      .domain(d3.extent(data, function(d) { 
        
        return d.date; }))
      
      .range([ 0, width ]);
      

      
      
     
if(!commonX){
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5,"%H:%M:%S .%L"));
}


    // Add Y axis

      
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
    // Add the points
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 2)
        .attr("fill", color)
})
}
createTrend("data.csv", "#69b3a2",createYAxis(0.3, 0.4, 0, height,"red"));
createTrend("data2.csv", "rgb(23,234,156)", createYAxis(0, 250, -50, height,"green"),true);