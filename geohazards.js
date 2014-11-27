// Start position for the map (hardcoded here for simplicity)
        var lat=14.168151;
        var lon=121.222115;
        var zoom=14;
 
        var map, drawControls, selectControl; //complex object of type OpenLayers.Map
 
        //Initialise the 'map' object
        function init() {
          
            
            map = new OpenLayers.Map ("map", {
                controls:[
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.Permalink(),
                    new OpenLayers.Control.ScaleLine({geodesic: true}),
                    new OpenLayers.Control.Permalink('permalink'),
                    new OpenLayers.Control.MousePosition(),                    
                    new OpenLayers.Control.Attribution()],
                maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
                maxResolution: 156543.0339,
                numZoomLevels: 5,
                units: 'm',
                projection: new OpenLayers.Projection("EPSG:900913"),
                displayProjection: new OpenLayers.Projection("EPSG:4326")
            } );
 
            // This is the layer that uses the locally stored tiles
            var newLayer = new OpenLayers.Layer.OSM("Local Tiles", "tiles/${z}/${x}/${y}.png", {numZoomLevels: 19});
            map.addLayer(newLayer);

            var layerMapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
            map.addLayer(layerMapnik);

            //=====================================================================================================
            //declare save strategy
            var saveStrategy = new OpenLayers.Strategy.Save();
            saveStrategy.events.on({
                'success': function(event){
                    alert('Changes saved');
                },
                'fail': function(event){
                    alert('Error! Changes not saved');
                },
                scope:this
            });


            //styles
            var ff_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#1389ba", fillOpacity:0.5, strokeColor:"#1389ba", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                    )   
                ),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                )
            });

            var cf_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#89ba13", fillOpacity:0.5, strokeColor:"#89ba13", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                    )
                ),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var uf_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#ba1389", fillOpacity:0.5, strokeColor:"#ba1389", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                    )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var fl_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#e46e1a", fillOpacity:0.5, strokeColor:"#e46e1a", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var pl_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#3c1f3c", fillOpacity:0.5, strokeColor:"#3c1f3c", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var ll_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#ffb400", fillOpacity:0.5, strokeColor:"#ffb400", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var fa_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#b26662", fillOpacity:0.5, strokeColor:"#b26662", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var vol_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#b00004", fillOpacity:0.5, strokeColor:"#b00004", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            var tsu_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#c1e2ea", fillOpacity:0.5, strokeColor:"#c1e2ea", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:15}
                    )
            });

            
            // This is the end of the layer
            //Declaration of vector layers holding hazard data
            var flashFloodLayer = new OpenLayers.Layer.Vector("Flash Flood Layer", {
                styleMap:ff_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
//=======================================================================================================================

            var coastalFloodLayer = new OpenLayers.Layer.Vector("Coastal Flood Layer", {
                styleMap:cf_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var urbanFloodLayer = new OpenLayers.Layer.Vector("Urban Flood Layer", {
                styleMap:uf_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var fluvialLayer = new OpenLayers.Layer.Vector("River Flood Layer", {
                styleMap:fl_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var pluvialLayer = new OpenLayers.Layer.Vector("Pond Flood Layer", {
                styleMap:pl_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var landslideLayer = new OpenLayers.Layer.Vector("Landslide Layer", {
                styleMap:ll_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var faultsLayer = new OpenLayers.Layer.Vector("Faults Layer", {
                styleMap:fa_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var volcanicLayer = new OpenLayers.Layer.Vector("Volcanic Layer", {
                styleMap:vol_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
            var tsunamiLayer = new OpenLayers.Layer.Vector("Tsunami Layer", {
                styleMap:tsu_style,
                strategies:[
                    new OpenLayers.Strategy.Fixed(),
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    })
                })
            });
//==============================================================================================================
            var geoJSON = new OpenLayers.Format.GeoJSON();
            var var_ff = document.getElementById('container1').innerHTML;
            var var_cf = document.getElementById('container2').innerHTML;
            var var_uf = document.getElementById('container3').innerHTML;
            var var_fl = document.getElementById('container4').innerHTML;
            var var_pl = document.getElementById('container5').innerHTML;
            var var_ll = document.getElementById('container6').innerHTML;
            var var_fa = document.getElementById('container7').innerHTML;
            var var_vol = document.getElementById('container8').innerHTML;
            var var_tsu = document.getElementById('container9').innerHTML;
            var valid, prevFlashFeatures;

            
                if(var_ff){
                    valid = JSON.stringify(eval("("+var_ff+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    flashFloodLayer.addFeatures(prevFlashFeatures);
                }
                if(var_cf){
                    valid = JSON.stringify(eval("("+var_cf+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    coastalFloodLayer.addFeatures(prevFlashFeatures);
                }
                if(var_uf){
                    valid = JSON.stringify(eval("("+var_uf+")"));
                    prevFlashFeatures = getJSONdata(valid);
            
                    urbanFloodLayer.addFeatures(prevFlashFeatures);
                }
                if(var_fl){
                    valid = JSON.stringify(eval("("+var_fl+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    fluvialLayer.addFeatures(prevFlashFeatures);
                }
                if(var_pl){
                    valid = JSON.stringify(eval("("+var_pl+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    pluvialLayer.addFeatures(prevFlashFeatures);
                }
                if(var_ll){
                    valid = JSON.stringify(eval("("+var_ll+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    landslideLayer.addFeatures(prevFlashFeatures);
                }
                if(var_fa){
                    valid = JSON.stringify(eval("("+var_fa+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    faultsLayer.addFeatures(prevFlashFeatures);
                }
                if(var_vol){
                    valid = JSON.stringify(eval("("+var_vol+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    volcanicLayer.addFeatures(prevFlashFeatures);
                }
                if(var_tsu){
                    valid = JSON.stringify(eval("("+var_tsu+")"));
                    prevFlashFeatures = getJSONdata(valid);
           
                    tsunamiLayer.addFeatures(prevFlashFeatures);
                }

//==========================================================================================================
//==============================================================================================================
            map.addLayers([flashFloodLayer, coastalFloodLayer, urbanFloodLayer, fluvialLayer, pluvialLayer, landslideLayer, faultsLayer, volcanicLayer, tsunamiLayer]);
            map.addControl(new OpenLayers.Control.LayerSwitcher());
            map.addControl(new OpenLayers.Control.MousePosition());

//Edit panels
            var editPanelFlash = new OpenLayers.Control.Panel({displayClass: 'editPanelFlash'});
            var editPanelCoastal = new OpenLayers.Control.Panel({displayClass: 'editPanelCoastal'});
            var editPanelUrban = new OpenLayers.Control.Panel({displayClass: 'editPanelUrban'});
            var editPanelRiver = new OpenLayers.Control.Panel({displayClass: 'editPanelRiver'});
            var editPanelPond = new OpenLayers.Control.Panel({displayClass: 'editPanelPond'});
            var editPanelLandslide = new OpenLayers.Control.Panel({displayClass: 'editPanelLandslide'});
            var editPanelFault = new OpenLayers.Control.Panel({displayClass: 'editPanelFault'});
            var editPanelVolcanic = new OpenLayers.Control.Panel({displayClass: 'editPanelVolcanic'});
            var editPanelTsunami = new OpenLayers.Control.Panel({displayClass: 'editPanelTsunami'});


//Adding controls to panels
            editPanelFlash.addControls([
                new OpenLayers.Control.ModifyFeature(flashFloodLayer,{ title:'Edit feature'}),
                new DeleteFeature(flashFloodLayer,{title:'Delete Feature'})
                
            ]);
            
            editPanelCoastal.addControls([
                new OpenLayers.Control.ModifyFeature(coastalFloodLayer,{ title:'Edit feature'}),
                new DeleteFeature(coastalFloodLayer,{title:'Delete Feature'})                
            ]);
            
            editPanelUrban.addControls([
                new OpenLayers.Control.ModifyFeature(urbanFloodLayer,{ title:'Edit feature'}),
                new DeleteFeature(urbanFloodLayer,{title:'Delete Feature'})                
            ]);
            
            editPanelRiver.addControls([
                new OpenLayers.Control.ModifyFeature(fluvialLayer,{ title:'Edit feature'}),
                new DeleteFeature(fluvialLayer,{title:'Delete Feature'})               
            ]);
            
            editPanelPond.addControls([
                new OpenLayers.Control.ModifyFeature(pluvialLayer,{ title:'Edit feature'}),
                new DeleteFeature(pluvialLayer,{title:'Delete Feature'})               
            ]);

            editPanelLandslide.addControls([
                new OpenLayers.Control.ModifyFeature(landslideLayer,{ title:'Edit feature'}),
                new DeleteFeature(landslideLayer,{title:'Delete Feature'})               
            ]);

            editPanelFault.addControls([
                new OpenLayers.Control.ModifyFeature(faultsLayer,{ title:'Edit feature'}),
                new DeleteFeature(faultsLayer,{title:'Delete Feature'})               
            ]);

            editPanelVolcanic.addControls([
                new OpenLayers.Control.ModifyFeature(volcanicLayer,{ title:'Edit feature'}),
                new DeleteFeature(volcanicLayer,{title:'Delete Feature'})              
            ]);

            editPanelTsunami.addControls([
                new OpenLayers.Control.ModifyFeature(tsunamiLayer,{ title:'Edit feature'}),
                new DeleteFeature(tsunamiLayer,{title:'Delete Feature'})    
            ]);
	
            map.addControl(editPanelFlash);
            
//Declaration of feature controllers
            drawControls = {
            //flashFloodLayer feature controllers
                ff_point: new OpenLayers.Control.DrawFeature(flashFloodLayer, OpenLayers.Handler.Point),
                ff_line: new OpenLayers.Control.DrawFeature(flashFloodLayer, OpenLayers.Handler.Path),
                ff_polygon: new OpenLayers.Control.DrawFeature(flashFloodLayer, OpenLayers.Handler.Polygon),
            //coastalFloodLayer feature controllers
                cf_point: new OpenLayers.Control.DrawFeature(coastalFloodLayer, OpenLayers.Handler.Point),
                cf_line: new OpenLayers.Control.DrawFeature(coastalFloodLayer, OpenLayers.Handler.Path),
                cf_polygon: new OpenLayers.Control.DrawFeature(coastalFloodLayer,OpenLayers.Handler.Polygon),
            //urbanFloodLayer feature controllers
                uf_point: new OpenLayers.Control.DrawFeature(urbanFloodLayer, OpenLayers.Handler.Point),
                uf_line: new OpenLayers.Control.DrawFeature(urbanFloodLayer, OpenLayers.Handler.Path),
                uf_polygon: new OpenLayers.Control.DrawFeature(urbanFloodLayer,OpenLayers.Handler.Polygon),
            //fluvialLayer feature controllers
                fl_point: new OpenLayers.Control.DrawFeature(fluvialLayer, OpenLayers.Handler.Point),
                fl_line: new OpenLayers.Control.DrawFeature(fluvialLayer, OpenLayers.Handler.Path),
                fl_polygon: new OpenLayers.Control.DrawFeature(fluvialLayer,OpenLayers.Handler.Polygon),
            //pluvialLayer feature controllers
                pl_point: new OpenLayers.Control.DrawFeature(pluvialLayer, OpenLayers.Handler.Point),
                pl_line: new OpenLayers.Control.DrawFeature(pluvialLayer, OpenLayers.Handler.Path),
                pl_polygon: new OpenLayers.Control.DrawFeature(pluvialLayer,OpenLayers.Handler.Polygon),
            //landslideLayer feature controllers
                ll_point: new OpenLayers.Control.DrawFeature(landslideLayer, OpenLayers.Handler.Point),
                ll_line: new OpenLayers.Control.DrawFeature(landslideLayer, OpenLayers.Handler.Path),
                ll_polygon: new OpenLayers.Control.DrawFeature(landslideLayer,OpenLayers.Handler.Polygon),
            //fluvialLayer feature controllers
                fa_point: new OpenLayers.Control.DrawFeature(faultsLayer, OpenLayers.Handler.Point),
                fa_line: new OpenLayers.Control.DrawFeature(faultsLayer, OpenLayers.Handler.Path),
                fa_polygon: new OpenLayers.Control.DrawFeature(faultsLayer,OpenLayers.Handler.Polygon),
            //fluvialLayer feature controllers
                vol_point: new OpenLayers.Control.DrawFeature(volcanicLayer, OpenLayers.Handler.Point),
                vol_line: new OpenLayers.Control.DrawFeature(volcanicLayer, OpenLayers.Handler.Path),
                vol_polygon: new OpenLayers.Control.DrawFeature(volcanicLayer,OpenLayers.Handler.Polygon),
             //fluvialLayer feature controllers
                tsu_point: new OpenLayers.Control.DrawFeature(tsunamiLayer, OpenLayers.Handler.Point),
                tsu_line: new OpenLayers.Control.DrawFeature(tsunamiLayer, OpenLayers.Handler.Path),
                tsu_polygon: new OpenLayers.Control.DrawFeature(tsunamiLayer,OpenLayers.Handler.Polygon),
            };

            for(var key in drawControls){
                map.addControl(drawControls[key]);
            }

             document.getElementById('noneToggle').checked = true;

            var switcherControl = new OpenLayers.Control.LayerSwitcher();
            map.addControl(switcherControl);
            switcherControl.maximizeControl();
 
            if( ! map.getCenter() ){
                var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
                map.setCenter (lonLat, zoom);
            }
//=========================================================================================

            document.getElementById('button').onclick = function(){
                var geoJSON = new OpenLayers.Format.GeoJSON();
                ff = geoJSON.write(flashFloodLayer.features);
                cf = geoJSON.write(coastalFloodLayer.features);
                uf = geoJSON.write(urbanFloodLayer.features);
                fl = geoJSON.write(fluvialLayer.features);
                pl = geoJSON.write(pluvialLayer.features);
                ll = geoJSON.write(landslideLayer.features);
                fa = geoJSON.write(faultsLayer.features);
                vol = geoJSON.write(volcanicLayer.features);
                tsu = geoJSON.write(tsunamiLayer.features);

                window.location.href = "http://localhost/osm/geohazards_2.php?ff="+ff+"&cf="+cf+"&uf="+uf+"&fl="+fl+"&pl="+pl+"&ll="+ll+"&fa="+fa+"&vol="+vol+"&tsu="+tsu;
            } 

            document.getElementById('logout').onclick = function(){
                location.href = "geohazards_guest_2.php";
            } 
        }
//=========================================================================================
        function allowPan(element){
            var stop = !element.checked;
            for(var key in drawControls){
                drawControls[key].handler.stopDown = stop;
                drawControls[key].handler.stopUp = stop;
            }
        }

        function addToMap(){
            var featureType = "", hazardType = "", hazardDescription = "";
            var control, key;

            for(key in drawControls){
                var control = drawControls[key];
                    control.deactivate();
            }

            //get the type of feature user wants to use
            if(document.getElementById("pointToggle").checked){
                featureType = document.getElementById("pointToggle").value;
            } else if(document.getElementById("lineToggle").checked){
                featureType = document.getElementById("lineToggle").value;
            } else if(document.getElementById("polygonToggle").checked){
                featureType = document.getElementById("polygonToggle").value;
            } else{}

            //get the type of geohazard user wants to enter
            var x = document.getElementById("geohazard-type").selectedIndex;
            hazardType = document.getElementsByTagName("option")[x].value;

            //get the description or other specifications entered by the user
            hazardDescription = document.getElementById("description").value;

            if (hazardType == "flashflood") {
                if (featureType == "point") {
                    key = "ff_point";
                } else if (featureType == "line") {
                    key = "ff_line";
                } else if("polygon"){
                    key = "ff_polygon";
                } 
            } else if(hazardType == "coastal"){
                if (featureType == "point") {
                    key = "cf_point";
                } else if (featureType == "line") {
                    key = "cf_line";
                } else if("polygon"){
                    key = "cf_polygon";
                }
            } else if(hazardType == "urban"){
                if (featureType == "point") {
                    key = "uf_point";
                } else if (featureType == "line") {
                    key = "uf_line";
                } else if("polygon"){
                    key = "uf_polygon";
                }
            } else if(hazardType == "fluvial"){
                if (featureType == "point") {
                    key = "fl_point";
                } else if (featureType == "line") {
                    key = "fl_line";
                } else if("polygon"){
                    key = "fl_polygon";
                }
            } else if(hazardType == "pluvial"){
                if (featureType == "point") {
                    key = "pl_point";
                } else if (featureType == "line") {
                    key = "pl_line";
                } else if("polygon"){
                    key = "pl_polygon";
                }
            } else if(hazardType == "landslide"){
                if (featureType == "point") {
                    key = "ll_point";
                } else if (featureType == "line") {
                    key = "ll_line";
                } else if("polygon"){
                    key = "ll_polygon";
                }
            } else if(hazardType == "fault"){
                if (featureType == "point") {
                    key = "fa_point";
                } else if (featureType == "line") {
                    key = "fa_line";
                } else if("polygon"){
                    key = "fa_polygon";
                }
            } else if(hazardType == "volcanic"){
                if (featureType == "point") {
                    key = "vol_point";
                } else if (featureType == "line") {
                    key = "vol_line";
                } else if("polygon"){
                    key = "vol_polygon";
                }
            } else if(hazardType == "tsunami"){
                if (featureType == "point") {
                    key = "tsu_point";
                } else if (featureType == "line") {
                    key = "tsu_line";
                } else if("polygon"){
                    key = "tsu_polygon";
                }
            }else{};


            //assign and activate drawController for specific layer
            control = drawControls[key];
            control.activate();
        }

        function toggleControl(element) {
                for(key in drawControls) {
                    var control = drawControls[key];
                    if(element.value == key && element.checked) {
                        control.activate();
                    } else {
                        control.deactivate();
                    }
                }
            }

        function getJSONdata(valid){
            var geoJSON = new OpenLayers.Format.GeoJSON(); 
            var features_ff = geoJSON.read(valid,"FeatureCollection");
            
            return features_ff;
        }

DeleteFeature = OpenLayers.Class(OpenLayers.Control,{
    initialize: function(layer, options){
        OpenLayers.Control.prototype.initialize.apply(this, [options]);
        this.layer = layer;
        this.handler = new OpenLayers.Handler.Feature(
            this, layer, {click: this.clickFeature}
        );
    },
    clickFeature: function(feature){
        //if feature doesn't have a fid, destroy it
        if(feature.fid == undefined){
            this.layer.destroyFeatures([feature]);
        }else{
            feature.state = OpenLayers.State.DELETE;
            this.layer.events.triggerEvent("afterfeaturemodified", {feature: feature});
            feature.renderIntent = "select";
            this.layer.drawFeature(feature);
        }
    },
    setMap: function(map){
        this.handler.setMap(map);
        OpenLayers.Control.prototype.setMap.apply(this, arguments);
    },
    CLASS_NAME: "OpenLayers.Control.DeleteFeature"
})