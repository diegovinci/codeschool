/**----------------------------------------------------------------------------
 * 6.3 Writing Promises
 * ----------------------------------------------------------------------------
 * A new function called getReplies() is currently incomplete and it needs our 
 * help. Here's an example of how it can be used once it's complete:
 * 
 * import getReplies from "./get-replies";
 * 
 * let topicId = 27;
 * let getReplies = getReplies(topicId);
 * getReplies.then(function(replies){
 *   console.log( replies );
 * });
 * 
 * Follow the tasks in order to finish implementing this function.
 * 
 * 1. Add the missing arguments for resolving and rejecting to the callback 
 * function that is passed to the Promises constructor function.
 * 
 * 2. Inside the callback passed to the _getRepliesForTopic() function, there's a 
 * conditional check for the presence of replies. If there are any replies and 
 * the conditional evaluates to true, then call the resolve() handler passing 
 * the replies as argument.
 * 
 * 3. Otherwise, if there are no replies and the conditional evaluates to false, 
 * then call the reject() handler passing the error object as argument.
 */
/*
export default function getReplies(topicId){
 return new Promise(function(  ){
   _getRepliesForTopic(topicId, function(data){
     let replies = data.replies;
     if(replies){
       
     }else{
       let error = new Error("An error occurred");
       
     }
   });
 });
}
*/

export default function getReplies(topicId) {
  return new Promise(function (resolve, reject) {
    _getRepliesForTopic(topicId, function (data) {
      let replies = data.replies;
      if (replies) {
        resolve(replies);
      } else {
        let error = new Error("An error occurred");
        reject(error);
      }
    });
  });
}


/** ---------------------------------------------------------------------------
 * 6.4 Catching Errors From Promises 
 * ----------------------------------------------------------------------------
 * We've refactored our code and extended the functionality to filter out 
 * replies marked as abuse. However, any errors that occur during the execution 
 * of our Promise will break our code. Let's fix that.
 * 
 * 1. At the end of the chain, add a call to the catch() method. This method 
 * call takes a callback with 1 argument, the error.
 * 
 * 2. From inside the callback, log the error to the console using console.log().
 */
/*
//filter-replies.js
getReplies(1)
.then(function(replies){
 return replies.filter( reply => !reply.isAbuse );
})
.then(function(filteredReplies){
 console.log( filteredReplies );
})
;
*/

getReplies(1)
  .then(function (replies) {
    return replies.filter(reply => !reply.isAbuse);
  })
  .then(function (filteredReplies) {
    console.log(filteredReplies);
  })
  .catch(function (error) {
    console.log(error);
  });


/** ---------------------------------------------------------------------------
 * 6.8 Writing a Custom Iterator Object
 * ----------------------------------------------------------------------------
 * Complete the following code so user becomes an iterable object.
 * 
 * Finish the next() function so that it returns an object with done and value 
 * properties, both assigned to their proper values. 
 * 
 * Let's try and do this using the new object initializer shorthand where possible.
 */
/*
// user.js
let user = {
  name: "sam", totalReplies: 17, isBlocked: false
};

user[Symbol.iterator] = function(){

  let properties = Object.keys(this);
  let count = 0;
  let isDone = false;

  let next = () => {
    if(count >= properties.length){
      isDone = true;
    }

    let value = this[properties[count++]];

    return  ;
  };
  return { next };
};
*/

let user = {
  name: "sam", totalReplies: 17, isBlocked: false
};

user[Symbol.iterator] = function () {

  let properties = Object.keys(this);
  let count = 0;
  let isDone = false;

  let next = () => {
    if (count >= properties.length) {
      isDone = true;
    }

    let value = this[properties[count++]];

    return { done: isDone, value };
  };
  return { next };
};


/** ---------------------------------------------------------------------------
 * 6.11 Generators and for...of 
 * ----------------------------------------------------------------------------
 * Call the topicList() generator function from the for...of loop and assign 
 * its result to a loop variable called topic so that it produces the following 
 * output:
 * 
 * ES2015
 * Semi-colons: good or bad?
 * TypeScript
 */
/* 
// listing-topics.js
function *topicList(){
  yield "ES2015";
  yield "Semi-colons: good or bad?";
  yield "TypeScript";
}

for(  ){
  console.log( topic );
}
*/

function* topicList() {
  yield "ES2015";
  yield "Semi-colons: good or bad?";
  yield "TypeScript";
}

for (let topic of topicList()) {
  console.log(topic);
}


/** ---------------------------------------------------------------------------
 * 6.13 Refactoring to Generator Functions 
 * ----------------------------------------------------------------------------
 * Let's finish converting our custom iterator object to use a generator function.
 * 
 * 1. Add a special character to the function signature for the Symbol.iterator 
 * in order to make it a generator function.
 * 
 * 2. Inside the for… of loop, add the missing keyword that generates the next 
 * iterator object with its value property set to this[p].
 */
/* 
user.js
let user = {
  name: "sam", totalReplies: 17, isBlocked: false
};

user[Symbol.iterator] = function  (){

  let properties = Object.keys(this);
  let count = 0;
  let isDone = false;

  for(let p of properties){
    this[p];
  }
};

for(let p of user){
  console.log( p );
}
*/

let user = {
  name: "sam", totalReplies: 17, isBlocked: false
};

user[Symbol.iterator] = function* () {

  let properties = Object.keys(this);
  let count = 0;
  let isDone = false;

  for (let p of properties) {
    yield this[p];
  }
};

for (let p of user) {
  console.log(p);
}