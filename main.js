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

function transformer(ast) {
  let svg_ast = {
    tag: "svg",
    attr: {
      width: 100,
      height: 100,
      viewBox: "0 0 100 100",
      xmlns: "http://w3.org/2000/svg",
      version: "1.1",
    },
    body: [],
  };

  while (ast.body.length > 0) {
    let node = ast.body.shift();
    let paper_color = 100 - node.arguments[0].value;
    svg_ast.body.push({
      tag: "rect",
      attr: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        fill:
          "rgb(" + paper_color + "%," + paper_color + "%," + paper_color + "%)",
      },
    });
    break;
  }

  return svg_ast;
}

const tokens = lexer(thread);

const parsed = parser(lexer(thread));

console.table(tokens);
console.log(parsed);
