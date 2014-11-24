<?php session_start();session_destroy();?>
<html>
<?php
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = 'password';
    $conn = mysql_connect($dbhost, $dbuser, $dbpass);
    mysql_select_db('geohazards');

    if(!$conn){
            die('Could not connect:' .mysql_error());
    }
    /* Loads stored json string from the database
     * from the tables, then clears the content of the tables;
     */
    $load_data = "SELECT json_string FROM flashflood_data WHERE id = 1";
    $sql_1 = mysql_query($load_data,$conn); 
    if(!$sql_1){
        die('Could not pull data'.mysql_error());
    }else{
        while($row = mysql_fetch_array($sql_1, MYSQL_ASSOC)){
            $feature =$row['json_string'];
        }
    }
?>
<head>
    <title>Geohazards layer</title>
    <!--<link rel="stylesheet" href="style.css" type="text/css" />-->
    <link rel="stylesheet" type="text/css" href="hazards.css">
    <!-- Bootstrap -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="bootstrap2/dist/css/bootstrap-select.min.css" rel="stylesheet">
    <!-- bring in the OpenLayers javascript library
         (here we bring it from the remote site, but you could
         easily serve up this javascript yourself) -->
    <script src="http://openlayers.org/api/OpenLayers.js"></script>

 
    <!-- bring in the OpenStreetMap OpenLayers layers.
         Using this hosted file will make sure we are kept up
         to date with any necessary changes -->
    <script src="http://www.openstreetmap.org/openlayers/OpenStreetMap.js"></script>
 
    <script src="geohazards_guest.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="bootstrap2/dist/js/bootstrap-select.min.js"></script>
    
</head>
 
<!-- body.onload is called once the page is loaded (call the 'init' function) -->
<body onload="init();">
    
    <!-- define a DIV into which the map will appear. Make it take up the whole window -->
    <div style="width:100%; height:90%;" id="map"></div>
    <div id="guest-footer"> 
        <button type="button" class="btn btn-primary btn-lg" id="login" data-toggle="modal" data-target="#myModal">
                 <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Log in
        </button>
    </div>

    <p id="container_guest"><?php echo $feature; ?></p>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">Login</h4>
      </div>
      <form name="form1" method="post" action="checklogin.php">
      <div class="modal-body">
        <table width="300" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="#CCCCCC">
            <tr>
                    <td>
                        <table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#FFFFFF">

                            <tr>
                                <td width="78">ID</td>
                                <td width="6">:</td>
                                <td width="294"><input name="userid" type="text" id="userid"></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>:</td>
                                <td><input name="mypassword" type="password" id="mypassword"></td>
                            </tr>
                        </table>
                    </td>
            </tr>
        </table>
      </div>
      <div class="modal-footer">
        <input type="submit" class="btn btn-primary btn-lg" name="Submit" value="Login">
      </div>
      </form>
    </div>
  </div>
</div>
 
</body>
 
</html>
