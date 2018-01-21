/**----------------------------------------------------------------------------
 * 2.2 Fixing Undefined Arguments
 * ----------------------------------------------------------------------------
 * The function displayTopicsPreview() raises an error on the very first line 
 * when called with no arguments. Let's fix that!
 * 
 * 1. Set an empty array as the default value for the topics parameter.
 * 
 * 2. There's no reason why we should still use var, so let's replace 
 * that with let.
 */
/*
function displayTopicsPreview( topics ){
 var message = "There are currently " + topics.length;
 _displayPreviewMessage(topics, message);
}
*/

function displayTopicsPreview(topics = []) {
  let message = "There are currently " + topics.length;
  _displayPreviewMessage(topics, message);
}


/** ---------------------------------------------------------------------------
 * 2.3 Basic Named Parameters 
 * ----------------------------------------------------------------------------
 * Complete the setPageThread() function signature with the missing named 
 * parameters. You can check out the body of the function to help discover what 
 * options are expected.
 */
/*
function getUsersAvatars(userNames, cb){
 var url = "/userAvatars/";
 
 for(var index in userNames){
   _fetchAvatar(url + userNames[index], function(avatarUrl){
     _displayAvatar(userNames[index], avatarUrl);
   });
 }
}
*/

function setPageThread(name, { popular, expires, activeClass } = {}) {
  let nameElement = _buildNameElement(name);
  let settings = _parseSettings(popular, expires, activeClass);

  _updateThreadElement(nameElement, settings);
}


/** ---------------------------------------------------------------------------
 * 2.4 Replacing Object With Named Parameters 
 * ----------------------------------------------------------------------------
 * Let's refactor the loadProfiles() function to use named parameters with 
 * default values.
 * 
 * 1. First, in the function signature, replace the options argument with the 
 * named parameters profilesClass and reverseSort.
 * 
 * 2. Now in the function body, replace calls to the old options object with 
 * references to the newly declared variables. Keep the default values, but 
 * remember, we no longer need to declare option variables using let on the 
 * function body.
 * 
 * 3. Lastly, our function also needs to be able to be invoked with no second 
 * argument at all, like loadProfiles(users);. To make this possible, add a 
 * default value of an empty object to the second argument.
 */
/*
function loadProfiles(userNames = [], options = {}) {
  let profilesClass = options.profilesClass || ".user-profile";
  let reverseSort   = options.reverseSort   || false;

  if (reverseSort) {
    userNames = _reverse(userNames);
  }

  _loadProfilesToSideBar(userNames, profilesClass);
}
*/

function loadProfiles(userNames = [], { profilesClass, reverseSort } = {}) {
  profilesClass = profilesClass || ".user-profile";
  reverseSort = reverseSort || false;

  if (reverseSort) {
    userNames = _reverse(userNames);
  }

  _loadProfilesToSideBar(userNames, profilesClass);
}


/** ---------------------------------------------------------------------------
 * 2.8 Refactoring to Rest Params 
 * ----------------------------------------------------------------------------
 * Refactor the code on the right to use rest parameters instead of the 
 * arguments object.
 * 
 * 1. Add a rest parameter called userNames to the function signature.
 * 
 * 2. On the function body, replace all occurrences of the arguments object 
 * with userNames.
 */
/* 
function appendUserNames(  ){

  let userNameDivs  = "";
  let USER_CLASS    = ".forum-user";

  for(let i in arguments){
    let name = arguments[i];
    if(name !== "admin"){
      userNameDivs += "<div class='" + USER_CLASS + "'>" + name + "</div>";
    }
  }

  return userNameDivs;
}
*/

function appendUserNames(...userNames) {

  let userNameDivs = "";
  let USER_CLASS = ".forum-user";

  for (let i in userNames) {
    let name = userNames[i];
    if (name !== "admin") {
      userNameDivs += "<div class='" + USER_CLASS + "'>" + name + "</div>";
    }
  }

  return userNameDivs;
}


/** ---------------------------------------------------------------------------
 * 2.9 The Spread Operator
 * ----------------------------------------------------------------------------
 * In the call to getActiveUsers(), the 2nd argument is a callback. 
 * This callback, an anonymous function, has data as its parameter.
 * 
 * We can pass data.userNames as an argument to the appendUserNames() function. 
 * However, this property is an array while the appendUserNames() function 
 * expects individual arguments.
 * 
 * Change the call to appendUserNames() to use the syntax that will split the 
 * array into individual elements.
 */
/* 
getActiveUsers(15, function(data){   
  let userNameDivs = appendUserNames(  );
  appendToSidebar(".side-bar", userNameDivs);
});

function getActiveUsers(topicId, cb){
  _fetchTopicInfo("/topics/" + id, function(data){
    cb(data);
  });
}
*/

getActiveUsers(15, function (data) {
  let userNameDivs = appendUserNames(...data.userNames);
  appendToSidebar(".side-bar", userNameDivs);
});

function getActiveUsers(topicId, cb) {
  _fetchTopicInfo("/topics/" + id, function (data) {
    cb(data);
  });
}


/** ---------------------------------------------------------------------------
 * 2.11 Arrow Functions in Action 
 * ----------------------------------------------------------------------------
 * We've wrapped our previous functionality into a higher level component, but 
 * it's not yet fully functional. There's a scope bug we must fix before we can 
 * use our new component.
 * 
 * 1. Fix the scope issue for this.targetElement by changing the callback 
 * argument passed to getActiveUsers() to an arrow function instead of a 
 * regular function.
 * 
 * 2. Create a new instance of ActiveUsersComponent using the new keyword and 
 * assign it to a variable called component. Let's use the following values for 
 * the arguments: ".active-users" and 17. Remember to use the let keyword to 
 * declare the new variable.
 * 
 * 3. Now, let's call the render() method on the new instance of 
 * ActiveUsersComponent we created.
 */
/* 
function ActiveUsersComponent(target, topicId){
  this.targetElement = target;
  this.topicId       = topicId;
}

ActiveUsersComponent.prototype.render = function(){
  getActiveUsers(this.topicId, function(data){
    let userNameDivs = appendUserNames(...data.userNames);
    appendToSidebar(this.targetElement, userNameDivs);
  });
};
// Create new component below
*/

function ActiveUsersComponent(target, topicId) {
  this.targetElement = target;
  this.topicId = topicId;
}

ActiveUsersComponent.prototype.render = function () {
  getActiveUsers(this.topicId, (data) => {
    let userNameDivs = appendUserNames(...data.userNames);
    appendToSidebar(this.targetElement, userNameDivs);
  });
};
// Create new component below
let component = new ActiveUsersComponent('.active-users', 17);
component.render();

