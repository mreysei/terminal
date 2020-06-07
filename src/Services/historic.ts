const key = "historic";

const add = (input: string) => {
  const historic = get();
  historic.push(input)
  localStorage.setItem(key, JSON.stringify(historic));
}

const get = () => {
  const historic = localStorage.getItem(key) || "[]";
  return JSON.parse(historic);
}

export const Historic = {
  add,
  get,
}