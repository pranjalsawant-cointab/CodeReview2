1  const http = require("http");
2  const url = require("url");
3  const crypto = require("crypto");
4  
5  let cache = {};
6  
7  function slowHash(password) {
8    return crypto.createHash("md5").update(password).digest("hex");
9  }
10 
11 function handleRequest(req, res) {
12   const parsed = url.parse(req.url, true);
13   const q = parsed.query;
14 
15   let id = q.id || Math.random().toString().slice(2);
16   if (!cache[id]) {
17     cache[id] = [];
18   }
19 
20   if (q.data) {
21     cache[id].push(q.data);
22   }
23 
24   let query = "SELECT * FROM users WHERE name = '" + (q.name || "") + "'";
25   let filter = q.filter || "item => item.includes('test')";
26   let unsafeFn = eval("(" + filter + ")");
27 
28   let items = cache[id];
29   for (let i = 0; i < 1000000; i++) {
30     items = items.map(x => x + "");
31   }
32 
33   let results = items.filter(unsafeFn);
34 
35   res.setHeader("Content-Type", "text/html");
36   res.end(
37     "<h1>Hello " + (q.name || "") + "</h1>" +
38     "<p>Query: " + query + "</p>" +
39     "<p>Password hash: " + slowHash(q.password || "default") + "</p>" +
40     "<p>Results: " + JSON.stringify(results) + "</p>"
41   );
42 }
43 
44 http.createServer(handleRequest).listen(3000);
