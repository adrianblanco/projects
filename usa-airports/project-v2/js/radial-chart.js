(function() {

//Changes the Font for the Numbers Around Circle

const width = 960,
  height = 500,
  chartRadius = height / 2 - 40;

const color = d3.scaleOrdinal(d3.schemeCategory10);

let svg = d3.select('#radial').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

let tooltip = d3.select('#radial').append('div')
  .attr('class', 'tooltip');

const PI = Math.PI,
  arcMinRadius = 50,
  arcPadding = 10,
  labelPadding = -10,
  numTicks = 7;

//var container = d3.select('#radial')

    Promise.all([
        d3.csv('daily_delays.csv'),
        d3.csv('TotalDay.csv')
      ])
      .then(ready)
      .catch(err => {
        console.log('Failed with', err)
      });

function ready([caldatapoints, chartdatapoints]) {
// d3.csv('TotalDay.csv', (error, data) => {

let scale = d3.scaleLinear()
  .domain([0, d3.max(chartdatapoints, d => d.Highest_Average_Day) * 1.1])
  .range([0, 2 * PI]);

let ticks = scale.ticks(numTicks).slice(0, 10);
let keys = chartdatapoints.map((d, i) => d.Year);
//number of arcs
const numArcs = keys.length;
const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

let arcs = svg.append('g')
  .attr('class', 'data')
  .selectAll('path')
  .data(chartdatapoints)
  .enter()
  .append('path')
  .attr('class', 'arc')
  .style('fill', "grey");


let arc = d3.arc()
  .innerRadius((d, i) => getInnerRadius(i))
  .outerRadius((d, i) => getOuterRadius(i))
  .startAngle(0)
  .endAngle((d, i) => scale(d))

let radialAxis = svg.append('g')
  .attr('class', 'r axis')
  .selectAll('g')
  .data(chartdatapoints)
  .enter().append('g');

radialAxis.append('circle')
  .attr('r', (d, i) => getOuterRadius(i) + arcPadding)
  .style('fill', 'grey')
  .style('opacity', .3)
  .on("start", function() {
    d3.select(this)
      .style('fill', 'red');
  })
  .transition()
  .duration(1000)
  .style('fill', 'red')
  .transition()
  .duration(1000)
  .style('fill', 'yellow')
  .transition()
  .duration(1000)
  .style('fill', 'red')


radialAxis.append('text')
  .attr('class', 'letters')
  .attr('x', labelPadding + 8)
  .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
  .text(d => d.Year)
  .style('fill', "white")
  .style("stroke", "white")
  .style('font-family', 'Arial')
  .attr('alignment-baseline', 'middle');

d3.selectAll('.letters')
  .transition()
  .duration(2000)
  .on("start", function() {
    d3.select(this)
      .text(d => d.Year);
  })
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .transition()
  .duration(1000)
  .text(d => d.Highest_Average_Day)
  .transition()
  .duration(1000)
  .text(d => d.Year)
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .transition()
  .duration(1000)
  .text(d => d.Highest_Average_Day)
  .transition()
  .duration(1000)
  .text(d => d.Year)
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .transition()
  .duration(1000)
  .text(d => d.Highest_Average_Day)
  .transition()
  .duration(1000)
  .text(d => d.Year)
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .text(d => d.Day)
  .transition()
  .duration(1000)
  .transition()
  .duration(1000)
  .text(d => d.Highest_Average_Day)
  .transition()
  .duration(1000)
  .text(d => d.Year)
  .transition()
  .duration(1000)
  .text(d => d.Day)



//data arcs

arcs.transition()
  .delay((d, i) => i * 600)
  .duration(2000)
  .attrTween('d', arcTween)
  .on("end", function() {
    d3.select(this)
      .style('opacity', "1");
  })


arcs.on('mousemove', showTooltip)
arcs.on('mouseout', hideTooltip)




radialAxis.append('text')
  .attr('x', (d, i) => -getOuterRadius(i))
  .attr('y', (d, i) => scale(i));



function arcTween(d, i) {
  let interpolate = d3.interpolate(0, d.Highest_Average_Day);
  return t => arc(interpolate(t), i);
}

function showTooltip(d) {
  tooltip.style('left', (d3.event.pageX + 10) + 'px')
    .style('top', (d3.event.pageY - 25) + 'px')
    .style('display', 'inline-block')
    .html(d.Day)
}

function hideTooltip() {
  tooltip.style('display', 'none');
}

function rad2deg(angle) {
  return angle * 180 / PI;
}

function getInnerRadius(index) {
  return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
}

function getOuterRadius(index) {
  return getInnerRadius(index) + arcWidth;
}

}

})()