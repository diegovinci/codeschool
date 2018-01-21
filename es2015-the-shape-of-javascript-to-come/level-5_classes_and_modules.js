/**----------------------------------------------------------------------------
 * 5.3 Implementing a Method on a Class
 * ----------------------------------------------------------------------------
 * The following TopicReplyCounter class has an addReply() method, which is 
 * unfinished. Follow the tasks to complete this method and finish writing this 
 * class.
 * 
 * 1. From inside the addReply() method, add the reply argument to the 
 * this.replies array. You can use the this.replies.push() method for that.
 * 
 * 2. Assign the total number of replies to the this.replyCount property. 
 * We can do that by calling this.totalReplies(), which returns an array of 
 * total replies not marked as abuse, and then reading the length property of 
 * that array.
 */
/*
class TopicReplyCounter {

 constructor(topicId, replies){
   this.topicId = topicId;
   this.replies = replies || [];
   this.replyCount = this.replies.length;
 }
 
 addReply(reply){
   
 
 }
 
 totalReplies(){
   return this.replies.filter( reply => !reply.isAbuse );
 }
 
 totalCount(){
   return this.replyCount;
 }
}

*/

class TopicReplyCounter {

  constructor(topicId, replies) {
    this.topicId = topicId;
    this.replies = replies || [];
    this.replyCount = this.replies.length;
  }

  addReply(reply) {
    this.replies.push(reply);
    this.replyCount = this.totalReplies().length;

  }

  totalReplies() {
    return this.replies.filter(reply => !reply.isAbuse);
  }

  totalCount() {
    return this.replyCount;
  }
}


/** ---------------------------------------------------------------------------
 * 5.4 From Function to Class 
 * ----------------------------------------------------------------------------
 * Let's rewrite TagManager from function to a class. You can see the function 
 * version on the tag-manager-function.js tab.
 * 
 * 1. Create a new class with the name TagManager.
 * 
 * 2. Create a constructor method for this class that takes 1 argument named 
 * topicId. From inside the method body, assign this argument to the 
 * this.topicId property of the class.
 * 
 * 3. Create an addTag() instance method that takes 1 argument named tagName. 
 * From the method body, call the API.createTag() method with 2 arguments: 
 * tagName and this.topicId.
 * 
 * 4. Finally, create a removeTag() instance method that takes 1 argument named 
 * tagName. From the method body, call the API.deleteTag() method with 2 
 * arguments: tagName and this.topicId.
 */
/*
//tag-manager-function.js
function TagManager(topicId){
 this.topicId = topicId;
}

TagManager.prototype.addTag = function(tagName){
 API.createTag(tagName, this.topicId);
};

TagManager.prototype.removeTag = function(tagName){
 API.deleteTag(tagName, this.topicId);
};

*/

class TagManager {
  constructor(topicId) {
    this.topicId = topicId;
  }

  addTag(tagName) {
    API.createTag(tagName, this.topicId);
  }

  removeTag(tagName) {
    API.deleteTag(tagName, this.topicId);
  }
}


/** ---------------------------------------------------------------------------
 * 5.5 Subclassing
 * ----------------------------------------------------------------------------
 * Our forum app currently has an Advertisement class that renders a generic 
 * widget for an ad (see the code on the advertisement-class.js tab). In order 
 * to accommodate a new type of advertisement, we need to change the way this 
 * code is rendered. The Advertisement class is being used by other pages on 
 * our app, so we want to avoid changing this class. Instead, we'll create a 
 * new class and inherit properties from the Advertisement class — also known 
 * as subclassing.
 * 
 * 1. Create a new class called SidebarAdvertisement and make sure this is a 
 * subclass of the Advertisement class.
 * 
 * 2. Inside the SidebarAdvertisement class, write a constructor() method that 
 * takes title and link as arguments.
 * 
 * 3. From inside the constructor, invoke the constructor method from the super 
 * class, passing in title and link.
 * 
 * 4. Finally, create a new _linkText() method on the SidebarAdvertisement 
 * class that returns the string "Sign up now!". This is how we can specialize 
 * behavior from a parent class on a child class — also known as overriding a
 *  method.
 */
/*
// advertisement-class.js
class Advertisement {

  constructor(title, link){
    this.title = title;
    this.link = link;
  }

  _buildContent(){
    return `<h1>${this.title}</h1>
      <a href="${this.link}">${this._linkText()}</a>`;
  }
  
  _linkText(){
    return "Click Here";
  }
  
  render(){
    return this._buildContent();
  }
}

// Here's an example of how this class is used:
/*
  let ad = new Advertisement("CodeSchool", "http://codeschool.com");
  _appendToPage( targetElement, ad.render() );
*/

class SidebarAdvertisement extends Advertisement {
  constructor(title, link) {
    super(title, link);
  }

  _linkText() {
    return "Sign up now!";
  }
}


/** ---------------------------------------------------------------------------
 * 5.10 Importing Modules 
 * ----------------------------------------------------------------------------
 * Follow the tasks to complete the code to the right for our app.js file.
 * 
 * 1. Import the isTopicValid module from the is-topic-valid file located at the 
 * same folder as app.js and assign its resulting function to the isTopicValid 
 * variable.
 * 
 * 2. Call the isTopicValid() function, passing the existing topic object as 
 * an argument.
 */
/* 

let topic = {
  title: "ES2015",
  author: { name: "Sam", isBlocked: false }
};
*/

import isTopicValid from './is-topic-valid';

let topic = {
  title: "ES2015",
  author: { name: "Sam", isBlocked: false }
};

isTopicValid(topic);


/** ---------------------------------------------------------------------------
 * 5.11 Named Exports
 * ----------------------------------------------------------------------------
 * Let's refactor the code on our validators module to be less repetitive.
 * 
 * 1. Create a single export statement that exports the 2 functions on this 
 * module.
 * 
 * 2. Remove the original export statements to avoid duplication.
 */
/* 
export function isTopicValid(topic){
  const MAX_TITLE_LENGTH = 20;

  let isValid = !(topic.title.length > MAX_TITLE_LENGTH || topic.author.isBlocked);
  return isValid;
}

export function isEmailAuthorized(email){
  const EMAIL_DOMAIN = "@codeschool.com";
  return email.indexOf(EMAIL_DOMAIN) > 0;
}
*/

function isTopicValid(topic) {
  const MAX_TITLE_LENGTH = 20;

  let isValid = !(topic.title.length > MAX_TITLE_LENGTH || topic.author.isBlocked);
  return isValid;
}

function isEmailAuthorized(email) {
  const EMAIL_DOMAIN = "@codeschool.com";
  return email.indexOf(EMAIL_DOMAIN) > 0;
}

export { isTopicValid, isEmailAuthorized };


/** ---------------------------------------------------------------------------
 * 5.12 Importing Named Exports 
 * ----------------------------------------------------------------------------
 * Complete the code to use named exports from the validators module.
 * 
 * 1. Import the isTopicValid() and isEmailAuthorized() functions from the 
 * ./validators and assign them to variables with the same name.
 * 
 * 2. Call isEmailAuthorized(), passing author.email as the argument.
 */
/* 

let author = { name: "Sam", email: "sam@codeschool.com", isBlocked: false };
let topic = {
  title: "ES2015",
  author
};

isTopicValid(topic);
*/

import { isTopicValid, isEmailAuthorized } from './validators';

let author = { name: "Sam", email: "sam@codeschool.com", isBlocked: false };
let topic = {
  title: "ES2015",
  author
};

isTopicValid(topic);
isEmailAuthorized(author.email);


/** ---------------------------------------------------------------------------
 * 5.14 Exporting Constants
 * ----------------------------------------------------------------------------
 * We've moved the constants used on the validators module over to their own 
 * module called validation-constants.
 * 
 * Using the single line export statement, export the 2 constants found on 
 * this module.
 */
/* 
const MAX_TITLE_LENGTH = 20;
const EMAIL_DOMAIN = "@codeschool.com";
*/

const MAX_TITLE_LENGTH = 20;
const EMAIL_DOMAIN = "@codeschool.com";

export { MAX_TITLE_LENGTH, EMAIL_DOMAIN };


/** ---------------------------------------------------------------------------
 * 5.16 Loading Classes From Modules
 * ----------------------------------------------------------------------------
 * Now let's load and use the TagManager class.
 * 
 * 1. First, import the TagManager class found on the tag-manager-class module.
 * 
 * 2. Create an instance of the TagManager class using the topic id of 20 as 
 * the argument for the constructor and assign the returning object to the 
 * variable tagManager.
 * 
 * 3. Call the addTag() method on the new object with the argument "JavaScript";
 */
/* 
// tag-manager-class.js
export default class TagManager {
  constructor(topicId){
    this.topicId = topicId;
  }
  
  addTag(tagName){
    API.createTag(tagName, this.topicId);
  }
  
  removeTag(tagName){
    API.deleteTag(tagName, this.topicId);
  }
}
*/

import TagManager from "./tag-manager-class";

let tagManager = new TagManager(20);
tagManager.addTag("JavaScript");


/** ---------------------------------------------------------------------------
 * 5.17 Export Subclasses
 * ----------------------------------------------------------------------------
 * Let's finish writing the sidebar-advertisement-class module below. We've 
 * written the code, but still need to make this class visible to the outside 
 * world.
 * 
 * Export the subclass SidebarAdvertisement using the one line export statement.
 */
/* 
// sidebar-advertisement-class.js
import { Advertisement } from "./advertisement-class";

class SidebarAdvertisement extends Advertisement {
  constructor(title, link){
    super(title, link);
  }
  
  _linkText(){
    return "Sign up now!";
  }
}
*/

import { Advertisement } from "./advertisement-class";

class SidebarAdvertisement extends Advertisement {
  constructor(title, link) {
    super(title, link);
  }

  _linkText() {
    return "Sign up now!";
  }
}

export { SidebarAdvertisement };

