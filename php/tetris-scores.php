<?php
	header('Location: http://localhost/Tetris-proj-dec10/tetris.html');

       //echo "Calling php\n";
 
       //connect to database
       $sql_connection = mysql_connect("localhost", "root", "root");
       if (!$sql_connection)
       	    die("Cannot connect to database!");
       //echo "Connected to database<br>";
       mysql_select_db("tetris", $sql_connection) or die("No database found!");
       //echo "Found database<br>";
       $pname = $_POST["Name"];
       $pscore = $_POST["Score"];
       $sql = "INSERT INTO scores (
       		pname,
       		pscore
       		)
       		VALUES (
       		'$pname',
       		'$pscore'
       		)";
       		
       $result = mysql_query($sql, $sql_connection);
       if (!$result)
       	    die("Error in pushing: ".mysql_error());

       mysql_close($sql_connection);
?>
        
        
        
        
        
        
        
   