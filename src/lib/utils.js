export const partial = (fn, ...args) => fn.bind(null, ...args)

export const pipe = (...fns) => fns.reduce(_pipe);

export const trace = msg => x => {
  console.log(msg, x)
  return x;
}

const _pipe = (f, g) => (...args) => g(f(...args))