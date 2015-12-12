/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */
jQuery.noConflict();
$$ = jQuery;
var path_to_img = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

jQuery(document).ready(function(){
    console.log('cliend extension loaded');

    $$('.e-journal td.mark').click(function(){
        $$('.e-journal td.mark').removeClass('focus');
        $$(this).addClass('focus');

        $$('body').one('keyup', function(e){
            var key = String(e.which)
                // оценки
                .replace(48, 0).replace(96, 0)
                .replace(49, 1).replace(97, 1)
                .replace(50, 2).replace(98, 2)
                .replace(51, 3).replace(99, 3)
                .replace(52, 4).replace(100, 4)
                .replace(53, 5).replace(101, 5)

                // отметки присутствия
                .replace(89, 'н')
                .replace(188, 'б');

            console.log('key', key, typeof Number(key) == 'number');

            if (typeof Number(key) == 'number' && !isNaN(key)) {
                key = Number(key);

                if(key == 0)
                    key = 5;
                else
                    key = key - 1;

                $$('#markSelector table tr td:eq(0) a:eq(' + (key) + ')').click();
            }
            else{
                console.log(000, key)
                if (key == 'н')
                    key = 0;
                if (key == 'б')
                    key = 1;
                console.log(key, $$('#markSelector table tr td:eq(1) a:eq('+key+')'))

                $$('#markSelector table tr td:eq(1) a:eq('+key+')').click();
            }
        });
    });

    $$('body').keyup(function(e){
        if($$('.e-journal td.mark.focus').length == 1){
            console.log(e.which);
            switch(e.which){
                case 37: // влево
                    break;
                case 38: // вверх
                    break;
                case 39: // вправо
                    break;
                case 40: // вниз
                    break;
            }
        }
    });

    jQuery('#markSelector table a').click(function(){
        window.cObj.update('<img src="'+path_to_img+'" style="margin: 0 auto;" title="Выставление оценки..." alt="Выставление оценки...">');
    });
});