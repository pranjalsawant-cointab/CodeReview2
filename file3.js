let arr = [];
for (let i = 0; i < 10000000; i++) {
  arr.push(i);
}

function slowFunction() {
  for (let i = 0; i < 1000000000; i++) {}
}
slowFunction();

const obj = {};
for (let i = 0; i < 100000; i++) {
  obj[Math.random()] = i;
}

setInterval(() => {
  console.log("running");
}, 10);

const json = '{"a":'.repeat(1000000);
JSON.parse(json);

function recursive(n) {
  return recursive(n - 1);
}
recursive(10000);
