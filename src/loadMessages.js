export default function loadMessages(lang) {
  // Note: `import()` is always rewritten by babel-plugin-universal-import.
  // It does not differ between client and server code.
  const wrapped = import(`./messages/${lang}`)

  if (typeof window !== 'undefined') {
    return wrapped.then(msgs => msgs.default)
  }

  /* eslint-disable global-require, import/no-dynamic-require, prefer-template */
  // return Promise.resolve(require('./messages/' + lang).default)
  return __webpack_require__(wrapped.resolve()).default
}
