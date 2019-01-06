(function() {

    let margin = {
      top: 50,
      left: 0,
      right: 0,
      bottom: 50
    }

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


    Promise.all([
        d3.csv('daily_delays.csv'),
        d3.csv('TotalDay.csv')
      ])
      .then(ready)
      .catch(err => {
        console.log('Failed with', err)
      });

    function ready([caldatapoints, chartdatapoints]) {

      // Scrollytelling

      // d3.select('#blank-graph').on('stepin', () => {

      // })

      d3.select('#step1').on('stepin', () => {

        const margin = {
          top: 50,
          right: 0,
          bottom: 100,
          left: 30
        }
        const height = 350 - margin.top - margin.bottom
        const width = 1200 - margin.left - margin.right

        var gridSize = Math.floor(width / 52),
          legendElementWidth = gridSize * 2,
          buckets = 9,
          colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // alternatively colorbrewer.YlGnBu[9]
          days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          dataset = ['daily_delays.csv']
        var weeks = []
        for (var i = 0; i < 53; i++) {
          weeks[i] = i + 1;
        }

        // var container = d3.select('#calendar');


        // Nest that sweet data
        var nested = d3
          .nest()
          .key(function(d) {
            return d.year
          })
          .entries(caldatapoints)

        svg
          .selectAll('.whatever')
          .data(nested)
          .enter()
          .append('svg')
          .attr('class', d => {
            return 'year' + d.key
          })
          .attr('height', height + margin.top + margin.bottom)
          .attr('width', width + margin.left + margin.right)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
          .each(function(d) {
            var svg = d3.select(this);

            // Add a label for each year
            svg.append('text')
              .text(d.key)
              .attr('x', width / 2)
              .attr('y', -10)
              .attr('font-size', 20)
              .attr('dy', -15)
              .attr('text-anchor', 'middle')
            // .attr('font-family', 'Consolas, courier')

            // Add labels for the day of the week
            var dayLabels = svg.selectAll(".dayLabel")
              .data(days)
              .enter().append("text")
              .text(function(d) {
                return d
              })
              .attr("x", 0)
              .attr("y", function(d, i) {
                return i * gridSize
              })
              .style("text-anchor", "end")
              .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
              .attr("class", function(d, i) {
                return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis")
              })

            // Add labels for the week of the year
            var timeLabels = svg.selectAll(".weekLabel")
              .data(weeks)
              .enter()
              .append("text")
              .text(function(d) {
                return d
              })
              .attr("x", function(d, i) {
                return i * gridSize;
              })
              .attr("y", 0)
              .style("text-anchor", "middle")
              .attr("transform", "translate(" + gridSize / 2 + ", -6)")
              .attr('class', 'weekLabel mono axis')

            // Define a colorScale here
            var colorScale = d3.scaleQuantile()
              .domain([0, buckets - 1, d3.max(d.values, function(d) {
                return d.DEP_DELAY
              })])
              .range(colors)

            var cards = svg.selectAll(".week")
              .data(d.values, function(d) {
                return d.DAY_OF_WEEK + ':' + d.Week_Number
              })

            cards
              .append("title")

            // Add some great circles for each date
            cards
              .enter()
              .append('circle')
              .attr('class', 'dateCircles')
              .attr("cx", function(d) {
                return (d.Week_Number - .5) * gridSize
              })
              .attr("cy", function(d) {
                return (d.DAY_OF_WEEK - .5) * gridSize
              })
              .attr('r', 9)
              .attr('class', 'hour bordered')
              .attr('fill', colors[0])

            // Transition into a fill, maybe?
            svg
              .selectAll('.bordered')
              .transition()
              .duration(1000)
              .style('fill', function(d) {
                return colorScale(d.DEP_DELAY)
              })

            cards
              .select('title')
              .text(function(d) {
                return d.values.DEP_DELAY
              })

            cards
              .exit()
              .remove()

            // var legend = svg
            //   .selectAll(".legend")
            //   .data([0].concat(colorScale.quantiles()), function(d) { return d.DEP_DELAY })

            // legend.enter().append("g")
            //     .attr("class", "legend")

            // legend
            //   .append("rect")
            //   .attr("x", function(d, i) { return legendElementWidth * i })
            //   .attr("y", height)
            //   .attr("width", legendElementWidth)
            //   .attr("height", gridSize / 2)
            //   .style("fill", function(d, i) { return colors[i] })

            // legend.append("text")
            //   .attr("class", "mono")
            //   .text(function(d) { return "≥ " + Math.round(d) })
            //   .attr("x", function(d, i) { return legendElementWidth * i; })
            //   .attr("y", height + gridSize);

            // legend.exit().remove()

          })
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

        //Changes the Font for the Numbers Around Circle

        const width = 960,
          height = 500,
          chartRadius = height / 2 - 40;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        let svg = d3.select('body').append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        let tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip');

        const PI = Math.PI,
          arcMinRadius = 50,
          arcPadding = 10,
          labelPadding = -10,
          numTicks = 7;


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