export default function loadMessages(lang) {
  if (typeof window !== 'undefined') {
    return import(`./messages/${lang}`).then(msgs => msgs.default)
  }

  /* eslint-disable global-require, import/no-dynamic-require, prefer-template */
  return Promise.resolve(require('./messages/' + lang).default)
}
