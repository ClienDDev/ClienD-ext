function cliend_include_style(url){
    $.get(url, function(data){
        $('head').append('<style>'+data+'</style>');
    });
}

function cliend_include_js(url) {
    $('head').append('<script src="'+url+'"></script>');
}