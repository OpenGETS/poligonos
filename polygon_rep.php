<?php
include ('cnx/cnx.php');

$qry	= "CALL sp_polygon_view_all_data()";
$rs		= $mysqli->query($qry);

header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=".$name."_".date("d-m-Y").".xls" );
header("Expires: 0");
header("Cache-Control: must-revalidate, post-check=0,pre-check=0");
header("Pragma: public");


$sep = "\t";

while ($finfo = $rs->fetch_field()) {
echo $finfo->name . $sep;
}
print("\n");    

while($row = mysqli_fetch_row($rs))
 {
   $schema_insert = "";
   for($j = 0; $j < mysqli_num_fields($rs); $j++)
   {
     if(!isset($row[$j]))
       $schema_insert .= "".$sep;
     elseif ($row[$j] != "")
       $schema_insert .= "$row[$j]".$sep;
     else
       $schema_insert .= "".$sep;
   }
   $schema_insert = str_replace($sep."$", "", $schema_insert);
   $schema_insert = preg_replace("/\r\n|\n\r|\n|\r/", " ", $schema_insert);
   $schema_insert .= "\t"; 
   print(trim($schema_insert));
   print "\n";
 }
?>