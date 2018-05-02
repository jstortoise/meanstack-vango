// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
      'clientID'        : '159571971402738', // your App ID
      'clientSecret'    : '80ef716066be5ca30a1398e432bf7c98', // your App Secret
      'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
      'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

  },

  'twitterAuth' : {
      'consumerKey'        : 'your-consumer-key-here',
      'consumerSecret'     : 'your-client-secret-here',
      'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth' : {
      'clientID'         : 'your-secret-clientID-here',
      'clientSecret'     : 'your-client-secret-here',
      'callbackURL'      : 'http://localhost:8080/auth/google/callback'
  }

};
