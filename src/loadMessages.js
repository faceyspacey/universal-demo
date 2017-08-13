export default function loadMessages(lang) {
  // Note: `import()` is always rewritten by babel-plugin-universal-import.
  // It does not differ between client and server code.
  const wrapped = import(`./messages/${lang}`)

  if (process.env.TARGET === 'web') {
    return wrapped.then(msgs => msgs.default)
  }

  /* eslint-disable global-require, import/no-dynamic-require, prefer-template */
  return __webpack_require__(wrapped.resolve(lang)).default
}
