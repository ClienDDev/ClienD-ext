// импорт из вк
$(document).ready(function(){
    if($('#content h2').text().trim() != 'Добавление новости')
        return false;
    
    cliend_include_js(chrome.extension.getURL("js/libs/jquery.min.js"));
    cliend_include_js(chrome.extension.getURL("js/fixtures/admin/page/news/edit/page.js"));
    
    return true;
});