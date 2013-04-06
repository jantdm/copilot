<?php

require_once('tropo.class.php');


$tropo = new Tropo();
$tropo->call("+4917622643864");
$tropo->say("Tag, you're it!");
$tropo->RenderJson();




?>