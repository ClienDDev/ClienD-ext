/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

$(document).ready(function(){
    cliend_include_js(chrome.extension.getURL("libs/jquery/dist/jquery.min.js"));
    cliend_include_js(chrome.extension.getURL("js/fixtures/school/journal/index/page.js"));
    cliend_include_style(chrome.extension.getURL("styles/fixtures/school/journal.css"));
});