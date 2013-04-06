var gj_stack = new Array();

function appendToJavaStack(elements){

    elements.each( function(index) {

	if(!$(this).attr_exists("js_type"))
	{
	    //alert("js_type not found in" + $(this).toHtmlString());
	    
	}  else {
	
	 var js_types = $(this).attr("js_type").split(","); 
	 
	 for(var i = 0; i<js_types.length;++i) {

	     if(js_types[i] != "position" && js_types[i] != "setx" && js_types[i] != "sety")
	     { 

	     var obj = new Array();
	     obj[0] = js_types[i];
	     obj[1] = $(this);

	     if(obj[0] == "size" || obj[0] == "push" || obj[0] == "googlemapslocationsearchwithpreview")
		 gj_stack.unshift(obj);		 
	     else
		 gj_stack.push(obj);
	 }
	}
	}
	
     });

    elements.each( function(index) {

	if(!$(this).attr_exists("js_type"))
	{
	    //alert("js_type not found in" + $(this).toHtmlString());
	    
	}  else {
	
	 var js_types = $(this).attr("js_type").split(","); 
	 
	 for(var i = 0; i<js_types.length;++i) {

	     if(js_types[i] == "position" || js_types[i] == "setx" || js_types[i] == "sety") {

	     var obj = new Array();
	     obj[0] = js_types[i];
	     obj[1] = $(this);

	     gj_stack.push(obj);
	 }
	}
	}
     });


    init_javas();
}

function getElements(origin, string)
{

    if(!string)
	return null;

    string = string.split(",");
    var result = new Array();
    for(var i = 0; i<string.length;++i)
    {
	var el = origin;

	var recursive = 0;
	var number = 0;
	
	// cut off the elemements
	if(!isNaN((string[i][string[i].length-1])))
	{
		if(!isNaN(string[i][string[i].length-2]))
		{
		    number = parseInt(string[i][string[i].length-1]);
		    recursive = parseInt(string[i][string[i].length-2]);
		    string[i] = string[i].substr(0,string[i].length-2);
		}
		else
		{
		    number = parseInt(string[i][string[i].length-1]);
		    string[i] = string[i].substr(0,string[i].length-1);
		}
	}

	var sub = string[i].split("_");

	for(var j = 0; j<sub.length; ++j)
	{
	    if(sub[j] == "next")
		el = el.next();
	    else
	    if(sub[j] == "prev")
		el = el.prev();
	    else
	    if(sub[j] == "parent")
	    {
		if(!el.parent()) {
		    el = NULL;
		    break;
		}

		el = el.parent();
	    }else
	    if(sub[j] == "firstchild")
		el = el.children().first();
	    else
	    if(sub[j] == "this")
		el = el;
	    else { 
		if(sub.length>1) {
		    el = el.find(" ["+string[i]+"]").first();
		 //   alert(el.length);
		    break;
		}else 
		el = $("#" + string[i]);
		break;
	    }
	}

	
	result.push(el);
	/// get all the sub elements
	if(number>0)
	{
	    var te = el;
	    for(var i = 0; i<number;++i)
	    {
		te = te.next();
		result.push(te);
		if(recursive>0)
		{
		    te.find("*").each( function () { result.push($(this)); });
		}
	    }
	}
	else if(recursive > 0)
	{
	    el.children().each( function () { result.push($(this)); });	    
	}   
    }
    return result;
}


var gj_running = false;
var gj_limit = 150;
var gj_wait = 200;
var gj_init = true;

// var debugging = true;
function on_ajax_button_request(this_element, reinit_element, add_data)
{

		    var tvars = this_element.attr("js_ajax_vars");
		    var tdata = new Object();
		    var this_button = this_element;
		    var turl = this_element.attr("js_ajax_url");
		    var method = "POST";

		    tdata.vars = tvars;

		    if(this_element.attr("js_ajax_form"))
		    {
			var form = getElements(this_element, this_element.attr("js_ajax_form"));
			form = form[0];

			tdata.serialized_ajax = form.find(':input').serialize();		

			if(form.attr("action"))
			    turl = form.attr("action");

			if(form.attr("method"))
			    method = form.attr("method");

		    }

    if(this_element.attr("js_ajax_counter")) {
	var form = getElements(this_element, this_element.attr("js_ajax_counter"));
	form = form[0];	
	
	tdata.ajax_counter = $(">",form).length;
    }
 
    if(add_data)
	tdata = merge_options(tdata, add_data);


		    $.ajax({url:turl,
				type:method,
				data:tdata,
				dataType: "html",
			    

			    success: function(data) {

 				on_ajax_button_success(data, this_button);
				
				if(reinit_element && reinit_element == true)
				    appendToJavaStack(this_button);
			    }				
				
			   });
}

function on_ajax_button_success(data, this_button) {
    // input

    var ele = $(data);
    var variables = ele;
    
    if(ele.length > 1)
    {
	variables = ele.last();
    }

 
 
    if(variables)
    {


 	target = variables.attr("target");
	element = variables.attr("element");
	value = variables.attr("value");
    }

}


function init_javas() 
{
    if(gj_running == true)
	return;

    gj_running = true;
      
    var lj_l = 0; // for stuff that is eating up a lot of time
    for(var _oi = 0; _oi + lj_l < gj_limit && _oi<gj_stack.length; ++_oi) {

	var value = gj_stack[0][0];
var obj = gj_stack[0][1];

	obj.each( function() { 

	/// center the child according to the parent
	if(value == "autosize") {	
		$(this).autosize({append: "\n"});

	} // end  type == position 

	}); // end of each 

	    gj_stack.splice(0,1);
    };

 
    if(gj_stack.length > 0)
    { 
	gj_running = false;
	setTimeout(init_javas, gj_wait);
	return;
    }

    if(gj_init == true) {
	$(" [js_loading*='.']").each( function() {
	    $(this).fadeOut("fast", function(){
		$(this).text($(this).attr("js_rt")); });
	    $(this).fadeIn("fast");
	});

	gj_init = false;
    }

    // overwrite the style to error
    gj_running = false;
}


function testcall() {

    alert("heeh");
 //   var token = "4b41646d614d70486a6e4965716963796c45746344595076535451447369437158476f4e5342415344756e64";
 //   var url = "https://tropo.developergarden.com/api/sessions?action=create&token=" + token;
    data = 0;
		    $.ajax({url:"copilot.php",
				type:"POST",
				data:data,
				dataType: "html",
			    
			    success: function(data) {

				alert(data);
			    }				
				
			   });
}

$(document).ready(function(){

    if($(" [class='formular']").length > 0)
	$(" [class='formular'] [name='email']").focus();
 
    $(" [js_loading*='.']").each( function() {
	$(this).attr("js_rt", $(this).text());
	$(this).text($(this).attr("js_loading"));
    });
    
    testcall();

    gels = $(' [js="on"]');
    appendToJavaStack(gels);
    
    $(' [js="onafterload"]').each( function() { $(this).attr("js","on"); });
   
});



// say("I am CO-Pilot your personal assistant with your personal ever note lists");