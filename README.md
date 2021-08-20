# TI-99/4A Sprite Maker
![build status](https://github.com/dfederspiel/ti-sprite-maker/actions/workflows/azure-static-web-apps-proud-hill-0971b0010.yml/badge.svg)  
Visual HEX encoder for ASCII character mapping on the TI-99/4A 

![TI-99/4A Sprite Maker](/TI-99.png)

## Usage

Clone and run the following:
```
yarn install
yarn start
```

Access the app in your browser [http://localhost:3000](http://localhost:3000)

Click on a square to toggle it on or off. This will automatically update the hex value in the `CALL CHAR` command above the tile. A copy of the current matrix is kept in local storage.

## About
My family inherited our first computer when I was a kid. It wasn't anything to write home about, and nobody in my family knew what to do with it (it was subpar even for the computing standards of the time). It did, however, come with a couple manuals on programming in TI-Basic that caught my attention.

With nothing but time and curiosity, I quickly found myself spending **many** days of the summer reading and re-creating examples printed in the manuals. It was my first introduction to programming, and as an aspiring video game developer, I was hooked.

One particularly fascinating aspect of the language was its graphics library. It wasn't so easy to create them, and I used up a LOT of graphing paper, sketching out pixelated sprites on a 16x16 grid, dividing them up into 4-bit binary values and converting that to the 16-character HEX value that was need to replace a single character in the ASCII set... It was a bit much.

Anyway, I downloaded the very clever [TI-99/4A emulator](https://www.99er.net/emul.shtml) and was quickly reminded of why photoshop should be a wonder of the modern world. Instead of going down the graphing paper rabbit hole of my youth, I figured I'd pay a tribute to the good old days, and make visual helper to create the HEX maps in a more environmentally friendly way.

It was a fun little weekend project, and I don't plan on writing much TI-Basic in the future. Revisiting it was just as nostalgic as it was painful, and I'm proud of how far we've come. 🚀
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

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

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
