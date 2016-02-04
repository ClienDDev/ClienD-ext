/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */


function cliend_get_vk_post_id_from_url(url) {
    url = url
        .replace('https://', '')
        .replace('http://', '')
        .replace('vk.com/', '')
        .replace('vk.com/', '');
    
    if (url.length === 0 || url.indexOf('wall') === -1) 
        return false;
    
    var wall_position = url.indexOf('wall');
    
    url = url
        .substring(wall_position)
        .replace('?', '')
        .replace('#', '')
        .replace('.', '')
        .replace('!', '')
        .replace('<', '')
        .replace('>', '');
    
    return url.replace('wall', '');
}