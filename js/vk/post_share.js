/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

// Anonymous "self-invoking" function
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://yastatic.net/jquery/3.1.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        
        function start(){
			$('a.like_btn.share').unbind('click').click(function(){
				console.log('cliend: click');
				
				var post_href;

				// if(location.href.indexOf('new.vk.com') !== -1) // для нового интерфейса вк
				if(location.href.indexOf('vk.com/wall') !== -1) // для страницы записи (пример: https://vk.com/wall-413099_1965)
					post_href = location.href;
				else // для остальных случаев (стена группы)
					post_href = $(this).closest('.post').find('.post_header .post_date a.post_link').attr('href');
					// post_href = $(this).closest('.post_info').find('.replies small a').attr('href');
				
				console.log(post_href);
				var post_id = cliend_get_vk_post_id_from_url(post_href);
				console.log(post_id);
				
				var interval = setInterval(function(){
					var $container = $('.like_share_cont:visible')
					if($container.length == 1){
						clearInterval(interval);
						
						$('#like_share_send:visible').after($('#cliend_share').html());
						
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
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();
