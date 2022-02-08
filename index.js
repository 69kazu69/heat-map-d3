let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

let baseTemp
let values

let xScale
let yScale

let width = 1200
let height = 600
let padding = 60

let canvas = d3.select("#canvas")
                .style("height", height)
                .style("width", width)
                

generateScales = () => {

    xScale = d3.scaleLinear()
                .domain([d3.min(values, i=> {
                    return i.year
                }), d3.max(values, i => {
                    return i.year
                })])
                .range([padding, width - padding])

    yScale = d3.scaleTime()
            .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
            .range([padding, height-padding])

}

let drawCells = () => {

    canvas.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("class", "cell" )
        .attr("fill", i => {
            variance = i.variance
            if(variance <= -1){
                return "SteelBlue"
            }else if(variance <= 0){
                return "LightSteelBlue"
            }else if(variance < 1){
                return "Orange"
            }else{
                return "Crimson"
            }
        })
        .attr("data-month", i => {
            return  i.month - 1 
        })
        .attr("data-year", i => {
                return i.year
        })
        .attr("data-temp", i => {
            return baseTemp + i.variance
        })
        .attr("height", (height - 2*padding)/12)
        .attr("y", item => {
            return yScale(new Date(0, item.month - 1, 0, 0, 0, 0, 0))
        })
        .attr("width", i => {
            let years = d3.max(values, (i) => {return i.year}) - d3.min(values, (i) => {return i.year})

            return (width - 2 * padding)/years
        })
        .attr("x", i => {
            return  xScale(i.year)
        })

}

let drawAxes = () => {


    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))
    let yAxis = d3.axisLeft(yScale)

    canvas.append("g")
          .call(xAxis)
          .attr("id", "x-axis")
          .attr("transform", "translate(0, "+ (height-padding) + ")")
        

    canvas.append("g")
            .call(yAxis)
            .attr("id", "y-axis")
            .attr("transform", "translate(" +(padding)+", 0)")
}

d3.json(url)
    .then((data, error) => {
        if (error) {console.log(error) 
            return}
        baseTemp = data.baseTemperature
        values = data.monthlyVariance
        

        generateScales()
        drawAxes()
        drawCells()
        
    })