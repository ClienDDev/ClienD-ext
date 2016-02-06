$(document).ready(function(){
    if (location.hash !== '') {
        var post_id = location.hash.replace('#vk_post_id=', '');
        chrome.storage.local.set({'vk_post_id': post_id});
    }
});