function cliend_include_style(url){
	// простое подключение в head не работает почему-то
	$.get(url, function(res){
		$('head').append('<style>'+res+'</style>');
	})
}

function cliend_include_js(url) {
    $('head').append('<script src="'+url+'"></script>');
}