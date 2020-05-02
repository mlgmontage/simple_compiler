console.log("compiler");

const thread = "Hello, My name is Compiler";

const tokens = thread.split(/\s+/).map((token) => {
  return isNaN(token)
    ? { type: "word", value: token }
    : { type: "number", value: token };
});

console.log(tokens);
