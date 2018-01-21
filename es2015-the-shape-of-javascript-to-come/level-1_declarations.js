/**----------------------------------------------------------------------------
 * 1.2 Refactoring to let
 * ----------------------------------------------------------------------------
 * Refactor the current code to use the new let keyword.
 * 
 * 1. Let's start by replacing the message declaration with a let statement.
 * 
 * 2. Now replace the profiles declaration with a let statement.
 */
/*
function loadProfiles(userNames){
 var message = "Loading " + userNames.length + " user(s)";

 _displayFlash(message);

 _fetchProfiles(userNames, function(data){
   var profiles = data.profiles;
   _addToPage(profiles);
 });
}
*/

function loadProfiles(userNames) {
  let message = "Loading " + userNames.length + " user(s)";

  _displayFlash(message);

  _fetchProfiles(userNames, function (data) {
    let profiles = data.profiles;
    _addToPage(profiles);
  });
}


/** ---------------------------------------------------------------------------
 * 1.5 Vars and the for Loop
 * ----------------------------------------------------------------------------
 * We thought we were done with our code, but this weird bug showed up. Looks 
 * like the _displayAvatar() function is receiving the wrong first argument — 
 * it keeps receiving the last element in userNames. Let’s fix that.
 * 
 * 1. The bug is in the index variable declaration in our for loop. Fix it by 
 * replacing var with let.
 * 
 * 2. Now let’s change the url variable declaration to use let. It makes our 
 * code more consistent and there’s no reason to keep using var.
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

function getUsersAvatars(userNames, cb) {
  let url = "/userAvatars/";

  for (let index in userNames) {
    _fetchAvatar(url + userNames[index], function (avatarUrl) {
      _displayAvatar(userNames[index], avatarUrl);
    });
  }
}


/** ---------------------------------------------------------------------------
 * 1.10 Refactoring Magic Number 
 * ----------------------------------------------------------------------------
 * Let's refactor the code on the right and make it more expressive.
 * 
 * 1. Create a const named MAX_MESSAGE_LENGTH and assign 140 to it.
 * 
 * 2. Now replace the magic number in the conditional with the newly created const.
 */
/*
function validateMessage(author, message){
  
  if(message.length > 140){
    message = _trimMessage(message);
  }

  _postMessage(author, message);
}
*/

function validateMessage(author, message) {
  const MAX_MESSAGE_LENGTH = 140;
  if (message.length > MAX_MESSAGE_LENGTH) {
    message = _trimMessage(message);
  }

  _postMessage(author, message);
}


/** ---------------------------------------------------------------------------
 * 1.11 Fix const Error
 * ----------------------------------------------------------------------------
 * Fix the syntax error on the following code.
 */
/* 
function loadProfiles(userNames){

  const MAX_USERS;
  MAX_USERS = 15;

  if(userNames.length > MAX_USERS){
  	return false;
  }
  
  for(let i=0; i < userNames.length; i++){
  	_fetchProfile(userNames[i], function(data){
    	_addToSidebar(userNames[i], data);
    });
  }
}
*/

function loadProfiles(userNames) {

  const MAX_USERS = 15;

  if (userNames.length > MAX_USERS) {
    return false;
  }

  for (let i = 0; i < userNames.length; i++) {
    _fetchProfile(userNames[i], function (data) {
      _addToSidebar(userNames[i], data);
    });
  }
}
