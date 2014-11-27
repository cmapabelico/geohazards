<?php session_start();
    if(!isset($_SESSION['userid'])){
        header("location:geohazards_guest_2.php");
    }
?>

<html>
<?php
    $dbhost = 'localhost';
    $dbuser = 'postgres';
    $dbpass = 'password';
    $conn = pg_connect("host=localhost port=5432 dbname=geohazards user=postgres password=password");

    if(!$conn){
            die('Could not connect:');
    }
    /* Loads stored json string from the database
     * from the tables, then clears the content of the tables;
     */
    if($_SESSION['loadflag'] == 0){
        $load_data = "SELECT flashflood_data, coastal_data, urban_data, fluvial_data, pluvial_data, landslide_data, fault_data, volcanic_data, tsunami_data FROM hazard_data WHERE hazard_id = 1";
        $sql_1 = pg_query($conn, $load_data); 
        if(!$sql_1){
            die('Could not pull data');
        }else{
            while($row = pg_fetch_array($sql_1)){
                $ff_feature =$row['flashflood_data'];
                $cf_feature =$row['coastal_data'];
                $uf_feature =$row['urban_data'];
                $fl_feature =$row['fluvial_data'];
                $pl_feature =$row['pluvial_data'];
                $ll_feature =$row['landslide_data'];
                $fa_feature =$row['fault_data'];
                $vol_feature =$row['volcanic_data'];
                $tsu_feature =$row['tsunami_data'];
            }
        }

        $_SESSION['loadflag'] = 1;
    }

   $ff = ($_GET['ff']);
   $cf = ($_GET['cf']);
   $uf = ($_GET['uf']);
   $fl = ($_GET['fl']);
   $pl = ($_GET['pl']);
   $ll = ($_GET['ll']);
   $fa = ($_GET['fa']);
   $vol = ($_GET['vol']);
   $tsu = ($_GET['tsu']);

   $ffVar = strcmp($ff, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $cfVar = strcmp($cf, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $ufVar = strcmp($uf, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $flVar = strcmp($fl, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $plVar = strcmp($pl, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $llVar = strcmp($ll, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $faVar = strcmp($fa, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $volVar = strcmp($vol, "{\"type\":\"FeatureCollection\",\"features\":[]}");
   $tsuVar = strcmp($tsu, "{\"type\":\"FeatureCollection\",\"features\":[]}");
//=====================================================================================
    
   if($ffVar == 0 || $ffVar < 0 &&
        $cfVar == 0 || $cfVar < 0 &&
        $ufVar == 0 || $ufVar < 0 &&
        $flVar == 0 || $flVar < 0 &&
        $plVar == 0 || $plVar < 0 &&
        $llVar == 0 || $llVar < 0 &&
        $faVar == 0 || $faVar < 0 &&
        $volVar == 0 || $volVar < 0 &&
        $tsuVar == 0 || $tsuVar < 0 
    ){  
    $ff = NULL; 
   }else{
        $clear_table = "TRUNCATE hazard_data";
        $sql_2 = pg_query($conn, $clear_table);
            $ff_feature = $ff;
            $cf_feature = $cf;       
            $uf_feature = $uf;
            $fl_feature = $fl;
            $pl_feature = $pl;
            $ll_feature = $ll;
            $fa_feature = $fa;
            $vol_feature = $vol;
            $tsu_feature = $tsu;

        $sql = "INSERT INTO hazard_data VALUES (1,'$ff','$cf','$uf', '$fl', '$pl', '$ll', '$fa', '$vol','$tsu')";
        $retval = pg_query($conn, $sql);
        if(! $retval){
            die('Could not enter data:');
        }else{
        }
        pg_close($conn);    
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
    <script src="openlayers/OpenLayers.js"></script>
    <!-- bring in the OpenStreetMap OpenLayers layers.
         Using this hosted file will make sure we are kept up
         to date with any necessary changes -->
    <script src="OpenStreetMap.js"></script>
 
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
    <p id="container1"><?php echo $ff_feature; ?></p>
    <p id="container2"><?php echo $cf_feature; ?></p>
    <p id="container3"><?php echo $uf_feature; ?></p>
    <p id="container4"><?php echo $fl_feature; ?></p>
    <p id="container5"><?php echo $pl_feature; ?></p>
    <p id="container6"><?php echo $ll_feature; ?></p>
    <p id="container7"><?php echo $fa_feature; ?></p>
    <p id="container8"><?php echo $vol_feature; ?></p>
    <p id="container9"><?php echo $tsu_feature; ?></p>
</body>
 
</html>