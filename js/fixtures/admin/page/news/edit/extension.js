// импорт из вк

function retrieveWindowVariables(variables) {
    var ret = {};

    var scriptContent = "";
    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        scriptContent += "if (typeof " + currVariable + " !== 'undefined') $('body').attr('tmp_" + currVariable + "', " + currVariable + ");\n"
    }

    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    (document.body || document.head || document.documentElement).appendChild(script);

    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i];
        ret[currVariable] = $("body").attr("tmp_" + currVariable);
        $("body").removeAttr("tmp_" + currVariable);
    }

    $("#tmpScript").remove();

    return ret;
}

$(document).ready(function(){
    if($('#content h2').text().trim() != 'Добавление новости')
        return false;
    
    cliend_include_js(chrome.extension.getURL("js/libs/jquery.min.js"));
    cliend_include_js(chrome.extension.getURL("js/fixtures/admin/page/news/edit/page.js"));
    cliend_include_js(chrome.extension.getURL("js/common/get_vk_post_id.js"));
    
    chrome.storage.local.get('vk_post_id', function(res){
        if (typeof res.vk_post_id !== 'undefined') {
            $('body').attr('data-vk_post_id', res.vk_post_id);
            
            chrome.storage.local.remove('vk_post_id');
        } 
    });
    
    
});