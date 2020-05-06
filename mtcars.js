// !preview r2d3 data=mtcars
//
// r2d3: https://rstudio.github.io/r2d3
//

// data
// height
// width
// svg
// options: color

var h = height,
  w = width,
  m = 50,
  color = (options && options.color) || "black";
var xscale = d3
  .scaleLinear()
  .domain([
    Math.min(...data.map((d) => d.mpg)),
    Math.max(...data.map((d) => d.mpg)),
  ])
  .range([m, w - m]);
var yscale = d3
  .scaleLinear()
  .domain([
    Math.min(...data.map((d) => d.hp)),
    Math.max(...data.map((d) => d.hp)),
  ])
  .range([h - m, m]);
svg
  .append("g")
  .attr("id", "dots")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("fill", color)
  .attr("cx", (d) => xscale(d.mpg))
  .attr("cy", (d) => yscale(d.hp))
  .attr("r", 5);
var xaxis = d3.axisBottom(xscale);
var yaxis = d3.axisLeft(yscale);
svg
  .append("g")
  .attr("id", "xaxis")
  .attr("transform", "translate(" + 0 + "," + (h - m + 10) + ")")
  .call(xaxis);
svg
  .append("g")
  .attr("id", "yaxis")
  .attr("transform", "translate(" + (m - 10) + "," + 0 + ")")
  .call(yaxis);
