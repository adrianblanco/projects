import * as d3 from 'd3'

let margin = { top: 50, left: 125, right: 20, bottom: 100 }

let height = 600 - margin.top - margin.bottom
let width = 450 - margin.left - margin.right

let svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var xPositionScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, width])

var yPositionScale = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.25)

var line = d3
  .line()
  .x(d => xPositionScale(d.year))
  .y(d => yPositionScale(d.cumulativePoints))
  .curve(d3.curveStepAfter)

d3.csv(require('./data/data.csv'))
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {
  // Extract the year from the date column
  // Make sure points is a number

  datapoints.sort((a, b) => a.pct_women - b.pct_women)

  var instruments = datapoints.map(d => d.instrument)
  yPositionScale.domain(instruments)

  svg
    .selectAll('.instrument-bg')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'instrument-bg')
    .attr('y', d => yPositionScale(d.instrument))
    .attr('x', 0)
    .attr('height', yPositionScale.bandwidth())
    .attr('width', width)
    .attr('fill', 'lightgray')

  svg
    .selectAll('.instrument')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('class', 'instrument')
    .attr('y', d => yPositionScale(d.instrument))
    .attr('x', 0)
    .attr('height', yPositionScale.bandwidth())
    .attr('width', 0) // d => xPositionScale(d.pct_women)) // change to 0 to start always in lightgray
    .attr('fill', 'black')

  var labels = ['Men', 'Women']

  svg
    .selectAll('.gender-label')
    .data(labels)
    .enter()
    .append('text')
    .attr('class', 'gender-label')
    .attr('y', yPositionScale('Flute'))
    .attr('x', d => (d === 'Women' ? 10 : width - 10))
    .attr('text-anchor', d => (d === 'Women' ? 'start' : 'end'))
    .attr('fill', 'white')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 18)
    .attr('dy', yPositionScale.bandwidth() / 2 + 2)
    .text(d => d)

  svg
    .append('line')
    .attr('class', 'halfway-line')
    .attr('x1', xPositionScale(50))
    .attr('y1', 0)
    .attr('x2', xPositionScale(50))
    .attr('y2', height)
    .attr('stroke', 'white')
    .attr('stroke-width', 2)

  var yAxis = d3
    .axisLeft(yPositionScale)
    .tickSize(0)
    .tickFormat(d => d)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  svg
    .selectAll('.y-axis text')
    .attr('fill', 'black')
    .attr('dx', -10)

  var xAxis = d3
    .axisTop(xPositionScale)
    .tickValues([20, 40, 60, 80])
    .tickFormat(d => d + '%')
    .tickSize(-height)

  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .call(xAxis)
    .lower()

  svg.selectAll('.axis line').attr('stroke', '#ccc')
  svg.selectAll('.axis path').attr('stroke', 'none')

  svg.selectAll('.axis text').attr('font-size', 18)
  svg.selectAll('.x-axis text').attr('fill', 'lightgray')

// Scrollytelling

  // d3.select('#blank-graph').on('stepin', () => {
    
  // })

  d3.select('#blank-graph').on('stepin', () => {
    svg.selectAll('.instrument')
      .transition()
      .attr('width', 0)

    svg.selectAll('.y-axis text')
      .attr('fill', 'lightgray')
  })

  d3.select('#intro-graph').on('stepin', () => {
    svg.selectAll('.instrument')
      .transition()
      .attr('width', d => xPositionScale(d.pct_women))
    
    svg.selectAll('.y-axis text')
      .attr('fill', d => {
        if (d === 'Harp' || d == 'Flute' || d == 'Violin') {
          return 'black'
        } else {
          return 'lightgray'
      }
    })

    svg.selectAll('.instrument-bg')
      .transition()
      .attr('fill', 'lightgray')
  })

  d3.select('#instruments-mentioned').on('stepin', () => {
    d3.selectAll('.majority-male')
      .style('background', 'grey')
      .style('color', 'white')

    svg.selectAll('.instrument-bg').attr('fill', d => {
      var instruments = ['DIS', 'XOM', 'AAPL']

      // The ugly JavaScript way to say
      // "is this in my list?"
      if (instruments.indexOf(d.instrument) !== -1) {
        return 'grey'
      } else {
        return 'lightgray'
      }
    })
  })

  // Change the size of everything in our viz
  function render() {
    console.log('Something happened')

    let screenWidth = svg.node().parentNode.parentNode.offsetWidth
    let screenHeight = window.innerHeight

    // console.log('height is', screenHeight)
    // console.log('width is', screenWidth)
    // console.log('------')

    // change width and height of the svg
    let newWidth = screenWidth - margin.left - margin.right
    let newHeight = screenHeight - margin.top - margin.bottom

    // Update your SVG
    let actualSvg = d3.select(svg.node().parentNode)
    actualSvg
      .attr('height', newHeight + margin.top + margin.bottom)
      .attr('width', newWidth + margin.left + margin.right)

    //xPositionScale.range([0, screenWidth])
    //yPositionScale.range([screenHeight, 0])

    xPositionScale.range([0, newWidth])
    yPositionScale.range([newHeight, 0])

    svg
      .selectAll('.instrument-bg')
      .attr('width', newWidth)
      .attr('height', yPositionScale.bandwidth())
      .attr('y', d => yPositionScale(d.instrument))

    svg
      .selectAll('.instrument')
      .attr('y', d => yPositionScale(d.instrument))
      .attr('height', yPositionScale.bandwidth())
      .attr('width', d => xPositionScale(d.pct_women))

    svg
      .select('.halfway-line')
      .attr('x1', xPositionScale(50))
      .attr('y1', 0)
      .attr('x2', xPositionScale(50))
      .attr('y2', newHeight)

    svg
      .selectAll('.gender-label')
      .attr('y', yPositionScale('MMM'))
      .attr('x', d => (d === 'Women' ? 10 : newWidth - 10))
      .attr('dy', yPositionScale.bandwidth() / 2 + 2)

    if(newHeight < 400) {
      svg.selectAll('text').attr('font-size', 12)
    } else {
      
    }

    xAxis.tickSize(-newHeight)

    svg.select('.x-axis').call(xAxis)
    svg.select('.y-axis').call(yAxis)

  }

  // Every time the window resizes, run the render function
  window.addEventListener('resize', render)
  render() // call it, just pretend the user resize

}
