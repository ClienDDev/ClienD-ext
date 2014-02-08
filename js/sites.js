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
        jQuery('head').append('<link rel="stylesheet" href="'+chrome.extension.getURL('/styles/sites.css')+'">');
    }
}


/**
 * Инициализация HTML шаблона
*/
cliend_ext.edutatar.html_init = function(){
    jQuery('body').append('<div id="cliend">'+
                            '<div id="cliend_container">'+
                                '<h1><a href="http://cliend.ru" target="_blank">ClienD</a></h1>'+
                                '<p class="cliend_message" id="cliend_message"></p>'+
                            '</div>'+
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


/**
 * Проверка авторизации
 *
 * @param {function} callback Callback функция
*/
cliend_ext.edutatar.check_auth = function(callback){
    $.ajax({ 
        type: 'GET',
        url: "/",
        success: function(msg, status, response){
            if (response.status == 200) { // если авторизация успешна
                callback(true); // возвращаем true
            }
            else{ 
                callback(false); // иначе - false
            }
        }
    });         
}


cliend_ext.edutatar.fixes = {} // фиксы


cliend_ext.edutatar.fixes.init = function(){
    var url = document.location.href;
    
    // Web auth redirect
    if( 
        (url.indexOf('switch_url=https://wifiauth.tatar.ru/login.html') !== -1) ||
        (url.indexOf('switch_url=http://wifiauth.tatar.ru/login.html') !== -1)
    ){
        cliend_ext.edutatar.fixes.web_auth_redir();
    }
}


/**
 * Web auth redirect
*/
cliend_ext.edutatar.fixes.web_auth_redir = function(){
    cliend_ext.edutatar.msg('Исправление ошибки входа. Пожалуйста подождите...'); 
    cliend_ext.edutatar.check_auth(function(status){
        if (status === true) { // если авторизация успешна
            document.location.href = '/'; // на страницу профиля
        }
        else{
            document.location.href = '/logon'; // иначе на страницу входа
        }
    });
}







jQuery(document).ready(function(){
    if (document.location.href.indexOf('edu.tatar.ru') > 1) {
        cliend_ext.edutatar.styles_init();
        cliend_ext.edutatar.html_init();
        cliend_ext.edutatar.msg('хорошей работы!');
        cliend_ext.edutatar.fixes.init();
    }
    else if (document.location.href.indexOf('cliend.ru') > 1) {
        
    }
});