syntax @ = (ctx) => {
  let name = ctx.next().value
  return #`Symbol.for("${name}")`
}

console.log(@what.toString())
console.log(@what == @what)

export syntax
