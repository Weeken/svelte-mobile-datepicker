export function createList (start: number, end: number) {
  let list: number[] = []
  for(let i = start; i <= end; i ++) {
    list.push(i)
  }
  return list
}

export function pad (val: number) {
  return val >= 10 ? val.toString() : `0${val}`
}