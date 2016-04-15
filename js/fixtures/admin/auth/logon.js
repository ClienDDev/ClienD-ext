/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

$(document).ready(function(){
    cliend_include_style(chrome.extension.getURL("dist/css/cliend.css"));
    cliend_save_vk_post_id();
    $('#contentwrap').append('<div class="cliend"><a href="/" class="btn btn-primary">Войти на главной странице</a></div>');
});