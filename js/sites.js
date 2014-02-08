cliend_ext = {}

cliend_ext.edutatar = {}


/**
 * Инициализация стилей
*/
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


/**
 * Инициализация HTML шаблона
*/
cliend_ext.edutatar.html_init = function(){
    jQuery('body').append('<div id="cliend">'+
                                '<h1>ClienD</h1>'+
                                '<p class="cliend_message" id="cliend_message"></p>'+
                        '</div>');
}


/**
 * Изменение сообщения
 *
 * @param {string} text Текст сообщения
*/
cliend_ext.edutatar.msg = function(text){
    jQuery('#cliend_message').text(text);    
}


cliend_ext.edutatar.page = {}


/**
 * Инициализация функций на разных страницах
*/
cliend_ext.edutatar.page.init = function(){
    
}









jQuery(document).ready(function(){
    if (document.location.href.indexOf('edu.tatar.ru') > 1) {
        cliend_ext.edutatar.styles_init();
        cliend_ext.edutatar.html_init();
        cliend_ext.edutatar.msg('хорошей работы!');
    }
    else if (document.location.href.indexOf('cliend.ru') > 1) {
        
    }
});