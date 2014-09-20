/**
* Copyright 2012 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');
var gmail = google.gmail('v1');
var calendar = google.calendar('v3');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '355519514095-949tc7eo0mh4h0prdn438uus0es0cbjb.apps.googleusercontent.com';
var CLIENT_SECRET = '_HDmyUx7uw7Ku1Zvi8dr-C7e';
var REDIRECT_URL = 'http://localhost:3000/oauth2callback';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

function getAccessToken(oauth2Client,code){//, callback) {
// generate consent page url
var url = oauth2Client.generateAuthUrl({
access_type: 'offline', // will return a refresh token
scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar' // can be a space-delimited string or an array of scopes
});

oauth2Client.getToken(code, function(err, tokens) {
  // Now tokens contains an access_token and an optional refresh_token. Save them.
  if(!err) {
    oauth2Client.setCredentials(tokens);
  }
});

exports.a=oauth2Client;
exports.b=plus;
exports.c=gmail;

exports.url = url;

// request access token
oauth2Client.getToken(code, function(err, tokens) {
// set tokens to the client
// TODO: tokens should be set by OAuth2 client.

plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
if (err) {
console.log('An error occured', err);
return;
}
console.log(profile.displayName, ':', profile.tagline);
});
//callback();
});
}

// retrieve an access token
getAccessToken(oauth2Client, function() {
// retrieve user profile
plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
if (err) {
console.log('An error occured', err);
return;
}
console.log(profile.displayName, ':', profile.tagline);
});
});