(function () {

let margin = { top: 50, left: 0, right: 0, bottom: 50 }

let height = 300 - margin.top - margin.bottom
let width = 300 - margin.left - margin.right

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


d3.csv('data/data.csv')
  .then(ready)
  .catch(err => console.log('Failed on', err))

function ready(datapoints) {

// Scrollytelling

  // d3.select('#blank-graph').on('stepin', () => {
    
  // })

  d3.select('#step1').on('stepin', () => {

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "80%")
    .attr("fill", "pink")

  })

  d3.select('#step2').on('stepin', () => {

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "80%")
    .attr("fill", "red")

  })

  d3.select('#step3').on('stepin', () => {

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "80%")
    .attr("fill", "lightblue")

  })

  d3.select('#step4').on('stepin', () => {

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "80%")
    .attr("fill", "yellow")

  })

  d3.select('#step5').on('stepin', () => {

    svg.append("rect")
    .attr("width", "100%")
    .attr("height", "80%")
    .attr("fill", "green")

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

  }

  // Every time the window resizes, run the render function
  window.addEventListener('resize', render)
  render() // call it, just pretend the user resize

}

})()
