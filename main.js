console.log("compiler");

const thread = "Hello my name is";

// simple lexer
const tokens = thread
  .split(/\s+/)
  .filter((t) => t.length > 0)
  .map((token) => {
    return isNaN(token)
      ? { type: "word", value: token }
      : { type: "number", value: token };
  });

console.table(tokens);
