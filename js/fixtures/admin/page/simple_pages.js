$(document).ready(function(){
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
        $('#contentwrap table.table thead tr td:eq(0)').append('<input type="text" size="30" placeholder="Поиск" style="float:right">');
        $('#contentwrap table.table thead tr td:eq(0) input').fastLiveFilter('#contentwrap table.table tbody');
    });
})