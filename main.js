console.log("compiler");

const thread = "Paper 100 Line 0 0 500 500 Line 500 0 0 500 Line 0 250 250 500";

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
    let expression = {};

    // analyze words
    if (current_token.type === "word") {
      switch (current_token.value) {
        case "Paper":
          expression = {
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

        case "Line":
          expression = {
            type: "CallExpression",
            name: "Line",
            arguments: [],
          };

          let x1 = tokens.shift();
          let y1 = tokens.shift();
          let x2 = tokens.shift();
          let y2 = tokens.shift();

          if (x1.type === "number") {
            expression.arguments.push({
              type: "NumberLiteral",
              value: x1.value,
            });
          } else {
            throw "Line command must be followed by a number";
          }

          if (y1.type === "number") {
            expression.arguments.push({
              type: "NumberLiteral",
              value: y1.value,
            });
          } else {
            throw "Line command must be followed by a number";
          }

          if (x2.type === "number") {
            expression.arguments.push({
              type: "NumberLiteral",
              value: x2.value,
            });
          } else {
            throw "Line command must be followed by a number";
          }

          if (y2.type === "number") {
            expression.arguments.push({
              type: "NumberLiteral",
              value: y2.value,
            });
          } else {
            throw "Line command must be followed by a number";
          }

          AST.body.push(expression);
      }
    }
  }

  return AST;
}

function transformer(ast) {
  let svg_ast = {
    tag: "svg",
    attr: {
      width: 500,
      height: 500,
      viewBox: "0 0 500 500",
      xmlns: "http://w3.org/2000/svg",
      version: "1.1",
    },
    body: [],
  };

  while (ast.body.length > 0) {
    let node = ast.body.shift();
    let pen_color = 100;

    switch (node.name) {
      case "Paper":
        let paper_color = 100 - node.arguments[0].value;
        svg_ast.body.push({
          tag: "rect",
          attr: {
            x: 0,
            y: 0,
            width: 500,
            height: 500,
            fill:
              "rgb(" +
              paper_color +
              "%," +
              paper_color +
              "%," +
              paper_color +
              "%)",
          },
        });
        break;

      case "Line":
        svg_ast.body.push({
          tag: "line",
          attr: {
            x1: node.arguments[0].value,
            y1: node.arguments[1].value,
            x2: node.arguments[2].value,
            y2: node.arguments[3].value,
            style: "stroke:rgb(255, 0, 0); stroke-width:2",
          },
        });
    }
  }

  return svg_ast;
}

function generator(svg_ast) {
  // create attributes string out of attr object
  const createAttrString = (attr) => {
    return Object.keys(attr)
      .map((key) => {
        return key + '="' + attr[key] + '"';
      })
      .join(" ");
  };

  let svg_attr = createAttrString(svg_ast.attr);

  // for each elements in the body of svg_ast, generate svg tag
  let elements = svg_ast.body
    .map((node) => {
      return (
        "<" +
        node.tag +
        " " +
        createAttrString(node.attr) +
        "></" +
        node.tag +
        ">"
      );
    })
    .join("\n\t");

  return "<svg " + svg_attr + ">\n" + elements + "\n</svg>";
}

const tokens = lexer(thread);

const parsed = parser(lexer(thread));

const transformed = transformer(parser(lexer(thread)));

const svg = generator(transformer(parser(lexer(thread))));

console.log(thread); // code
console.log(tokens); // tokens
console.log(parsed); // parsed
console.log(transformed); // transformed to svg friendly form
console.log(svg); // output

document.body.innerHTML = svg;
