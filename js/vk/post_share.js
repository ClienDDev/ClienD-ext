/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */

(function(){
    $ = jQuery;
    
    $(document).ready(function () {
        $('div.post_share').click(function(){
            var post_href;

            if(location.href.indexOf('new.vk.com') !== -1)
                post_href = $(this).closest('.post.page_block').find('.post_header .post_date a.post_link').attr('href');
            else
                post_href = $(this).closest('.post_info').find('.replies small a').attr('href');

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
    })
})();
