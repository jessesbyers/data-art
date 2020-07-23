import * as d3 from 'd3'
// import d3Tip from "d3-tip";
let _ = require('lodash')


export const drawFlowers = (days) => {

    const data = days.daily

    console.log(data)
    console.log(data[0])

    const petalPath = 'M 0,0 C -40,-30 15,-40 15,-100 C 0,-40 50,-45 0,0';         //asymetrical

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

        // const sizeScale = d3.scaleLinear().domain(windMinmax).range([0.25, 1]);
        const tPetalScale = d3.scaleQuantize().domain(tempMinmax).range([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);   
        const wPetalScale = d3.scaleQuantize().domain(windMinmax).range([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]); 
        const pPetalScale = d3.scaleQuantize().domain(precipMinmax).range([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);   
  

      
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
                petalPath
              }
            }),
            wPetals: _.times(windPetals, i => {
                return {
                  angle: 360 * i / windPetals, 
                  petalPath
                }
              }),
            pPetals: _.times(precipPetals, i => {
            return {
                angle: 360 * i / precipPetals, 
                petalPath
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


        
        const tempFlowers = d3.select('svg')
          .selectAll('g')
          .data(flowersData)
          .enter()
          .append('g')

          .attr('transform', (d, i) => `translate(${(i % 1) * petalSize + sideMargin}, ${Math.floor(i / 1) * petalSize + topMargin})scale(${d.petSize})`)

        
        tempFlowers.selectAll('path')
          .data(d => d.tPetals)
          .enter()
          .append('path')
          .attr('d', d => d.petalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateWarm(d.angle / 360))



        //   adding wind flowers
        tempFlowers.append('g')
            .attr("transform", "translate(200, 0)")
            .selectAll('path')
            .data(d => d.wPetals)
          .enter()
          .append('path')
          .attr('d', d => d.petalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateCool(d.angle / 360))


        // adding precipitation amount flowers (amount in mm)

        tempFlowers.append('g')
        .attr("transform", "translate(400, 0)")
        .selectAll('path')
        .data(d => d.pPetals)
      .enter()
      .append('path')
      .attr('d', d => d.petalPath)
      .attr('transform', d => `rotate(${d.angle})`)
      .attr('fill', (d, i) => d3.interpolateTurbo(d.angle / 360))


        //  CODE FOR ADDING TEXT FOR EACH FLOWER
        tempFlowers.append('text')
          .text(d => `${d.date}` )
          .attr('text-anchor', 'middle')
          .attr('y', -20)
          .attr('x', -200)

        tempFlowers.append('text')
          .text(d => `Temperature: ${d.temperature} F` )
          .attr('text-anchor', 'middle')
          .attr('y', 0)
          .attr('x', -200)

        tempFlowers.append('text')
          .text(d => `Wind Speed: ${d.windSpeed} MPH` )
          .attr('text-anchor', 'middle')
          .attr('y', 20)
          .attr('x', -200)

        tempFlowers.append('text')
          .text(d => `Precipitation: ${d.precip} mm` )
          .attr('text-anchor', 'middle')
          .attr('y', 40)
          .attr('x', -200)


        return svg
}