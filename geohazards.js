// Start position for the map (hardcoded here for simplicity)
        var lat=14.168151;
        var lon=121.222115;
        var zoom=14;
 
        var map, drawControls; //complex object of type OpenLayers.Map
 
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
            var ff_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#1389ba", fillOpacity:0.5, strokeColor:"#1389ba", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var cf_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#89ba13", fillOpacity:0.5, strokeColor:"#89ba13", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var uf_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#ba1389", fillOpacity:0.5, strokeColor:"#ba1389", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var fl_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#e46e1a", fillOpacity:0.5, strokeColor:"#e46e1a", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var pl_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#3c1f3c", fillOpacity:0.5, strokeColor:"#3c1f3c", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var ll_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#ffb400", fillOpacity:0.5, strokeColor:"#ffb400", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var fa_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#b26662", fillOpacity:0.5, strokeColor:"#b26662", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var vol_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#b00004", fillOpacity:0.5, strokeColor:"#b00004", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));

            var tsu_style = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    {fillColor:"#c1e2ea", fillOpacity:0.5, strokeColor:"#c1e2ea", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
            ));
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
            var var_from_php_1 = document.getElementById('container').innerHTML;
            var var_from_php_2 = document.getElementById('container2').innerHTML;
            var flag1 = document.getElementById('flag1').innerHTML;
            var valid, prevFlashFeatures;

            if(var_from_php_1){
                valid = JSON.stringify(eval("("+var_from_php_1+")"));
                prevFlashFeatures = getJSONdata(valid);
           
                flashFloodLayer.addFeatures(prevFlashFeatures);
            }

            if(var_from_php_2){
                valid = JSON.stringify(eval("("+var_from_php_2+")"));
                prevFlashFeatures = getJSONdata(valid);
           
                flashFloodLayer.addFeatures(prevFlashFeatures);
            }
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
                new DeleteFeature(flashFloodLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);
            
            editPanelCoastal.addControls([
                new OpenLayers.Control.ModifyFeature(coastalFloodLayer,{ title:'Edit feature'}),
                new DeleteFeature(coastalFloodLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);
            
            editPanelUrban.addControls([
                new OpenLayers.Control.ModifyFeature(urbanFloodLayer,{ title:'Edit feature'}),
                new DeleteFeature(urbanFloodLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);
            
            editPanelRiver.addControls([
                new OpenLayers.Control.ModifyFeature(fluvialLayer,{ title:'Edit feature'}),
                new DeleteFeature(fluvialLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);
            
            editPanelPond.addControls([
                new OpenLayers.Control.ModifyFeature(pluvialLayer,{ title:'Edit feature'}),
                new DeleteFeature(pluvialLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);

            editPanelLandslide.addControls([
                new OpenLayers.Control.ModifyFeature(landslideLayer,{ title:'Edit feature'}),
                new DeleteFeature(landslideLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);

            editPanelFault.addControls([
                new OpenLayers.Control.ModifyFeature(faultsLayer,{ title:'Edit feature'}),
                new DeleteFeature(faultsLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);

            editPanelVolcanic.addControls([
                new OpenLayers.Control.ModifyFeature(volcanicLayer,{ title:'Edit feature'}),
                new DeleteFeature(volcanicLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
            ]);

            editPanelTsunami.addControls([
                new OpenLayers.Control.ModifyFeature(tsunamiLayer,{ title:'Edit feature'}),
                new DeleteFeature(tsunamiLayer,{title:'Delete Feature'}),
                new OpenLayers.Control.Button({displayClass: 'saveButton', trigger: function(){saveStrategy.save()}, title:'Save changes'})
                
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
                json = geoJSON.write(flashFloodLayer.features);
                window.location.href = "http://localhost/osm/geohazards.php?json="+json;
            } 

            document.getElementById('logout').onclick = function(){
                location.href = "geohazards_guest.php";
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
            //alert(hazardDescription); 
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
            /*if(features_ff.contructor != Array){
                features_ff = [features_ff];
            }*/
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