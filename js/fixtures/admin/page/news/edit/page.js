function php_trim(str, charlist) {
    //  discuss at: http://phpjs.org/functions/trim/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: mdsjack (http://www.mdsjack.bo.it)
    // improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // improved by: Jack
    //    input by: Erkekjetter
    //    input by: DxGx
    // bugfixed by: Onno Marsman
    //   example 1: trim('    Kevin van Zonneveld    ');
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: trim('Hello World', 'Hdle');
    //   returns 2: 'o Wor'
    //   example 3: trim(16, 1);
    //   returns 3: 6
  
    var whitespace, l = 0,
      i = 0;
    str += '';
  
    if (!charlist) {
      // default list
      whitespace =
        ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    } else {
      // preg_quote custom list
      charlist += '';
      whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    }
  
    l = str.length;
    for (i = 0; i < l; i++) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(i);
        break;
      }
    }
  
    l = str.length;
    for (i = l - 1; i >= 0; i--) {
      if (whitespace.indexOf(str.charAt(i)) === -1) {
        str = str.substring(0, i + 1);
        break;
      }
    }
  
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}


function vk_post(post_id){
    $.ajax({
        url: "https://api.vk.com/method/wall.getById?" + $.param({posts: post_id}),
        jsonp: "callback",
        dataType: "jsonp",
        success: function(res) {
            if (!res.response) {
                alert('Ошибка запроса ВК');
                return false;
            }
            
            var full_text = $.trim(res.response[0].text);
            console.log(full_text);
            full_text = full_text
                .replace((/\B#[a-zA-Z0-9]+/ig), '').replace((/\B@[a-zA-Z0-9+_-]+/ig), '') // хештеги
                .replace(/(\[(id[0-9]+)\|([A-Za-z_!А-ЯЁа-яё\s]+)\])/ig, '$3'); 
            console.log(full_text);
            
            var full_text_arr = full_text.split('<br>')
            var name = full_text_arr[0];
            delete full_text_arr[0];
            
            var text = full_text_arr.join('<br>');
            text = text.replace('<br><br><br>', '<br><br>').replace('___<br>', '');
            text = php_trim(text,"<br>")
            text = php_trim(text, "<br><br>");
            
            console.log(text);
            
            $('#news_title').val(name);
            CKEDITOR.instances.news_lead.setData(text);
            CKEDITOR.instances.news_text.setData(text);
            
            // обработка фотографии
            if (res.response[0].attachment.type == 'photo') {
                var photo_url = res.response[0].attachment.photo.src_xbig;
                prompt('Это ссылка на фотографию.\nПри загрузке фотографии Вы можете вставить ее в системное окно Windows.', photo_url);
                $('#contentwrap p a').click();
            }
            
            return true;
        },
        error: function(xhr, status){
            alert("Не удалось подключиться в vk.com. Возможно, нету доступа к серверам социальной сети\n(" + status + ")");
        }
    });
}

$(document).ready(function(){
    $('#content h2').after('<button id="cliend_vk_post_import">Добавить пост из ВКонтакте</button>');
    var vk_post_id = $('body').data('vk_post_id');
    
    if (typeof vk_post_id !== 'undefined') 
        vk_post(vk_post_id);
    
    $('#cliend_vk_post_import').click(function(){
        var url = prompt('Введите URL поста ВКонтакте');
        
        if (url == '' && url == null) {
            alert('Не введен URL поста');
            return false;
        }
            
        var post_id = cliend_get_vk_post_id_from_url(url);
        
        if (post_id === false) {
            alert('Ошибка при разборе адреса. Возможно URL неправильный');
            return false;
        }
        
        vk_post(post_id);
    });
    
})