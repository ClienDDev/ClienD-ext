function cliend_include_style(url){
    var link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

function cliend_include_js(url) {
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script); //or something of the like
}

function cliend_save_vk_post_id(){
	  if (location.hash !== '') {
        var post_id = location.hash.replace('#vk_post_id=', '');
        chrome.storage.local.set({'vk_post_id': post_id});
    }
}

function cliend_scroll_to_main(){
	var $$ = jQuery;
	if($$(window).scrollTop() == 0){
        var block;
        
        if($$('.filter').length == 1)
            block = $$('.filter')
        else if($$('.r_block .h').length == 1)
            block = $$('.r_block .h')

        $$('body').animate({scrollTop: block.offset().top}, 1);
    }
}