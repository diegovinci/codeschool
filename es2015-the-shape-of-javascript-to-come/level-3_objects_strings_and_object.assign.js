/**----------------------------------------------------------------------------
 * 3.2 Building Objects With the New Syntax 
 * ----------------------------------------------------------------------------
 * Using the new object initializer shorthand, complete the code on the right 
 * to build a user object. This new object should have the properties name, 
 * totalReplies, and avatar with values coming from the variables with the 
 * same name.
 */
/*
let name = "Brook";
let totalReplies = 249;
let avatar = "/users/avatars/brook-user-1.jpg";

let user = ;

addUserToSidebar(user);
*/

let name = "Brook";
let totalReplies = 249;
let avatar = "/users/avatars/brook-user-1.jpg";

let user = { name, totalReplies, avatar };

addUserToSidebar(user);


/** ---------------------------------------------------------------------------
 * 3.3 Object Initializer Shorthand
 * ----------------------------------------------------------------------------
 * Refactor the code on the right to use the object initializer shorthand.
 */
/*
function buildTopicElement(topic){
 let title = "<h2>" + topic.title + "</h2>";
 let author = "<small>" + topic.author + "</small>";
 let body = "<p>" + topic.body + "</p>";

 return { title: title, author: author, body: body };
}
*/

function buildTopicElement(topic) {
  let title = "<h2>" + topic.title + "</h2>";
  let author = "<small>" + topic.author + "</small>";
  let body = "<p>" + topic.body + "</p>";

  return { title, author, body };
}


/** ---------------------------------------------------------------------------
 * 3.4 Object Destructuring 
 * ----------------------------------------------------------------------------
 * Let's add a new topic to the page. Call buildUser(), and pass it two 
 * arguments, "Tyler" and "Williams". It'll return an object with a fullName 
 * property. Use object destructuring to assign this property to a fullName 
 * variable. 
 * 
 * - You need to do this on one line of code. Do this on the first line in 
 * the editor
 * 
 * - Keep the given order. "Tyler" is the first argument, "Williams" the second.
 * 
 * - You can see the implementation of buildUser() by clicking on the 
 * build-user.js tab in the editor!
 */
/*
//build-topic-element.js
function buildTopicElement(topic){
  let title = "<h2>" + topic.title + "</h2>";
  let author = "<small>" + topic.author + "</small>";
  let body = "<p>" + topic.body + "</p>";

  return { title, author, body };
}

// build-user.js
function buildUser(first, last){
  let fullName = first + " " + last;

  return { first, last, fullName };
} 

// add-topic.js

let title  = "The New Object Syntax - Good or Bad?";
let author = fullName;
let body = "What do you all think of the new syntax? I like it!";

let topic = { title, author, body };

let element = buildTopicElement(topic);

addTopicToPage(element);
*/

let { fullName } = buildUser("Tyler", "Williams");

let title = "The New Object Syntax - Good or Bad?";
let author = fullName;
let body = "What do you all think of the new syntax? I like it!";

let topic = { title, author, body };

let element = buildTopicElement(topic);

addTopicToPage(element);


/** ---------------------------------------------------------------------------
 * 3.6 Method Initializer Shorthand 
 * ----------------------------------------------------------------------------
 * Let's refactor the code on the right to use some new ES2015 features.
 * 
 * 1. First, change the isSecureHash property to use the new method initializer 
 * shorthand.
 * 
 * By now, the number 32 inside the isSecureHash should be an obvious bad 
 * smell. Create a new const named SECURE_HASH_CODE_LENGTH and replace this 
 * magic number inside the conditional with the new const.
 */
/* 
function buildMetadata(object){
  let id = parseInt(object.id);
  let lastUpdatedAt = object.updatedAt || object.createdAt;
  let hashCode = _buildHashCode(object);
  
  return { 
    id, 
    lastUpdatedAt, 
    hashCode,
    isSecureHash: function() {
      return hashCode >= 32;
    }
  };
}
*/

function buildMetadata(object) {
  let id = parseInt(object.id);
  let lastUpdatedAt = object.updatedAt || object.createdAt;
  let hashCode = _buildHashCode(object);
  const SECURE_HASH_CODE_LENGTH = 32;

  return {
    id,
    lastUpdatedAt,
    hashCode,
    isSecureHash() {
      return hashCode >= SECURE_HASH_CODE_LENGTH;
    }
  };
}


/** ---------------------------------------------------------------------------
 * 3.7 String Interpolation
 * ----------------------------------------------------------------------------
 * Complete the code on the right so that it uses the variable replyCount from 
 * inside the template string. You'll need to use the syntax for string 
 * interpolation.
 */
/* 
let replyCount = 21;
let message = `This topic has a total of  replies`;
*/

let replyCount = 21;
let message = `This topic has a total of ${replyCount} replies`;


/** ---------------------------------------------------------------------------
 * 3.8 Template Strings
 * ----------------------------------------------------------------------------
 * Refactor the code on the right to use string templates.
 * 
 * 1. Start by changing the title string to use a template string.
 * 
 * 2. Next, change author to be initialized with a template string.
 * 
 * 3. Finally, initialize body using a template string.
 */
/* 
function buildTopicElement(topic){
  let title = "<h2>" + topic.title + "</h2>";
  let author = "<small>" + topic.author + "</small>";
  let body = "<p>" + topic.body + "</p>";

  return { title, author, body };
}
*/

function buildTopicElement(topic) {
  let title = `<h2>${topic.title}</h2>`;
  let author = `<small>${topic.author}</small>`;
  let body = `<p>${topic.body}</p>`;

  return { title, author, body };
}
