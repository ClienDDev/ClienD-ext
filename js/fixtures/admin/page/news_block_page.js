/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

$(document).ready(function(){
    chrome.storage.local.get('vk_post_id', function(res){
        if (typeof res.vk_post_id !== 'undefined') 
            location.href = $('#contentwrap a:eq(1)').attr('href');
    });
});