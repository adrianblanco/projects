(function() {
  const margin = { top: 50, right: 0, bottom: 0, left: 0 }
  const height = 250 - margin.top - margin.bottom
  const width = 900 - margin.left - margin.right

  var gridSize = Math.floor(width / 52),
      legendElementWidth = gridSize*2,
      buckets = 9,
      colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
      days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      dataset = ['daily_delays.csv']
  var weeks = []
  for (var i = 0; i < 53; i++) {
    weeks[i] = i + 1;
  }

var container = d3.select('#calendar');

// Read in files
d3.csv('daily_delays.csv')
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  });

function ready(datapoints) {

  // Nest that sweet data
  var nested = d3
    .nest()
    .key(function(d) {
      return d.year
    })
    .entries(datapoints)

    container
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
      .each(function(d){
        var svg = d3.select(this);

        // Add a label for each year
        svg.append('text')
          .text(d.key)
          .attr('x', width / 2)
          .attr('y', -10)
          .attr('font-size', 20)
          .attr('dy', -15)
          .attr('text-anchor', 'middle')
          .attr('font-family', 'Consolas, courier')

        // Add labels for the day of the week
        var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
          .text(function (d) { return d })
          .attr("x", 0)
          .attr("y", function (d, i) { return i * gridSize })
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
          .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis") })

        // Add labels for the week of the year
        var timeLabels = svg.selectAll(".weekLabel")
          .data(weeks)
          .enter()
          .append("text")
          .text(function(d) { return d })
          .attr("x", function(d, i) { return i * gridSize; })
          .attr("y", 0)
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + gridSize / 2 + ", -6)")
          .attr('class', 'weekLabel mono axis')

        // Define a colorScale here
        var colorScale = d3.scaleQuantile()
          .domain([0, buckets - 1, d3.max(d.values, function (d) { return d.DEP_DELAY })])
          .range(colors)

        var cards = svg.selectAll(".week")
          .data(d.values, function(d) {return d.DAY_OF_WEEK+':'+d.Week_Number})

        cards
          .append("title")

        // Add some great circles for each date
        cards
          .enter()
          .append('circle')
          .attr('class', 'dateCircles')
          .attr("cx", function(d) { return (d.Week_Number - .5) * gridSize })
          .attr("cy", function(d) { return (d.DAY_OF_WEEK - .5) * gridSize })
          .attr('r', 7)
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

  svg
    .selectAll('#year2015')
    .remove()

}
})()