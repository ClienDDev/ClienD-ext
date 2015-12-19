/**
 * Created by ClienDDev team (clienddev.ru)
 * Developer: Artur Atnagulov (atnartur)
 */
jQuery.noConflict();

$$ = jQuery;
var path_to_img = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
var ajax_status = false;


$$(document).ready(function(){
    $body = $$('html, body');

    if($$(window).scrollTop() == 0)
        $body.animate({scrollTop: $$('.filter').offset().top}, 500);

    console.log('cliend extension loaded');

    $$('body').on('keyup', function (e) {

    });

    $$('.e-journal td.mark').click(function(){
        if(ajax_status == false) {
            $$('.e-journal td.mark').removeClass('focus');
            $$(this).addClass('focus');


        }
    });



    $$('body').keydown(function(e){
        w = e.which;
        if($$('.e-journal td.mark.focus').length == 1 && ajax_status == false) {

            // навигация
            if (w >= 37 && w <= 40) {
                console.log(1111, w)
                var td = $$('.e-journal td.mark.focus');
                console.log(w, td);
                switch (w) {
                    case 37: // влево
                        td = td.prev();
                        break;
                    case 38: // вверх
                        td = td.closest('tr').prev().find('td:eq(' + td.index() + ')');
                        break;
                    case 39: // вправо
                        td = td.next();
                        break;
                    case 40: // вниз
                        td = td.closest('tr').next().find('td:eq(' + td.index() + ')');
                        break;
                }

                if (td.hasClass('mark')) {
                    closeMark();
                    $$('.e-journal td.mark').removeClass('focus');
                    $body.stop().animate({scrollTop: td.offset().top - 50}, 200);
                    td.addClass('focus').click();
                    e.preventDefault();
                }
            }

            // выставление оценок
            if((w >= 48 && w <= 53) || (w >= 96 && w <= 101) || w == 89 || w == 188) {
                console.log(e.which);
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

                    if (key == 0)
                        key = 5;
                    else
                        key = key - 1;

                    $$('#markSelector table tr td:eq(0) a:eq(' + (key) + ')').click();
                }
                else {
                    console.log(000, key)
                    if (key == 'н')
                        key = 0;
                    if (key == 'б')
                        key = 1;
                    console.log(key, $$('#markSelector table tr td:eq(1) a:eq(' + key + ')'))

                    $$('#markSelector table tr td:eq(1) a:eq(' + key + ')').click();
                }
            }
        }
    });

    $$('#markSelector table a').click(function(){
        window.cObj.update('<img src="'+path_to_img+'" style="margin: 0 auto;" title="Выставление оценки..." alt="Выставление оценки...">');
    });

    Ajax.Responders.register({
        onCreate: function() {
            ajax_status = true;
        },
        onComplete: function() {
            ajax_status = false;
        }
    });
});
