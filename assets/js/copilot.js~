
loginWithEvernote: function() {
options = {
consumerKey: app.consumerKey,
consumerSecret: app.consumerSecret,
callbackUrl : "gotOAuth.html", // this filename doesn't matter in this example
signatureMethod : "HMAC-SHA1",
};
oauth = OAuth(options);
// OAuth Step 1: Get request token
oauth.request({'method': 'GET', 'url': app.evernoteHostName + '/oauth', 'success': app.success, 'failure': app.failure});
},





say("I am CO-Pilot your personal assistant with your personal ever note lists");

function cp_loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

function NULL_function () {};

function continue_cop() {
    say("I am working just fine");
}

loadScript("jsOAuth-1.3.6.min.js", NULL_function);
loadScript("evernote-sdk-minified", continue_cop );