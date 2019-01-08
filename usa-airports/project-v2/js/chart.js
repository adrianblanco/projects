(function() {

    let margin = {
      top: 50,
      left: 0,
      right: 0,
      bottom: 50
    }

    let height = 500 - margin.top - margin.bottom
    let width = 500 - margin.left - margin.right

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





    //let margin = { top: 10, left: 10, right: 10, bottom: 10 }

    //let height = 400 - margin.top - margin.bottom
    //let width = 400 - margin.left - margin.right

    // let svg = d3
    //   .select('#chart-3')
    //   .append('svg')
    //   .attr('height', height + margin.top + margin.bottom)
    //   .attr('width', width + margin.left + margin.right)
    //   .append('g')
    //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let nyc = [-74, 40]
    let sf = [-122, 37]
    let austin = [-97, 30]

    let projection = d3.geoOrthographic()
    let path = d3.geoPath().projection(projection)

    // d3.json(require('./data/world.topojson'))
    //   .then(ready)
    //   .catch(err => console.log('Failed on', err))

    // function ready(json) {
      // let countries = topojson.feature(json, json.objects.countries)
      // projection.fitSize([width, height], countries)

      // svg
      //   .append('path')
      //   .datum({ type: 'Sphere' })
      //   .attr('d', path)
      //   .attr('class', 'sphere')
      //   .attr('fill', '#81DAF5')
      //   .attr('stroke', 'black')
      //   .attr('stroke-width', 2)

      // svg
      //   .append('g')
      //   .selectAll('.country')
      //   .data(countries.features)
      //   .enter()
      //   .append('path')
      //   .attr('class', 'country')
      //   .attr('d', path)
      //   .attr('fill', '#F5ECCE')
      //   .attr('stroke', 'black')
      //   .attr('stroke-width', 0.1)

      // d3.select("#step-nyc").on('stepin', () => {
      //    console.log("I stepped into the NYC step")
      //    // to rotate you have to use the negative
      //    // Focus on NYC
      //    projection.rotate([-nyc[0], -nyc[1]])
      //    // to zoom in 50%
      //     .scale(projection.scale() * 1.5)

      //    svg.selectAll('.country')
      //     .transition()
      //     .duration(5000)
      //     .attr('d', path)

      //    // to redraw the sphere
      //    // not only the mao
      //    svg.selectAll('.sphere')
      //     .transition()
      //     .duration(5000)
      //     .attr('d', path)

      //  })

      // d3.transition()
      // .duration(10000)
      // // rotate can have any name, we have to refer it later
      // .tween('rotate', () => { 
      //   // target is where we pretend to go
      //   let target = [-nyc[0], -nyc[1]]
      //   let rotationInterpolator = d3.interpolate(projection.rotate(), target) 
      //   return function(t) {
      //     console.log(t)
      //     console.log(rotationInterpolator(t))
      //     projection.rotate(rotationInterpolator(t)) // 0.5 instead of t, it will be stuck halfway, in the Atlantic Ocean
      //     svg.selectAll('.country').attr('d', path)
      //     svg.selectAll('.sphere').attr('d', path)
      //   }
      // })




    Promise.all([
        d3.csv('daily_delays.csv'),
        d3.csv('TotalDay.csv'),
        d3.json('./data/world.topojson')
      ])
      .then(ready)
      .catch(err => {
        console.log('Failed with', err)
      });

    function ready([caldatapoints, chartdatapoints, json]) {

      let countries = topojson.feature(json, json.objects.countries)
      projection.fitSize([width, height], countries)

      svg
        .append('path')
        .datum({ type: 'Sphere' })
        .attr('d', path)
        .attr('class', 'sphere')
        .attr('fill', '#81DAF5')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

      svg
        .append('g')
        .selectAll('.country')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', '#F5ECCE')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.1)

      let locations = [
    {"latitude": 22, "longitude": 88},
    {"latitude": 12.61315, "longitude": 38.37723},
    {"latitude": -30, "longitude": -58},
    {"latitude": -14.270972, "longitude": -170.132217},
    {"latitude": 28.033886, "longitude": 1.659626},
    {"latitude": 40.463667, "longitude": -3.74922},
    {"latitude": 35.907757, "longitude": 127.766922},
    {"latitude": 23.634501, "longitude": -102.552784}
]

      const markers = markerGroup.selectAll('circle')
                          .data(locations);
                      markers
                          .enter()
                          .append('circle')
                          .merge(markers)
                          .attr('cx', d => projection([d.longitude, d.latitude])[0])
                          .attr('cy', d => projection([d.longitude, d.latitude])[1])
                          .attr('fill', d => {
                              const coordinate = [d.longitude, d.latitude];
                              gdistance = d3.geoDistance(coordinate, projection.invert(center));
                              return gdistance > 1.57 ? 'none' : 'steelblue';
                          })
                          .attr('r', 7);

      // Scrollytelling

      // d3.select('#blank-graph').on('stepin', () => {

      // })

      d3.select('#step1').on('stepin', () => {

      d3.transition()
      .duration(10000)
      // rotate can have any name, we have to refer it later
      .tween('rotate', () => { 
        // target is where we pretend to go
        let target = [-nyc[0], -nyc[1]]
        let rotationInterpolator = d3.interpolate(projection.rotate(), target) 
        return function(t) {
          //console.log(t)
          //console.log(rotationInterpolator(t))
          var currentRotation = rotationInterpolator(t)
          projection.rotate(currentRotation) // 0.5 instead of t, it will be stuck halfway, in the Atlantic Ocean
          svg.selectAll('.country').attr('d', path)
          svg.selectAll('.sphere').attr('d', path)
          }
      })

      })

      d3.select('#step2').on('stepin', () => {

      d3.transition()
          .duration(1000)
      // rotate can have any name, we have to refer it later
          .tween('rotate', () => { 
        // target is where we pretend to go
           let target = [-nyc[0], -nyc[1]]
            let rotationInterpolator = d3.interpolate(projection.rotate(), target) 
              return function(t) {
          //console.log(t)
          //console.log(rotationInterpolator(t))
            var currentRotation = rotationInterpolator(t)
            projection.rotate(currentRotation) // 0.5 instead of t, it will be stuck halfway, in the Atlantic Ocean
            svg.selectAll('.country').attr('d', path)
            svg.selectAll('.sphere').attr('d', path)
            }
      })



      })

      d3.select('#step3').on('stepin', () => {

      d3.transition()
          .duration(1000)
      // rotate can have any name, we have to refer it later
          .tween('rotate', () => { 
        // target is where we pretend to go
           let target = [-sf[0], -sf[1]]
            let rotationInterpolator = d3.interpolate(projection.rotate(), target) 
              return function(t) {
          //console.log(t)
          //console.log(rotationInterpolator(t))
            var currentRotation = rotationInterpolator(t)
            projection.rotate(currentRotation) // 0.5 instead of t, it will be stuck halfway, in the Atlantic Ocean
            svg.selectAll('.country').attr('d', path)
            svg.selectAll('.sphere').attr('d', path)
            }
      })


        // svg.append("rect")
        //   .attr("width", "100%")
        //   .attr("height", "80%")
        //   .attr("fill", "lightblue")

      })

      d3.select('#step4').on('stepin', () => {

      d3.transition()
          .duration(1000)
      // rotate can have any name, we have to refer it later
          .tween('rotate', () => { 
        // target is where we pretend to go
           let target = [-austin[0], -austin[1]]
            let rotationInterpolator = d3.interpolate(projection.rotate(), target) 
              return function(t) {
          //console.log(t)
          //console.log(rotationInterpolator(t))
            var currentRotation = rotationInterpolator(t)
            projection.rotate(currentRotation) // 0.5 instead of t, it will be stuck halfway, in the Atlantic Ocean
            svg.selectAll('.country').attr('d', path)
            svg.selectAll('.sphere').attr('d', path)
            }
      })


      })

      d3.select('#step5').on('stepin', () => {

      // svg.append("rect")
      //   .attr("width", "100%")
      //   .attr("height", "80%")
      //   .attr("fill", "green")

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