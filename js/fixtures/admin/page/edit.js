function cliend_update_page_edit_button() {
    $('#page_edit_button').detach();

    if ($('#page_orig_id').val() != '')
        $('#page_orig_id').after('<a target="_blank" href="https://edu.tatar.ru/admin/page/simple_page/edit/' + $('#page_orig_id').val()+'" id="page_edit_button">Отредактировать эту страницу</a>');    
}

$(document).ready(function(){
    cliend_update_page_edit_button();
    
    $('#page_orig_id').change(function(){
        cliend_update_page_edit_button();
    });
});