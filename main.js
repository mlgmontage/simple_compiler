console.log("compiler");

const code = "3 + 4 + 5    ";

function lexer(code) {
  const tokens = code
    .split(/\s+/)
    .filter((n) => n.length > 0)
    .map((n) => {
      return isNaN(n)
        ? { type: "operation", value: n }
        : { type: "number", value: parseInt(n) };
    });
  return tokens;
}

console.log(code);
console.table(lexer(code));
