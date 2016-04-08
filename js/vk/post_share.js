/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

(function(){
	$ = jQuery;

	function start(){
		$('div.post_share, a.reply_link').unbind('click').click(function(){
			console.log('cliend: click')
			
			var post_href;

			if(location.href.indexOf('new.vk.com') !== -1) // для нового интерфейса вк
				post_href = $(this).closest('.post.page_block').find('.post_header .post_date a.post_link').attr('href');
			if(location.href.indexOf('vk.com/wall') !== -1) // для страницы записи (пример: https://vk.com/wall-413099_1965)
				post_href = location.href;
			else // для остальных случаев (стена группы)
				post_href = $(this).closest('.post_info').find('.replies small a').attr('href');
			
			console.log(post_href);
			var post_id = cliend_get_vk_post_id_from_url(post_href);
			console.log(post_id);
			
			var interval = setInterval(function(){
				var $container = $('.like_share_cont:visible')
				if($container.length == 1){
					clearInterval(interval);
					
					$container.find('#like_share_send').after($('#cliend_share').html());
					
					$container.find('#cliend_share_button').click(function(){
						window.open('https://edu.tatar.ru/admin/page/news_block#vk_post_id=' + post_id);
						$('#box_layer').click(); // закрываем окно
					});
				}
			}, 100);    
		});
	}
	
	$(document).ready(function(){
		start();
		setInterval(function(){
			start();
		}, 1000)
	});
})();
