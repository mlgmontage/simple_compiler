console.log("compiler");

const thread = "Paper 100";

// const line = [1, 2, 3];
// console.log(line.shift());
// console.log(line.shift());

// simple lexer
function lexer(thread) {
  const tokens = thread
    .split(/\s+/)
    .filter((t) => t.length > 0)
    .map((token) => {
      return isNaN(token)
        ? { type: "word", value: token }
        : { type: "number", value: token };
    });

  return tokens;
}

function parser(tokens) {
  // Abstract syntax tree
  let AST = {
    type: "Drawing",
    body: [],
  };

  // extract tokens
  while (tokens.length > 0) {
    let current_token = tokens.shift();

    // analyze words
    if (current_token.type === "word") {
      switch (current_token.value) {
        case "Paper":
          let expression = {
            type: "CallExpression",
            name: "Paper",
            arguments: [],
          };

          // if current token is CallExpression
          let argument = tokens.shift();
          if (argument.type === "number") {
            expression.arguments.push({
              type: "NumberLiteral",
              value: argument.value,
            });
            AST.body.push(expression);
          } else {
            throw "Paper command must be followed by a number";
          }
          break;
      }
    }
  }

  return AST;
}

const tokens = lexer(thread);

const parsed = parser(lexer(thread));

console.table(tokens);
console.log(parsed);
