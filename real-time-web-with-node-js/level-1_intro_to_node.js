/**----------------------------------------------------------------------------
 * Intro to Node.js
 * ----------------------------------------------------------------------------
*/

// Hello Dog
var http = require('http'); // How we require modules

http.createServer(function (request, response) {
  response.writeHead(200);                 // Status code in header
  response.write('Hello, this is dog.');   // Response body
  response.end();                          // Close the connection
}).listen(8080);                           // Listen for connections on this port

console.log('Listening on port 8080...');


// Simulating a long running process
var http = require('http');

http.createServer(function (request, response) { // <-- request event
  response.writeHead(200);
  response.write("Dog is running.");
  setTimeout(function () {                       // <-- timeout event
    response.write("Dog is done.");
    response.end();
  }, 5000);
}).listen(8080);


// Blocking code
var contents = fs.readFileSync('/etc/hosts');
console.log(contents);
console.log('Doing something else');

// Non-Blocking code
fs.readFile('/etc/hosts', function (err, contents) {
  console.log(contents);
});
console.log('Doing something else');


/**----------------------------------------------------------------------------
 * 1.2 Convert Blocking
 * ----------------------------------------------------------------------------
 * Let's start with a simple Hello server. Follow the tasks below to create a 
 * simple Node server that outputs a greeting.
 * 
 * 1. First, tell the response which status it should have (a successful status 
 * is 200).
 * 
 * 2. Next, write a message to the response body in the form of "Hello, this is 
 * <your name here>".
 * 
 * 3. To finish it up, tell the response to end so the client on the other side knows 
 * it has received all the data.
 * 
*/
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200);
  response.write('Hello, this is Diego');
  response.end();
}).listen(8080);


/**----------------------------------------------------------------------------
 * 1.3 Convert Blocking
 * ----------------------------------------------------------------------------
 * Not everyone knows why it's important to write non-blocking programs in Node.js. 
 * One of these unfortunate souls has written some code to read a file off the 
 * file-system using the blocking function readFileSync. Convert the code to be 
 * non-blocking using the readFile function instead.
 * 
 * 1. Start by changing the call from readFileSync() to readFile().
 * 
 * 2. Next, add a callback method to the readFile() call. This method should accept
 * error and contents parameters.
 * 
 * 3. To finish it up, remove the contents var declaration, and move the call to 
 * console.log() inside your callback.
 * 
*/
// var fs = require('fs');
// var contents = fs.readFileSync('index.html');
// console.log(contents);

var fs = require('fs');
fs.readFile('index.html', function (err, contents) {
  console.log(contents);
});


/**----------------------------------------------------------------------------
 * 1.5 Read File in Server
 * ----------------------------------------------------------------------------
 * Now that you know how to create an HTTP server and how to read a file off the 
 * filesystem in a non-blocking way, let's try to combine the two.
 * 
 * Instead of just writing a string to the HTTP response, write the contents of 
 * index.html to the response instead.
 * 
 * 1. After response.writeHead(200), add a call to fs.readFile() that reads 
 * index.html asynchronously. Remember to pass a callback function, that accepts 
 * an error parameter, and a contents parameter.
 * 
 * 2. Now that you have the file contents, write it to the response.
 * 
 * 3. To finish up, end the response after the file contents have been written.
*/
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(request, response) {
//   response.writeHead(200);

//   response.end();
// }).listen(8080);

var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  response.writeHead(200);
  fs.readFile('index.html', function (err, content) {
    response.write(content);
    response.end();
  });

}).listen(8080);


/**----------------------------------------------------------------------------
 * 1.7 Writing Response Headers
 * ----------------------------------------------------------------------------
 * Up until now all we've been sending into the response.writeHead() function is the 
 * status code. However, it can take additional parameters.
 * 
 * 1. Consult the node documentation, and add a 'Content-Type' of 'text/html' to 
 * the response.
 * 
*/
// var http = require('http');
// var fs = require('fs');

// http.createServer(function(request, response) {
//   response.writeHead(200);

//   fs.readFile('index.html', function(err, contents) {
//     response.write(contents);
//     response.end();
//   });

// }).listen(8080);

var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  fs.readFile('index.html', function (err, contents) {
    response.write(contents);
    response.end();
  });

}).listen(8080);


/**----------------------------------------------------------------------------
 * 1.8 Response End
 * ----------------------------------------------------------------------------
 * Our original Hello server can be shortened since the response.end() function 
 * optionally takes data as a parameter. Remove the response.write line altogether, 
 * and send the hello string as a parameter on the response.end function. This will 
 * send the data, and once finished add the end to the response.
 * 
 * 1. Instead of passing the content to response.write(), pass it to response.end().
 * 
 * 2. Now, remove the call to response.write().
*/
// var http = require('http');

// http.createServer(function(request, response) {
//   response.writeHead(200);
//   response.write("Hello, this is dog");
//   response.end();
// }).listen(8080);

var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200);
  response.end('Hello, this is dog');
}).listen(8080);













