export const pages = [
  "Foo",
  "Bar",
  "Baz",
  "Rudy",
  "Example",
  "ReduxFirstRouter",
  "Universal",
  "FaceySpacey"
]

export const nextIndex = (index: number) => ++index % pages.length

export const indexFromPath = (path: string): number => {
  path = path === "/" ? "/Foo" : path
  return pages.indexOf(path.substr(1))
}
