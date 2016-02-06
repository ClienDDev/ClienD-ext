function cliend_update_page_edit_button() {
    $('#page_edit_button').detach();

    if ($('#page_orig_id').val() != '')
        $('#page_orig_id').after('<div id="page_edit_button" class="cliend ptop">'+
            '<a target="_blank" href="https://edu.tatar.ru/admin/page/simple_page/edit/' + $('#page_orig_id').val()+'" class="btn btn-primary btn-sm">Отредактировать эту страницу</a>'+
        '</div>');    
}

$(document).ready(function(){
    cliend_include_style(chrome.extension.getURL("dist/css/cliend.css"));
    cliend_update_page_edit_button();
    
    $('#page_orig_id').change(function(){
        cliend_update_page_edit_button();
    });
});