// TO DO:
    // Design different petalPath for each type of weather data
    // Design color scheme for each type of data
    // add buttons to change location


import * as d3 from 'd3'
let _ = require('lodash')


export const drawFlowers = (days) => {

    const data = days.daily
    console.log(data)

    const tPetalPath = 'M 0,0 C -30,-30 -30,-30 0,-100 C 30,-30 30,-30 0,0'     //TEMPERATURE
    const wPetalPath = 'M 0,0 C -40,-40 15,-50 50,-100 C 0,-50 0,0 0,0';        //WIND
    const pPetalPath = 'M 0,0 C -60,-30 0,-40 0,-100 C 0,-40 60,-30 0,0';       //PRECIPITATION

    const petalSize = 150
    const height = 1500
    const width = 1200
    const sideMargin = 300
    const topMargin = 200


        const svg = d3.select('.viz')
            .append('svg')
            .attr('height', height)
            .attr('width', width)

        const tempMinmax = d3.extent(data, d => d.temp.day);

        const windMinmax = d3.extent(data, d => d.wind_speed);

        const precipMinmax = d3.extent(data, d => d.rain);

        // const sizeScale = d3.scaleLinear().domain(windMinmax).range([0.25, 1]);      // FOR SCALING BASED ON WIND SPEED
        const tPetalScale = d3.scaleQuantize().domain(tempMinmax).range([3, 5, 7, 9, 11, 13]);   
        const wPetalScale = d3.scaleQuantize().domain(windMinmax).range([3, 6, 9, 12, 15, 18]); 
        const pPetalScale = d3.scaleQuantize().domain(precipMinmax).range([3, 4, 5, 6, 7, 8]);   
  

      
        const flowersData = _.map(data, d => {
          const tempPetals = tPetalScale(d.temp.day);
          const windPetals = wPetalScale(d.wind_speed);
          const precipPetals = pPetalScale(d.rain);

        //   const petSize = sizeScale(d.wind_speed);
        const petSize = 1

          const date = new Date(d.dt * 1000).toLocaleDateString("en") 
          const temperature = d.temp.day
          const windSpeed = d.wind_speed
          const precip = d.rain

          return {
            petSize,
            tPetals: _.times(tempPetals, i => {
              return {
                angle: 360 * i / tempPetals, 
                tPetalPath
              }
            }),
            wPetals: _.times(windPetals, i => {
                return {
                  angle: 360 * i / windPetals, 
                  wPetalPath
                }
              }),
            pPetals: _.times(precipPetals, i => {
            return {
                angle: 360 * i / precipPetals, 
                pPetalPath
            }
            }),
            tempPetals,
            windPetals,
            precipPetals,
            date,
            temperature, 
            windSpeed, 
            precip
          }
        })
        console.log(flowersData)


        
        const flowers = d3.select('svg')
          .selectAll('g')
          .data(flowersData)
          .enter()
          .append('g')

          .attr('transform', (d, i) => `translate(${(i % 1) * petalSize + sideMargin}, ${Math.floor(i / 1) * petalSize + topMargin})scale(${d.petSize})`)

        
        flowers.selectAll('path')
          .data(d => d.tPetals)
          .enter()
          .append('path')
          .attr('d', d => d.tPetalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateYlOrRd(d.angle / 360))






        //   adding wind flowers
        flowers.append('g')
            .attr("transform", "translate(200, 0)")
            .selectAll('path')
            .data(d => d.wPetals)
          .enter()
          .append('path')
          .attr('d', d => d.wPetalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateBuGn(d.angle / 360))


        // adding precipitation amount flowers (amount in mm)

        flowers.append('g')
        .attr("transform", "translate(400, 0)")
        .selectAll('path')
        .data(d => d.pPetals)
      .enter()
      .append('path')
      .attr('d', d => d.pPetalPath)
      .attr('transform', d => `rotate(${d.angle})`)
      .attr('fill', (d, i) => d3.interpolateYlGnBu(d.angle / 360))


        //  CODE FOR ADDING TEXT FOR EACH FLOWER
        flowers.append('text')
          .text(d => `${d.date}` )
          .attr('text-anchor', 'middle')
          .attr('y', -20)
          .attr('x', -200)

        flowers.append('text')
          .text(d => `Temperature: ${d.temperature} F` )
          .attr('text-anchor', 'middle')
          .attr('y', 0)
          .attr('x', -200)

        flowers.append('text')
          .text(d => `Wind Speed: ${d.windSpeed} MPH` )
          .attr('text-anchor', 'middle')
          .attr('y', 20)
          .attr('x', -200)

        flowers.append('text')
          .text(d => d.precip ? `Precipitation: ${d.precip} mm` : `Precipitation: 0 mm`)
          .attr('text-anchor', 'middle')
          .attr('y', 40)
          .attr('x', -200)



        // adding header labels
        svg.append('text')
            .text("Temperature (degrees F)")
            .attr('text-anchor', 'middle')
            .attr('y', 75)
            .attr('x', 300)

        svg.append('text')
            .text("Wind Speed (MPH)")
            .attr('text-anchor', 'middle')
            .attr('y', 75)
            .attr('x', 500)

        svg.append('text')
            .text("Precipitation (mm)")
            .attr('text-anchor', 'middle')
            .attr('y', 75)
            .attr('x', 700)


        return svg
}