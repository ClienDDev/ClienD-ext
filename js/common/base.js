function cliend_include_style(url){
	// простое подключение в head не работает почему-то
	$.get(url, function(res){
		$('head').append('<style>'+res+'</style>');
	})
}

function cliend_include_js(url) {
    $('head').append('<script src="'+url+'"></script>');
}

function cliend_save_vk_post_id(){
	if (location.hash !== '') {
        var post_id = location.hash.replace('#vk_post_id=', '');
        chrome.storage.local.set({'vk_post_id': post_id});
    }
}