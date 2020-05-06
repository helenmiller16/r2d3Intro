
// data
// height
// width
// svg

if (svg.selectAll("g").empty) {
  svg.append("g").attr("id", "xaxis");
  svg.append("g").attr("id", "yaxis");
  svg.append("g").attr("id", "dots");
}
var h = height,
  w = width,
  m = 50;

var xscale = d3
  .scaleLinear()
  .domain([
    Math.min(...data.map((d) => d.x)),
    Math.max(...data.map((d) => d.x)),
  ])
  .range([m, w - m]);
var yscale = d3
  .scaleLinear()
  .domain([
    Math.min(...data.map((d) => d.y)),
    Math.max(...data.map((d) => d.y)),
  ])
  .range([h - m, m]);

var dots = svg.select("#dots").selectAll("circle").data(data);

dots
  .enter()
  .append("circle")
  .attr("fill", "black")
  .attr("cx", (d) => xscale(d.x))
  .attr("cy", (d) => yscale(d.y))
  .attr("r", 5)
  .on("click", (d) => Shiny.setInputValue("carInput", d.model));

var xaxis = svg
  .select("#xaxis")
  .attr("transform", "translate(" + 0 + "," + (h - m + 10) + ")")
  .transition()
  .duration(1000)
  .call(d3.axisBottom(xscale));
var yaxis = svg
  .select("#yaxis")
  .attr("transform", "translate(" + (m - 10) + "," + 0 + ")")
  .transition()
  .duration(1000)
  .call(d3.axisLeft(yscale));

dots.exit().remove();

dots
  .transition()
  .duration(1000)
  .attr("cx", (d) => xscale(d.x))
  .attr("cy", (d) => yscale(d.y));
