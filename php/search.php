
<?php
 try {
  $dbconn = new PDO("mysql:dbname=tetris;host=localhost",	
    "root", "root");
  $dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
  $query_string = "SELECT * FROM scores ORDER BY pscore DESC LIMIT 10";
  $rows = $dbconn->query($query_string);
  
  //$result="";   // result string
  $result = array();
  
  //store the name and score in an array 
  foreach($rows as $row) {
   // create result string
   $result[] .= $row['pname'];
   $result[] .= $row['pscore'];
  }
  
  echo json_encode($result);   // return the result to javascript
 } catch  (PDOException $e) {
  print_r($e->getMessage());
    //die("Error!: " . implode('-',$e->getMessage());
    echo 'Error!: ' . $e->getMessage();
 }

?>
 
