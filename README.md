# Flush Chunks Boilerplate (Webpack + chunkNames)

This is a boilerplate example for how to use [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks)
in conjunction with [react-universal-component](https://github.com/faceyspacey/react-universal-component) and [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin). 

It's specifically for when you're using **Webpack** with *React Universal Component's* **`flushChunkNames()`** and *Webpack Flush Chunks's* **`chunkNames`** option.

## Installation

```
git clone https://github.com/faceyspacey/flush-chunks-boilerplate-webpack-chunknames.git
cd flush-chunks-boilerplate-webpack-chunknames
yarn
```

> Note: after this point, the readmes are the same for all `flush-chunks-boilerplates` :)

## Usage

```
yarn start
yarn run start:prod
```


After selecting one of the above commands, open [localhost:3000](http://localhost:3000) in your browser. View the source in the browser to see what chunks are being sent.


## Things To Do

- try both commands and examine their corresponding Webpack configs and the corresponding server file: [`server/index.js`](./server/index.js)
- view the source in your browser to see what the server sends (do this often)
- open [`src/components/App.js`](./src/components/App.js) and toggle `state.show` between `false` and `true` and
then view the source in your browser to see when corresponding chunks are sent vs. not sent.
- open the browser console *Network* tab and see when in fact the `Example.js` chunk is asynchronously loaded (it won't be if `state.show` starts off as `true`, which is desired result, i.e. because the client *synchronously* renders exactly what was rendered on the server)
- edit the `<App />` and `<Example />` components to see that HMR works--even for split chunks. Do so with both `state.show` pre-set to both
`false` and `true` to verify HMR works in all scenarios. ***There's warning that may occur on your first edit. Don't worry about it. The change will work and be reflected instantly. It's basically a matter of supression within the `extract-css-chunks-webpack-plugin`***
- edit and save the CSS files to confirm HMR works for CSS as well, thanks to [extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)

- when bundling for production, examine the build folder (or, `buildClient` and `buildServer` folders when using the Webpack boilerplates) to see exactly what chunks and files are built for you. Notice the `stats.json` file in `buildClient`. Notice that every javascript chunk has 2 versions of itself: one ending with the extension `.js` and one ending with `.no_css.js`. This is thanks to 
[extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) which prepares an additional javascript file with no CSS (for the smallest possible build sizes) for sending over the wire as part of SSR. The regular one with css injection in it is used when the chunk is asynchronously loaded as your users navigate your app. HMR will work in both cases. 
- open [`server/render.js`](./server/render.js) and follow the directions of what lines to comment and uncomment to test rendering your chunks as strings vs. React components.
- open [`server/render.js`](./server/render.js) and from the return of `flushCHunks` use `css` instead of `styles` while running in production to see your CSS embedded directly in the response page. View the source in your browser to confirm. *Note: during development, external stylesheets will still be used for HMR to work; this is automatic.*
- check out the amazing package, [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware), to see how dual-compilation works for both your server and client bundles. It's very fast because it shares compiled files between the 2 bundles. We've been surprised this hasn't been more popular and the defacto solution for rendering both bundles. It's very solid. We think you will like it...Another thing nice about it is how seamlessly it ushers your compilation stats to the render function you pass to express's `app.use`.


## Notes

If you're not embedding CSS directly in your response strings, you can forget about ushering the `outputPath` to your `serverRender` function. Keep in mind though that if you do, and if you render the server with Webpack this can become a time-sink to figure out for those not familiar with how Webpack mocks the file system. Basically by default the file system won't be what you expect it to be if you call `path.resolve(__dirname, '..')` within a webpack-compiled portion of your code, which is why it's very nice how [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware) allows you to pass options from Babel code where you can get your bundle's output path resolved properly. Universal Webpack is awesome, but has a few hurdles to doing correctly, particularly in development. [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware) solves those hurdles.

Hopefully insights from this boilerplate simplifies things for you. The key is to recognize the boundary this boilerplate has chosen between what server code is compiled by Webpack and what code is compiled by Babel. The boundary specifically is [`server/index.webpack.js`](./server/index.webpack.js), which is handled by Babel and [`server/render.js`](./server/render.js), which is handled by Webpack--both of which are run on the server. 

If you haven't rendered your server with Webpack before, now's a good time to give the Webpack boilerplates a try. Helping make that--along with *complete HMR*--more of a mainstream thing is a side aim of these repos. 


## Final Note: Hot Module Replacement
> this basically applies to the universal webpack boilerplates

You will notice that the server code is watched with `babel-watch` in `package.json`. The goal is obviously HMR everywhere, since no matter what some of your code is built outside of Webpack. 

There is one gotcha with that though: if you edit the server code (not compiled by Webpack), it will update, but then connection to the client will be lost, and you need to do a refresh. This is very useful for cases where you are actively refreshing, such as when you're checking the output from you server in your browser source code tab, but obviously not the pinnacle in universal HMR. 

However, when your not editing your `express` code much, and if you're editing webpack-compiled code (whether rendered on the client or server), HMR will isomorphically work with no unexpected hiccups; and that *awesomeness* is likely what you'll experience most of the time. That's one of the key benefits of [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware).

If you have a solution to reconnecting the client to HMR after `babel-watch` reloads the server code, we'd love to hear it. 

*Long live the dreams of Universal HMR* and ***Universal Code-Splitting!***


## Contributing
We use [commitizen](https://github.com/commitizen/cz-cli), so run `npm run cm` to make commits. A command-line form will appear, requiring you answer a few questions to automatically produce a nicely formatted commit.

