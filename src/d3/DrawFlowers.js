import * as d3 from 'd3'
// import d3Tip from "d3-tip";
let _ = require('lodash')


export const drawFlowers = (days) => {

    const data = days.daily

    console.log(data)
    console.log(data[0])

    const petalPath = 'M 0,0 C -40,-30 15,-40 15,-100 C 0,-40 50,-45 0,0';         //asymetrical

    const petalSize = 150
    const height = 1300
    const width = 900
    const margin = 100


        const svg = d3.select('.viz')
            .append('svg')
            .attr('height', height)
            .attr('width', width)

        const tempMinmax = d3.extent(data, d => d.temp.day);

        const windMinmax = d3.extent(data, d => d.wind_speed);

        // const sizeScale = d3.scaleLinear().domain(windMinmax).range([0.25, 1]);
        const tPetalScale = d3.scaleQuantize().domain(tempMinmax).range([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);   
        const wPetalScale = d3.scaleQuantize().domain(windMinmax).range([3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);   

      
        const flowersData = _.map(data, d => {
          const tempPetals = tPetalScale(d.temp.day);
          const windPetals = wPetalScale(d.wind_speed);

        //   const petSize = sizeScale(d.wind_speed);
        const petSize = 1

          const date = new Date(d.dt * 1000).toLocaleDateString("en") 
          const temperature = d.temp.day
          const windSpeed = d.wind_speed

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
            tempPetals,
            windPetals,
            date,
            temperature, 
            windSpeed, 
          }
        })
        console.log(flowersData)


        
        const tempFlowers = d3.select('svg')
          .selectAll('g')
          .data(flowersData)
          .enter()
          .append('g')
          .attr('transform', (d, i) => `translate(${(i % 1) * petalSize + margin}, ${Math.floor(i / 1) * petalSize + margin})scale(${d.petSize})`)


        
        tempFlowers.selectAll('path')
          .data(d => d.tPetals)
          .enter()
          .append('path')
          .attr('d', d => d.petalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateWarm(d.angle / 360))
        // .attr('fill', (d, i) => i % 2 === 0 ? d3.interpolateCool(d.angle / 360) : d3.interpolateWarm(d.angle / 360))





    //  CODE FOR ADDING TEXT BELOW EACH FLOWER (OR ADD TO TOOLTIP)
        tempFlowers.append('text')
          .text(d => `${d.date}` )
        //   .attr("transform","translate(0, 0) scale(1, 1)")
          .attr('text-anchor', 'middle')
        //   .attr('font-size', "100px")
        .attr('y', -20)
        .attr('x', petalSize + 10)


        tempFlowers.append('text')
          .text(d => `Temperature: ${d.temperature} F` )
          .attr('text-anchor', 'middle')
          .attr('y', 0)
          .attr('x', petalSize + 10)


        tempFlowers.append('text')
          .text(d => `Wind Speed: ${d.windSpeed} MPH` )
          .attr('text-anchor', 'middle')
          .attr('y', 20)
          .attr('x', petalSize + 10)



        //   adding wind flowers
        tempFlowers.append('g')
            .attr("transform", "translate(325, 0)")
            .selectAll('path')
            .data(d => d.wPetals)
          .enter()
          .append('path')
          .attr('d', d => d.petalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateCool(d.angle / 360))

        return svg
}