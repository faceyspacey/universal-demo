import PropTypes from "prop-types"
import universal from "react-universal-component"
import Loading from "./components/Loading"
import NotFound from "./components/NotFound"

// small function that allows page to be a string or a dynamic import function
// <UniversalComponent page={()=>{import('../../someFolder/Component.js')}}
// Its great for complex folder structures. You can leverage code completion
const determineHowToLoad = props =>
  Promise.all([
    import(/* webpackChunkName: '[request]' */ `./${props.page}`)
  ]).then(proms => proms[0])

const UniversalComponent = universal(determineHowToLoad, {
  chunkName: props => props.page,
  // @ts-ignore
  resolve: props => require.resolveWeak(`./${props.page}`),
  onError: error => {
    throw error
  },
  minDelay: 1200,
  loading: Loading,
  error: NotFound
})

UniversalComponent.propTypes = {
  loading: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool
  ]),
  error: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.bool
  ]),
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  timeout: PropTypes.number,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  minDelay: PropTypes.number,
  alwaysDelay: PropTypes.bool,
  loadingTransition: PropTypes.bool
}

const loadComponent = file => universal(determineHowToLoad({ page: file }))
export default UniversalComponent
export { loadComponent, universal }
