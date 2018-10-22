/** Global D3 **/

var margin = {
  top: 0,
  right: 40,
  bottom: 50,
  left: 40
}

var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

// You'll probably need to edit this one
var svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Here are some scales for you
const xPositionScale = d3
  .scaleLinear()
  .domain([0, 5000000])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 15])
  .range([height, 0])

const colorScale = d3
  .scaleOrdinal()
  .range(['#062E69', '#E00D3E', '#FFF3AE', '#D6D6D6'])

d3.csv('data/candidates.csv').then(ready)

function ready(datapoints) {
  console.log('Data is', datapoints)

  //var formatDecimal = d3.format(".1")
  var formatDecimalComma = d3.format(",.2f")
  var formatMoney = function(d) { return "$" + formatDecimalComma(d); }
  var formatSuffixDecimal1 = d3.format(".1s")

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 6)
    .attr('opacity', 0.7)
    .attr('cx', d => {
      return xPositionScale(d.real_state)
    })
    .attr('cy', d => {
      return yPositionScale(d.percent)
    })
    .attr('fill', d => {
      return colorScale(d.Specific_Party)
    })
    .on('mouseover', (d, i, nodes) => {
      d3.select(nodes[i]).attr('fill', 'black')
      d3.select('#name').text(d.Candidate)
      d3.select('#percent').text(function() { return formatDecimalComma(d.percent) + '%'})
      d3.select('#party').text(d.General_Party)
      d3.select('#funds').text(function() { return formatMoney(d.real_state) })
      d3.select('#info').style('display', 'block')
    })
    .on('mouseout', function(d) {
      d3.select(this).attr('fill', colorScale(d.Specific_Party))
      d3.select('#info').style('display', 'none')
    })

  var yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(-width)
    .ticks(5)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .style('font-size', '0.8em')
    .call(yAxis)
    .lower()

  d3.select('.y-axis .domain').remove()

  var xAxis = d3.axisBottom(xPositionScale).ticks(7)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .style('font-size', '0.8em')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

// Axis Labels
 // https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e

  svg
    .append('text')
    .attr('class', 'x-label')
    .attr('transform', 'translate(' + width/2 + ' ,' + (height + margin.top + 35) + ')')
    .style('text-anchor', 'middle')
    .style('font-size', '0.8em')
    .text('Real-estate contributions ($)')

  svg
    .append('text')
    .attr('class', 'y-label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 5 - margin.left)
    .attr('x', 0 - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .style('font-size', '0.8em')
    .text('% Real-estate contributions over campaign donations')

  function render() {

    let screenWidth = svg.node().parentNode.parentNode.offsetWidth
    let screenHeight = window.innerHeight

    // change width and height of the svg
    let newWidth = screenWidth - margin.left - margin.right
    let newHeight = screenHeight - margin.top - margin.bottom

    // Update your SVG
    let actualSvg = d3.select(svg.node().parentNode)
    actualSvg
      .attr('height', newHeight + margin.top + margin.bottom)
      .attr('width', newWidth + margin.left + margin.right)

    xPositionScale.range([0, newWidth])
    yPositionScale.range([newHeight, 0])

    d3.select('#chart')
      .attr('width', newWidth)
      .attr('height', newHeight)

    svg
      .selectAll('circle')
      .attr('cx', d => {
        return xPositionScale(d.real_state)
      })
      .attr('cy', d => {
        return yPositionScale(d.percent)
      })
      .attr('fill', d => {
        return colorScale(d.Specific_Party)
      })


    svg
      .select('.x-label')
      .attr('transform', 'translate(' + newWidth/2 + ' ,' + (newHeight + margin.top + 35) + ')')
      //.text('Real-state contributions ($)')

    svg
      .select('.y-label')
      //.attr('y', 5 - margin.left)
      .attr('x', 0 - newHeight / 2)
      //.text('% Real-estate contributions over campaign donations')

    if(newWidth < 450) {
        svg.selectAll('text').attr('font-size', 12),
        svg.selectAll('circle').attr('r', 3)
        svg.select('.x-label').text('RE contributions ($)')
        svg.select('.y-label').text('% RE contributions over campaign donations')
        var xAxis = d3.axisBottom(xPositionScale).ticks(7).tickFormat(d3.formatPrefix(".1", 1e6))
    } else {
        svg.selectAll('circle').attr('r', 5)
        var xAxis = d3.axisBottom(xPositionScale).ticks(7)
    }

    svg
      .select('.x-axis')
      .attr('transform', 'translate(0,' + newHeight + ')')    
      .call(xAxis)

    // update with newWidth
    var yAxis = d3
      .axisLeft(yPositionScale)
      .tickSize(-newWidth)
      .ticks(5)

    svg.select('.y-axis')
      //.tickSize(-newWidth)
      .call(yAxis)

    d3.select('.y-axis .domain').remove()

  }

  // d3.select(window).on('resize', resize);

  // resize();

    // Every time the window resizes, run the render function
  window.addEventListener('resize', render)
  render() // call it, just pretend the user resize

}
