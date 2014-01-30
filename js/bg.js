var cliend = {}

cliend.store = {}



/*chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
});*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    console.log('message: ', request);
});