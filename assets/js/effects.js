$(document).ready(function()
{
	init();
});


function init()
{
	$('.phoneSubmit').click(toggle);
}

function toggle()
{
	var phoneSubmit = $(this);
	var art = phoneSubmit.parent();
	var textField = art.find('.textField');
	var displayNumber = art.find('.displayNumber');
	var enterNumber = art.find('.enterNumber');
	phoneSubmit.addClass('noDisplay');
	textField.remove();
	displayNumber.removeClass('noDisplay');
	enterNumber.text('Your number is:')
	
}
