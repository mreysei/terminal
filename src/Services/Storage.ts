const get = (key: string) => localStorage.getItem(key)
const set = (key: string, value: string) => localStorage.setItem(key, value)

export const Storage = {
  get,
  set,
}