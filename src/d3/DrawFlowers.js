import * as d3 from 'd3'
let _ = require('lodash')

export const drawFlowers = (days) => {

    const data = days.daily

    console.log(data)
    console.log(data[0])



    const petalPath = 'M 0,0 C -25,-10 -5,-40 0,-50 C 5,-40 25,-10 0,0';
    const petalSize = 50
    const height = 500
    const width = 500


        const svg = d3.select('.viz')
            // svg.html`<svg width="500" height="500"><path transform="translate(25,50)" d="${petalPath}"></svg>`
            // svg.html`<svg width="500" height="500"><path transform="translate(25,50)" d='M 0,0 C -25,-10 -5,-40 0,-50 C 5,-40 25,-10 0,0'></svg>`

            // .attr('viewbox', [0, 0, petalSize * 10, petalSize * 10])
            .attr('height', height)
            .attr('width', width)



        // const tempMinmax = d3.extent(data, d => d.temp.day);

        // const windMinmax = d3.extent(data, d => d.wind_speed);
      
        // const sizeScale = d3.scaleLinear().domain(windMinmax).range([0.25, 1]);
        // const numPetalScale = d3.scaleQuantize().domain(tempMinmax).range([3, 6, 9, 12]);      
      
        // const flowersData = _.map(data, d => {
        // //   const flowersData = data.map(d => {

        //   const numPetals = numPetalScale(d.temp.day);
        // //   const petSize = sizeScale(d.wind_speed);
        //   return {
        //     // petSize,
        //     petals: _.times(numPetals, i => {
        //       return {
        //         angle: 360 * i / numPetals, 
        //         petalPath
        //       }
        //     }),
        //     numPetals,
        //   }
        // })
        // console.log(flowersData)
        
        // const flowers = d3.select(svg)
        //   .selectAll('g')
        //   .data(flowersData)
        //   .enter()
        //   .append('g')
        //   .attr('transform', (d, i) => `translate(${(i % 5) * petalSize}, ${Math.floor(i / 5) * petalSize})scale(${d.petSize})`);
      
        //   console.log(flowers)
        
        // flowers.selectAll('path')
        //   .data(d => d.petals)
        //   .enter()
        //   .append('path')
        //   .attr('d', d => d.petalPath)
        //   .attr('transform', d => `rotate(${d.angle})`)
        //   .attr('fill', (d, i) => d3.interpolateWarm(d.angle / 360));
        
        return svg
    


}