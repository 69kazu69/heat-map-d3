let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

let baseTemp
let values

let xScale
let yScale

let width = 1200
let height = 600
let padding = 60

let canvas = d3.select("svg")
                .style("height", height)
                .style("width", width)
                

generateScales = () => {

}

let drawCells = () => {

}

let drawAxes = () => {

}

d3.json(url)
    .then(data => {
        baseTemp = data.baseTemperature
        values = data.monthlyVariance
        console.log(baseTemp)
        console.log(values)
    })