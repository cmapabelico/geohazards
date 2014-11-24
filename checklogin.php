<?php session_start();

$host="localhost"; // Host name
$username="root"; // Mysql username
$password="password"; // Mysql password
$db_name="geohazards"; // Database name
$tbl_name="user"; // Table name

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form
$userid = $_POST['userid'];
$mypassword = $_POST['mypassword'];

// To protect MySQL injection (more detail about MySQL injection)
$userid = stripslashes($userid);
$mypassword = stripslashes($mypassword);
$userid = mysql_real_escape_string($userid);
$mypassword = mysql_real_escape_string($mypassword);

$sql = "SELECT * FROM $tbl_name WHERE id = '$userid' and password = '$mypassword'";
$result = mysql_query($sql);

// Mysql_num_row is counting table row
$count = mysql_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1){
// Register $userid, $mypassword and redirect to file "geohazards.php"
	$_SESSION['userid'] = $userid;
	$_SESSION['mypassword'] = $mypassword;
	 session_write_close();                       

	header("location:geohazards.php");
}
else {
echo "Wrong Username or Password";
}
?>