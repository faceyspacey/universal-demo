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
  path = path === '/' ? '/Foo' : path
  return pages.indexOf(path.substr(1))
}
