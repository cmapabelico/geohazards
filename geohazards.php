<?php session_start();
    /*if(!isset($_SESSION['userid'])){
        header("location:geohazards_guest.php");
    }*/
?>

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
    /*$load_data = "SELECT json_string FROM flashflood_data WHERE id = 1";
    $sql_1 = mysql_query($load_data,$conn); 
    if(!$sql_1){
        die('Could not pull data'.mysql_error());
    }else{
        while($row = mysql_fetch_array($sql_1, MYSQL_ASSOC)){
            $feature =$row['json_string'];
        }
        $clear_table = "TRUNCATE flashflood_data";
        $sql_2 = mysql_query($clear_table, $conn);
    }*/
    $clear_table = "TRUNCATE flashflood_data";
    $sql_2 = mysql_query($clear_table, $conn);

   $json = ($_GET['json']);
   $var = strcmp($json, "{\"type\":\"FeatureCollection\",\"features\":[]}");
//=====================================================================================
    
   if($var == 0 || $var < 0){
    $json = NULL; 
   }else{
        $feature2 = $json;
        $sql = "INSERT INTO flashflood_data (json_string) VALUES ('$json')";
        $retval = mysql_query($sql, $conn);
        if(! $retval){
            die('Could not enter data:'. mysql_error());
        }else{
            $flag1 = "1";
        }
        mysql_close($conn);
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
 
    <script src="geohazards.js"></script>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="bootstrap2/dist/js/bootstrap-select.min.js"></script>
    
</head>
 
<!-- body.onload is called once the page is loaded (call the 'init' function) -->
<body onload="init();">
    
    <!-- define a DIV into which the map will appear. Make it take up the whole window -->
    <div style="width:100%; height:75%;" id="map"></div>
    <div class="menu" id="menu-ui">
        <div class="well inner" id="feature-type">
            <h4>Draw</h4>
            <form name="feature-type" id="controlToggle">
                <li>
                    <input type="radio" name="type" value="none" id="noneToggle" onclick="toggleControl(this);" checked="checked" />
                    <label for="noneToggle">navigate</label>
                </li>
                <li>
                    <input type="radio" name="type" value="point" id="pointToggle" />
                    <label for="pointToggle">draw point</label>
                </li>
                <li>
                    <input type="radio" name="type" value="line" id="lineToggle" />
                    <label for="lineToggle">draw line</label>
                 </li>
                <li>
                    <input type="radio" name="type" value="polygon" id="polygonToggle"/>
                    <label for="polygonToggle">draw polygon</label>
                </li>
               <!-- <li>
                    <input type="checkbox" name="allow-pan" value="allow-pan" id="allowPanCheckbox" checked=true onclick="  allowPan(this);" />
                    <label for="allowPanCheckbox">allow pan while drawing</label>
                </li>-->
            </form>
        </div>
        <div class="well inner" id="geo-type">
                <h4>Geohazard Type</h4>
                <select class="selectpicker" id="geohazard-type">
                
                        <optgroup label="Flood">
                            <option selected="selected" value="flashflood">Flashflood</option>
                            <option value="coastal">Coastal flood</option>
                            <option value="urban">Urban flood</option>
                            <option value="fluvial">River flooding(fluvial)</option>
                            <option value="pluvial">Pond flooding(pluvial)</option>
                        </optgroup>
                        <option value="landslide">Landslide hazard</option>
                        <option value="fault">Fault hazard</option>
                        <option value="volcanic">Volcanic hazard</option>
                        <option value="tsunami">Tsunami hazard</option>
                </select>
        </div>
        <div class="well inner" id="details">
            <div id="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" rows="5" cols="55" id="description"> </textarea>
            </div>
        </div>
        <div class="inner" id="btn-panel">

            <button type="button" class="btn btn-danger btn-lg" onclick="addToMap();">
                 <span class="glyphicon glyphicon-globe" aria-hidden="true"></span> Add to Map
            </button>
            <button type="submit" class="btn btn-default btn-lg" id="button">
                 <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Save Map
            </button>
            <button type="button" class="btn btn-primary btn-lg" id="logout">
                 <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout
            </button>
        </div>
       
    </div>
    <p id="container"><?php echo $feature; ?></p>
    <p id="container2"><?php echo $feature2; ?></p>
    <p id="flag1"><?php echo $flag1; ?></p>
 
</body>
 
</html>
