var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("class","chart")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("/assets/data/data.csv")
  .then(function(data) {
    console.log(data)

    // parse data to int
    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = Number(data.healthcare);
        // console.log(data.poverty);
        // console.log(data.healthcare);
        console.log(data.abbr)
      });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty)+10)
    .attr("cy", d => yLinearScale(d.healthcare)-5)
    .attr("r", "25")
    .attr("fill", "pink")
    .attr("stroke", "black")
    .attr("opacity", ".5")

    var text = chartGroup.selectAll(".chart")
    .data(data)
    .enter()
    .append("text")
    .attr("x",d => xLinearScale(d.poverty))
    .attr("y",d => yLinearScale(d.healthcare))
    .text(d => d.abbr);

        // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var HealthcareLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 25)
    .attr("value", "hair_length") // value to grab for event listener
    .classed("active", true)
    .text("Healthcare");

    var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "num_albums") // value to grab for event listener
    .classed("inactive", true)
    .text("In Poverty (%)");

    // append y axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)");
  });

  
