# TI-99/4A Sprite Maker
![build status](https://github.com/dfederspiel/ti-sprite-maker/actions/workflows/azure-static-web-apps-proud-hill-0971b0010.yml/badge.svg)
[![codecov](https://codecov.io/gh/dfederspiel/ti-sprite-maker/branch/main/graph/badge.svg?token=8HKDQX4PCR)](https://codecov.io/gh/dfederspiel/ti-sprite-maker)

**Live:** [sprites.codefly.ninja](https://sprites.codefly.ninja)

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
My first taste of programming came on a hand‑me‑down TI‑99/4A—far from state‑of‑the‑art even in its day. What caught my eye weren’t the games, but the TI‑Basic manuals tucked inside the box.

Armed with nothing but curiosity (and a stack of graph paper), I spent a summer painstakingly sketching 16×16 sprites, converting each row of pixels into 4‑bit binary, then into hex… one character at a time. It was tedious, it was thrilling—and it hooked me for good.

Fast forward to today: modern tools have made pixel art as simple as a click, but I still love that old‑school challenge. TI‑Sprite‑Maker is my tribute to those early days. Instead of graph paper, drag your pixels on screen; instead of manual conversions, get your hex map in an instant—no erasers needed.

This was a fun weekend throwback, and while I don’t plan on writing much TI‑Basic from here on, revisiting that era reminded me how far we’ve come. 🚀

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
