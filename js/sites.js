cliend_ext = {}

cliend_ext.edutatar = {}

cliend_ext.edutatar.styles_init = function() {
    jQuery('head').append('<link rel="stylesheet" href="'+chrome.extension.getURL('/styles/fonts.css')+'">');
    if (document.location.hash.indexOf('cliend_debug') === 1) {
        jQuery('head').append('<link rel="stylesheet/less" href="'+chrome.extension.getURL('/styles/sites.less')+'">');
        jQuery('head').append('<script src="'+chrome.extension.getURL('/js/less.min.js')+'" />');
        jQuery('#cliend').css('display','block');
    }
    else{
        jQuery('head').append('<link rel="stylesheet" href="'+chrome.extension.getURL('/styles/sites.min.css')+'">');
    }
}

cliend_ext.edutatar.html_init = function(){
    jQuery('body').append('<div id="cliend">'+
                                '<div class="cliend_left">'+
                                    '<h1>ClienD</h1>'+
                                '</div>'+
                                '<div class="cliend_center>'+
                                '</div>'+
                                '<div class="cliend_right>'+
                                    ''
                                '</div>'+
                        '</div>');
}


jQuery(document).ready(function(){
    if (document.location.href.indexOf('edu.tatar.ru') > 1) {
        cliend_ext.edutatar.styles_init();
        cliend_ext.edutatar.html_init(); 
    }
    else if (document.location.href.indexOf('cliend.ru') > 1) {
        
    }
});