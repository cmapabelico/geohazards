<?php session_start();

$host="localhost"; // Host name
$username="\"user\""; // Mysql username
$password="password"; // Mysql password
$db_name="geohazards"; // Database name
$tbl_name="\"user\""; // Table name

// Connect to server and select databse.
$conn = pg_connect("host=localhost port=5432 dbname=geohazards user=postgres password=password");

// username and password sent from form
$userid = $_POST['userid'];
$mypassword = $_POST['mypassword'];

/*// To protect MySQL injection (more detail about MySQL injection)
$userid = stripslashes($userid);
$mypassword = stripslashes($mypassword);
$userid = mysql_real_escape_string($userid);
$mypassword = mysql_real_escape_string($mypassword);*/

$sql = "SELECT * FROM $tbl_name WHERE user_id = '$userid' and user_password = '$mypassword'";
$result = pg_query($conn, $sql);

// Mysql_num_row is counting table row
$count = pg_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1){
// Register $userid, $mypassword and redirect to file "geohazards.php"
	$_SESSION['userid'] = $userid;
	$_SESSION['mypassword'] = $mypassword;
	$_SESSION['loadflag'] = 0;
	 session_write_close();                       

	header("location:geohazards_2.php");
}
else {
echo "Wrong Username or Password";
}
?>