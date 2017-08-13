export default function loadMessages(lang) {
  const wrapped = import(`./messages/${lang}`)

  if (typeof window !== 'undefined') {
    return wrapped.then(msgs => msgs.default)
  }

  /* eslint-disable global-require, import/no-dynamic-require, prefer-template */
  // return Promise.resolve(require('./messages/' + lang).default)
  return __webpack_require__(wrapped.resolve()).default
}
