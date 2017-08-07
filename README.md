<a href="https://gitter.im/Reactlandia/Lobby" target="_blank">
  <img alt="Edit Redux-First Router Demo" src="http://cdn.reactlandia.com/chat-badge-reactlandia.png">
</a>

# Universal Demo
> **UPDATE (July 25th):** This demo has been updated to showcase *babel-plugin-universal-import* + *react-universal-component* 2.0 + **this yet-to-be-merged PR to webpack/webpack: https://github.com/webpack/webpack/pull/5235**. 

<p align="center">
  <img src="https://cdn.reactlandia.com/react-universal-component-demo-twitter.gif" />
</p>

This is a demo of how to use the *Universal* family of packages:

- [react-universal-component](https://github.com/faceyspacey/react-universal-component) 
- [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks)
- [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)
- [babel-plugin-universal-import](https://github.com/faceyspacey/babel-plugin-universal-import) 

Feel free to use it as a boilerpate.

## Installation

```
git clone https://github.com/faceyspacey/universal-demo.git
cd universal-demo
yarn
yarn start
```
> NOTE: this demo depends on a fork of webpack called [webpack-universal](https://www.npmjs.com/package/webpack-universal). You will need to install it and alias like is done in this demo via [module-alias](https://www.npmjs.com/package/module-alias) (check `package.json` and `server/index.js` to see how it's done). The fork is based on my recently merged PR to webpack: https://github.com/webpack/webpack.js.org/pull/1453 . Expect it to be published to NPM in the next version of `webpack` in a few days.


## Things To Do
- Open [localhost:3000](http://localhost:3000) in your browser
- Click "CHANGE PAGE" to cycle through dynamically imported pages
- refresh on any page
- and then view the source in the browser to see what chunks are being sent on each page
- **view the primary code in:** ***[src/components/App.js](./src/components/App.js)***
- open the Network tab to see when imports are fetched
- edit the components to see that HMR works--even for split chunks.
- edit and save the CSS files to confirm HMR works for CSS as well, thanks to [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)

- examine the build folders to see exactly what chunks and files are built for you 



*Long live the dreams of Universal HMR* and ***Universal Code-Splitting!***


## When will the Webpack PR for dynamic `require.resolveWeak` be published

Only @sokra can tell you that. The good thing is it's already merged, so hopefully soon.

## Contributing
We use [commitizen](https://github.com/commitizen/cz-cli), so run `npm run cm` to make commits. A command-line form will appear, requiring you answer a few questions to automatically produce a nicely formatted commit. If you see anything wrong, feel free to make a PR.

## More from FaceySpacey in Reactlandia
- [redux-first-router](https://github.com/faceyspacey/redux-first-router). It's made to work perfectly with *Universal*. Together they comprise our *"frameworkless"* approach to what Next.js does.
