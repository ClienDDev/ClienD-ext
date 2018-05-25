$(document).ready(function(){
    chrome.storage.local.get('vk_post_id', function(res){
        // если у нас есть пост с ВК для выполнения репоста на едутатар и мы авторизованы - делаем редирект на новости
        if (typeof res.vk_post_id !== 'undefined' && $('body').text().indexOf('Личный кабинет') !== -1)
            location.href = '/admin/page/news_block';
    });
});