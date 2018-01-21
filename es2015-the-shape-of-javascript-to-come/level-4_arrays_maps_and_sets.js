/**----------------------------------------------------------------------------
 * 4.3 Destructuring and Rest Parameters
 * ----------------------------------------------------------------------------
 * Complete the code so that it assigns the first element of the array to the 
 * variable first, and the second and third elements of the array to a single 
 * variable called remainingUsers. Remember to use the rest parameter syntax 
 * from inside the array destructuring assignment.
 */
/*
let  = ["Sam", "Tyler", "Brook"];
addActiveUsers(first, remainingUsers);
*/

let [first, ...remainingUsers] = ["Sam", "Tyler", "Brook"];
addActiveUsers(first, remainingUsers);


/** ---------------------------------------------------------------------------
 * 4.4 Destructuring From Return Values
 * ----------------------------------------------------------------------------
 * Add a return value for the buildTopicInfo() function that will make the 
 * rest of the code function correctly.
 */
/*
function buildTopicElement(topic){
 let title = "<h2>" + topic.title + "</h2>";
 let author = "<small>" + topic.author + "</small>";
 let body = "<p>" + topic.body + "</p>";

 return { title: title, author: author, body: body };
}
*/

function buildTopicInfo(topic) {
  let title = `<h1>${topic.title}</h1>`;
  let author = `<small>${topic.author}<small>`;

  return [title, author];
}

let topic = getCurrentTopic();
let [topicTitle, topicAuthor] = buildTopicInfo(topic);


/** ---------------------------------------------------------------------------
 * 4.5 The for...of Loop
 * ----------------------------------------------------------------------------
 * Complete the following code using the new for… of loop. For each element in 
 * the activeUsers array, pass the current user name as the second argument to 
 * the notifyTopicReply() function.
 */
/*
let topicId = currentTopic();
let activeUsers = ["Sam", "Tyler", "Brook"];

for(  ){
  notifyTopicReply(topicId,  );
}
*/

let topicId = currentTopic();
let activeUsers = ["Sam", "Tyler", "Brook"];

for (let activeUser of activeUsers) {
  notifyTopicReply(topicId, activeUser);
}


/** ---------------------------------------------------------------------------
 * 4.12 Adding Entries to a Map Object
 * ----------------------------------------------------------------------------
 * Complete the following code.
 * 
 * 1. First, create a new Map object and assign it to the totalReplies variable.
 * 
 * 2. Using the set() method, add an entry in the totalReplies Map for the 
 * author1 object with the value of 42.
 * 
 * 3. Finally, add an entry in the totalReplies Map for the author2 object with 
 * the value of 15.
 */
/* 
let author1 = { name: "Sam" };
let author2 = { name: "Tyler" };

let totalReplies = ;

console.log( `Total Replies: ${totalReplies.get(author1)}` );
console.log( `Total Replies: ${totalReplies.get(author2)}` );
*/

let author1 = { name: "Sam" };
let author2 = { name: "Tyler" };

let totalReplies = new Map();
totalReplies.set(author1, 42);
totalReplies.set(author2, 15);

console.log(`Total Replies: ${totalReplies.get(author1)}`);
console.log(`Total Replies: ${totalReplies.get(author2)}`);


/** ---------------------------------------------------------------------------
 * 4.15 Iterating Maps With for...of 
 * ----------------------------------------------------------------------------
 * Complete the for… of loop on the right so that it properly prints each 
 * entry. Remember to use array destructuring in order to assign to user and 
 * postTitle at once.
 */
/* 
let recentPosts = new Map();

recentPosts.set( "Sam", "ES2015" );
recentPosts.set( "Tyler", "CoffeeScript" );
recentPosts.set( "Brook",  "TypeScript" );

for(  ){
  console.log(`${user} = ${postTitle}`);
}
*/

let recentPosts = new Map();

recentPosts.set("Sam", "ES2015");
recentPosts.set("Tyler", "CoffeeScript");
recentPosts.set("Brook", "TypeScript");

for (let [user, postTitle] of recentPosts) {
  console.log(`${user} = ${postTitle}`);
}


/** ---------------------------------------------------------------------------
 * 4.19 Using Sets 
 * ----------------------------------------------------------------------------
 * Follow the tasks in order to complete the unfinished code.
 * 
 * 1. Create a new Set object and assign it to the tags variable.
 * 
 * 2. Now, let's add the following 3 items to the set: "JavaScript", 
 * "Programming", and "Web".
 */
/* 
let tags =  ;

console.log(`Total items ${tags.size}`);
*/

let tags = new Set();
tags.add("JavaScript", "Programming", "Web");

console.log(`Total items ${tags.size}`);


/** ---------------------------------------------------------------------------
 * 4.20 Sets and for...of
 * ----------------------------------------------------------------------------
 * Using for… of, loop through each element of the tags Set and assign it to a 
 * local variable called tag so that it properly prints them to the console 
 * from inside the loop.
 */
/* 
let tags = new Set();

tags.add("JavaScript");
tags.add("Programming");
tags.add("Web");

for(  ){
  console.log(`Tag: ${tag}`);
}
*/

let tags = new Set();

tags.add("JavaScript");
tags.add("Programming");
tags.add("Web");

for (let tag of tags) {
  console.log(`Tag: ${tag}`);
}


/** ---------------------------------------------------------------------------
 * 4.21 Sets and Destructuring
 * ----------------------------------------------------------------------------
 * Using array destructuring, extract the first element of the tags set and 
 * assign it to the variable first.
 */
/* 
let tags = new Set();

tags.add("JavaScript");
tags.add("Programming");
tags.add("Web");

console.log( `First tag: ${first}` );

*/

let tags = new Set();

tags.add("JavaScript");
tags.add("Programming");
tags.add("Web");

let [first] = tags;

console.log(`First tag: ${first}`);

