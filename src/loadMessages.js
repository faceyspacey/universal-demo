export default function loadMessages(lang) {
  return import(`./messages/${lang}`).then(msgs => msgs.default)
}
