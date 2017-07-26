# Universal Demo
> **UPDATE (July 25th):** This demo has been updated to showcase *babel-plugin-universal-import* + *react-universal-component* 2.0 + **this yet-to-be-merged PR to webpack/webpack: https://github.com/webpack/webpack/pull/5235**. 

This is a demo of how to use the *Universal* family of packages:

- [react-universal-component](https://github.com/faceyspacey/react-universal-component) 
- [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks)
- [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)
- [babel-plugin-universal-import](https://github.com/faceyspacey/babel-plugin-universal-import) 

Feel free to use it as a boilerpate.

## Installation

```
# git checkout https://github.com/webpack/webpack.js.org/pull/1453 webpack
# webpack is automatically aliased and expected to be a sibling directory to this repo

git clone https://github.com/faceyspacey/universal-demo.git
cd universal-demo
yarn
yarn start
```


Open [localhost:3000](http://localhost:3000) in your browser. View the source code in the browser to see what chunks are being sent. Also open the Network tab to see *when*.


## Things To Do

- try both commands and examine their corresponding Webpack configs and the corresponding server file: [`server/index.js`](./server/index.js)
- view the source in your browser to see what the server sends (do this often)
- open [`src/components/App.js`](./src/components/App.js) and toggle `state.show` between `false` and `true` and
then view the source in your browser to see when corresponding chunks are sent vs. not sent.
- open the browser console *Network* tab and see 2 files come over the wire (Example.js + Example.css) when `import()` is called. `state.show` must be set to `false`.
- edit the `<App />` and `<Example />` components to see that HMR works--even for split chunks. Do so with both `state.show` pre-set to both
`false` and `true` to verify HMR works in all scenarios.
- edit and save the CSS files to confirm HMR works for CSS as well, thanks to [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)

- when bundling for production, examine the build folders to see exactly what chunks and files are built for you 
- open [`server/render.js`](./server/render.js) and use the React components returned from`flushChunks` instead.
- open [`server/render.js`](./server/render.js) and from the return of `flushCHunks` use `css` instead of `styles` while running in production to see your CSS embedded directly in the response page. View the source in your browser to confirm. *Note: during development, external stylesheets will still be used for HMR to work; this is automatic.*


*Long live the dreams of Universal HMR* and ***Universal Code-Splitting!***


## Contributing
We use [commitizen](https://github.com/commitizen/cz-cli), so run `npm run cm` to make commits. A command-line form will appear, requiring you answer a few questions to automatically produce a nicely formatted commit. If you see anything wrong, feel free to make a PR.

## More from FaceySpacey in Reactlandia
- [redux-first-router](https://github.com/faceyspacey/redux-first-router). It's made to work perfectly with *Universal*. Together they comprise our *"frameworkless"* approach to what Next.js does.
