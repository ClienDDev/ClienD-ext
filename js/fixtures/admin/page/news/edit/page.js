(function($) {
    const EOL = '\n';

    function vk_post(post_id) {
        $.ajax({
            url: "https://api.vk.com/method/wall.getById?" + $.param({
                posts: post_id,
                v: 5.73
            }),
            jsonp: "callback",
            dataType: "jsonp",
            success: function(res) {
                console.log(res);
                if (!res.response) {
                    alert('Ошибка запроса ВК');
                    return false;
                }

                let full_text = res.response[0].text
                    .trim()
                    .replace((/\B#[a-zA-Z0-9]+/ig), '').replace((/\B@[a-zA-Z0-9+_-]+/ig), '') // хештеги
                    .replace(/(\[(id[0-9]+)\|([A-Za-z_!А-ЯЁа-яё\s]+)\])/ig, '$3') // ссылки на людей
                    .replace(/(\[(club[0-9]+)\|([A-Za-z_!А-ЯЁа-яё\s]+)\])/ig, '$3'); // ссылки на группы

                $('#news_source').val('http://vk.com/wall' + res.response[0].from_id + '_' + res.response[0].id);

                let full_text_arr = full_text.split(EOL);
                console.log('text array', full_text_arr);

                let name = full_text_arr[0]; // вытаскиванием название новости (первая строчка из текста ВК)
                delete full_text_arr[0];

                console.log('name', name);

                let text = full_text_arr
                    .join(EOL) // собираем остальной текст поста
                    .replace(EOL + EOL, EOL) // заменяем два переноса на один
                    .trim() // убираем лишнее
                    .replace(new RegExp(EOL, 'g'), '<br>'); // заменяем разделитель строки на перенос из HTML

                console.log('final text', text);

                $('#news_title').val(name);
                
                let textInterval = setInterval(() => {
                    if (typeof CKEDITOR.instances.news_lead !== 'undefined' && typeof CKEDITOR.instances.news_text !== 'undefined') {
                        clearInterval(textInterval);
                        CKEDITOR.instances.news_lead.setData(text);
                        CKEDITOR.instances.news_text.setData(text);
                    }
                }, 100);

                const attachments = res.response[0].attachments.filter(x => x.type === 'photo');
                if (attachments.length === 0) {
                    console.error('Нет приложенных фотографий к этому посту');
                    return;
                }

                const attachment = attachments[0];
                const allSizes = Object.keys(attachment.photo) // берем все параметры объефото
                    .filter(x => x.indexOf('photo_') !== -1) // выбираем всевозможные размеры фото
                    .map(x => parseInt(x.replace('photo_', ''))) // получаем их числовые значения
                    .sort(); // сортируем

                const size = allSizes[0]; // берем максимальный размер

                const photo_url = attachment.photo['photo_' + size]; // достаем ссылку

                if (typeof photo_url !== 'undefined') {
                    // открываем диалог вставки фотографии только если пользователь нажал на ОК (Enter)
                    if (prompt('Это ссылка на фотографию.\nПри загрузке фотографии Вы можете вставить ее в системное окно Windows.', photo_url))
                        $('#contentwrap p a').click();
                }

                return true;
            },
            error: function(xhr, status) {
                alert("Не удалось подключиться в vk.com. Возможно, нету доступа к серверам социальной сети\n(" + status + ")");
            }
        });
    }

    $(document).ready(function() {
        $('#content h2').before(
            '<div class="cliend ptop pbottom">' +
                '<button id="cliend_vk_post_import" class="btn btn-primary pull-right">' +
                    'Добавить пост из ВКонтакте' +
                '</button>' +
            '</div>'
        );

        let vk_post_id = $('body').data('vk_post_id');

        if (typeof vk_post_id !== 'undefined')
            vk_post(vk_post_id);

        $('#cliend_vk_post_import').click(function() {
            let url = prompt('Введите URL поста ВКонтакте');

            if (url === '' || url === null) {
                alert('Не введен URL поста');
                return false;
            }

            let post_id = cliend_get_vk_post_id_from_url(url);

            if (post_id === false) {
                alert('Ошибка при разборе адреса. Возможно URL неправильный');
                return false;
            }

            vk_post(post_id);
        });

        // Выделение галочек "Район" и "Республика"
        $('#news_trans_region, #news_trans_global').click();
    })
})(jQuery);
