(function($){
	$(document).ready(function(){
	    cliend_save_vk_post_id();	
	    if ($('body').html().indexOf('Not Found') !== -1)
	    	location.href = '/';
	});	
})(jQuery)
