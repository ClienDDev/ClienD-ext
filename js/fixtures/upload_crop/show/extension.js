/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */
$.noConflict();

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    
    return undefined;
}

(function(){
    $ = jQuery;
    $(document).ready(function(){
        //cliend_include_js(chrome.extension.getURL("js/libs/jquery.min.js"));
        //cliend_include_js(chrome.extension.getURL("js/fixtures/upload_crop/show/page.js"));
        
        var url = getUrlParameter('url');
        if (url) {
            $('')
            //alert(url)
        }
    });
})();