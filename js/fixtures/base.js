function cliend_include_style(url){
    $.get(url, function(data){
        $('head').append('<style>'+data+'</style>');
    });
}