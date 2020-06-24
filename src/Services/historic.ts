import { UserData } from "./UserData";

const add = (input: string) => {
  const historic = get();
  historic.push(input)
  UserData.historic.set(JSON.stringify(historic))
}

const get = () => {
  const historic = UserData.historic.get()
  return JSON.parse(historic);
}

export const Historic = {
  add,
  get,
}