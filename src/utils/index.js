export const pages = [
  'Foo',
  'Bar',
  'Baz',
  'Rudy',
  'Example',
  'ReduxFirstRouter',
  'Universal',
  'FaceySpacey'
]

export const nextIndex = index => ++index % pages.length

export const indexFromPath = path => {
  const index = pages.indexOf(path.substr(1))
  return index > -1 ? index : 0
}
