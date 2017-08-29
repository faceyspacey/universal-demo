export const examples = [
  'Counter',
  'TodoListAndImportedComponent',
  'CheckboxesAndSlot',
  'Transition',
  'Vuex',
  'D3'
]

export const nextIndex = index => ++index % examples.length

export const indexFromPath = path => {
  path = path === '/' ? '/Counter' : path
  return examples.indexOf(path.substr(1))
}
