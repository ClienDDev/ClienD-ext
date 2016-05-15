/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

$(document).ready(function(){
	var $select = $('#lesson_homework_lesson_id');
	if($select.val() == '0'){ // если дата домашки пустая
		$select.find('option').removeAttr('selected');
		$select.find('option:eq(1)').prop('selected', true); // устанавливаем первую дату 
	}
});
