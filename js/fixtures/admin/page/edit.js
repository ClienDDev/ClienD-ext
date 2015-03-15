function cliend_update_page_edit_button() {
    if ($('#page_orig_id').val() != ''){
        $('#page_orig_id').after('<a href="#" id="page_edit_button">Отредактировать эту страницу</a>');
        $('#page_edit_button').click(function(){
            var w = window.open('https://edu.tatar.ru/admin/page/simple_page/edit/' + $('#page_orig_id').val());
            w.focus();
        });
    }
    else
        $('#page_edit_button').detach();
}

$(document).ready(function(){
    cliend_update_page_edit_button();
    
    $('#page_orig_id').change(function(){
        cliend_update_page_edit_button();
    });
});