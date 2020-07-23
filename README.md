<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify -->


<!-- ## Notes
Video Tutorial: https://www.youtube.com/watch?v=rQroxWLZiCo
Shirley Wu's Observable: https://observablehq.com/@shiffman/shirley-wu-d3-extravaganza

### Building Petals

My data idea: A Year In Flowers
    Average Daily Temperature => Number of Petals
    Max Temp => Fill Color of Petals
    Min Temp => Line Color of Petals

    D3 documentation: https://github.com/d3/d3/wiki
    OpenWeather API: https://home.openweathermap.org/myservices
    Blog post on storing API keys in React: http://lortza.github.io/2018/05/22/create-react-app-api-keys.html

    My Observable Notebook: http://lortza.github.io/2018/05/22/create-react-app-api-keys.html

****SVG PATH
1. Set petalPath
petalPath = "M 0,0 C -10,-10 -10,-40 0,-50 C 10,-40 10,-10 0,0"

2. Set up svg path
html`<svg width="100" height="50"><path transform="translate(50,50)" d="${petalPath}"></svg>`

3. Set petalSize
petalSize = 50

****
GET API DATA
data =d3.json('https://raw.githubusercontent.com/sxywu/filmflowers/master/movies.json').then(data => _.values(data));

****
IMPORT D3
d3 = require('d3')


****
1. Set up svg with height and width
2. Use extent to find min max range of data
3. Scale linear -> data to size of the petals (domain to range)
4. Scale Quantize -> data to number of petals (domain to range)
5. Use scales to set numPetals and petSize using data
6. Set up flowersData object with petalSize and array of petals (rotated around the circle)
(see Observable notebook) -->



