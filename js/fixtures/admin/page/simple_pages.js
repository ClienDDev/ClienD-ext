$(document).ready(function(){
    if (document.location.search.indexOf('page') !== -1) {
        document.location.href = 'https://edu.tatar.ru/admin/page/simple_page';
        return false;
    }
    
    // переводим TD в TH для нормальной работы DataTables
    $('table thead tr td').each(function(){
        var thisTD = this;
        var newElement = $("<th></th>");
        $.each(this.attributes, function(index) {
          $(newElement).attr(thisTD.attributes[index].name, thisTD.attributes[index].value);
        });
        $(newElement).html($(thisTD).html());
        $(newElement).css('background-color', '#EEEEEE');
        $(this).after(newElement).remove();
    });
    
    cliend_include_style(chrome.extension.getURL("dist/css/jquery.dataTables.css"));
    cliend_include_style(chrome.extension.getURL("styles/fixtures/admin/page/simple_pages.css"));
    
    var functions = [];
    var pages = {};
    
    $('#contentwrap .pages a').each(function(){
        (function(self){
            functions.push(function(callback){
                var href = $(self).attr('href');
                var num = $(self).text();
                
                $.get(href, function(data){
                    pages[num] = data;
                    callback();
                });
            });
        })(this);
    });
    
    async.parallel(functions, function(){
        for(var key in pages){
            var html = jQuery(pages[key]).find('tbody').html();
            $('#contentwrap table.table tbody').append(html);
        }
        $('#contentwrap .pages').hide();
        $('#contentwrap .pages:eq(0)').after('<input type="text" id="table_search" placeholder="Поиск по страницам">');
        $('#table_search').fastLiveFilter('#contentwrap table.table tbody');
        
        // сортировка таблицы
        $('table.table').DataTable({
            searching: false, // убрали поиск
            aaSorting: [], // убрали сортировку сразу после загрузки
            language: {
                url: chrome.extension.getURL("js/libs/datatables_russian.json")
            },
            paging:false
        });
    });
    
    return true;
})