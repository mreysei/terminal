import { Storage } from "./Storage";

enum Key {
  username = "username",
  theme = "theme",
  historic = "historic"
}

const fromMobile = (): boolean => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
}

const getterAndSetter = (key: Key, defaultValue: string) => ({
  get: () => Storage.get(key) ?? defaultValue,
  set: (value: string) => Storage.set(key, value)
})

export const UserData = {
  fromMobile,
  username: getterAndSetter(Key.username, "anonymous"),
  theme: getterAndSetter(Key.theme, "ubuntu"),
  historic: getterAndSetter(Key.historic, "[]"),
}