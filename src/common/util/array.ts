export const getMaxEntryByPropName = (
  arr: any[],
  propName: string
) => arr.reduce((prev, current) => prev[propName] > current[propName] ? prev : current)

export const getMinEntryByPropName = (
  arr: any[],
  propName: string
) => arr.reduce((prev, current) => prev[propName] < current[propName] ? prev : current)

