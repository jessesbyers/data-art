import * as d3 from 'd3'
// import d3Tip from "d3-tip";
let _ = require('lodash')


export const drawFlowers = (days) => {

    const data = days.daily

    console.log(data)
    console.log(data[0])


    // const petalPath = 'M 0,0 C -25,-10 -5,-40 0,-50 C 5,-40 25,-10 0,0';       //original simple petals
    // const petalPath = 'M 20,20 C -5,10 15,-20 20,-30 C 15,-20 45,10 0,0';   // crazy petals!
    // const petalPath = 'M 0,0 C -50,-30 15,-40 15,-100 C 0,-40 50,-30 0,0';     // new fat/skinny petals (symmetrical)
    const petalPath = 'M 0,0 C -40,-30 15,-40 15,-100 C 0,-40 50,-45 0,0';         //asymetrical
    const petalSize = 100
    const height = 800
    const width = 900
    const margin = 100


        const svg = d3.select('.viz')
            .append('svg')
            .attr('height', height)
            .attr('width', width)

        const tempMinmax = d3.extent(data, d => d.temp.day);

        const windMinmax = d3.extent(data, d => d.wind_speed);
      
        const sizeScale = d3.scaleLinear().domain(windMinmax).range([0.25, 1]);
        const numPetalScale = d3.scaleQuantize().domain(tempMinmax).range([3, 6, 9, 12]);    
      
        const flowersData = _.map(data, d => {
          const numPetals = numPetalScale(d.temp.day);
          const petSize = sizeScale(d.wind_speed);
          const date = new Date(d.dt * 1000).toLocaleDateString("en") 
          const temperature = d.temp.day
          const windSpeed = d.wind_speed

          return {
            petSize,
            petals: _.times(numPetals, i => {
              return {
                angle: 360 * i / numPetals, 
                petalPath
              }
            }),
            numPetals,
            date,
            temperature, 
            windSpeed, 
          }
        })
        console.log(flowersData)


        
        const flowers = d3.select('svg')
          .selectAll('g')
          .data(flowersData)
          .enter()
          .append('g')
          .attr('transform', (d, i) => `translate(${(i % 8) * petalSize + margin}, ${Math.floor(i / 8) * petalSize + margin})scale(${d.petSize})`)


        
        flowers.selectAll('path')
          .data(d => d.petals)
          .enter()
          .append('path')
          .attr('d', d => d.petalPath)
          .attr('transform', d => `rotate(${d.angle})`)
          .attr('fill', (d, i) => d3.interpolateCool(d.angle / 360))



    //  CODE FOR ADDING TEXT BELOW EACH FLOWER (OR ADD TO TOOLTIP)
        flowers.append('text')
        //   .text(d => {
              .html(function(d) {
                  return (
                  "<span>" + d.date + "<br/>" + "</span>" +
                  "<span>" + "Temperature: " + d.temperature + " F" + "<br/>" + "</span>" +
                  "<span>" + "Wind Speed: " + d.windSpeed + "<br/>" + "</span>"
                  )
              })
        //     }
        //   )
        //   .text(d => d.temperature)
        // //   .text(d => d.windSpeed)
          .attr('text-anchor', 'middle')
          .attr('y', petalSize + 10)
          .attr("font-size", "1em")


        return svg
}

              // setting up tooltip with data labels
            //   const tip = d3Tip()
            //   .attr('class', 'd3-tip')
            // //   .offset([-10, 0])
            // .offset([50, 0])

            //   .html(function(d) {
            //       console.log(d)
            //       return "<p>" + "<span style='color:white'>" + "Date: " + d.date + "<br/>" + "</span>" +
            //           "<span style='color:#BD2D28'>" + "Temperature: " + d.temperature + " F" + "<br/>" + "</span>" +
            //           "<span style='color:#E3BA22'>" + "Wind Speed: " + d.windSpeed + "<br/>" + "</span>"
            //   })



                    //   .on('mouseover', tip.show)
        //   .on('mouseout', tip.hide)

                    // flowers.call(tip);
