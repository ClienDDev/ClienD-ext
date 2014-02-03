function styles_init() {
    console.log(document);
    if (document.location.hash.indexOf('cliend_debug') === 1) {
        $('head').append('<link rel="stylesheet" href="'+chrome.extension.getURL('/styles/sites.less')+'">');
        $('head').append('<script src="'+chrome.extension.getURL('/js/less.min.js')+'" />');
    }
    else{
        $('head').append('<link rel="stylesheet" href="'+chrome.extension.getURL('/styles/sites.min.css')+'">');
    }
}

$(document).ready(function(){
    console.log(document);
    styles_init(); 
});