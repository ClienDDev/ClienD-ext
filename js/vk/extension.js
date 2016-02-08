/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

$(document).ready(function(){
    cliend_include_js(chrome.extension.getURL("libs/jquery/dist/jquery.min.js"));
    cliend_include_js(chrome.extension.getURL("js/common/get_vk_post_id.js"));
    cliend_include_js(chrome.extension.getURL("js/vk/post_share.js"));
    $.get(chrome.extension.getURL("js/vk/template.html"), function(res){
        $('head').append('<script type="text/x-template" id="cliend_share">'+res+'</script>');
    });
});