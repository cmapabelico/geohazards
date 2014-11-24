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
//=======================================================================================================
            var geoJSON = new OpenLayers.Format.GeoJSON();
            var var_from_php_1 = document.getElementById('container_guest').innerHTML;
            var valid, prevFlashFeatures;

            if(var_from_php_1){
                valid = JSON.stringify(eval("("+var_from_php_1+")"));
                prevFlashFeatures = getJSONdata(valid);
           
                flashFloodLayer.addFeatures(prevFlashFeatures);
            }

//=======================================================================================================

            map.addLayers([flashFloodLayer, coastalFloodLayer, urbanFloodLayer, fluvialLayer, pluvialLayer, landslideLayer, faultsLayer, volcanicLayer, tsunamiLayer]);
            map.addControl(new OpenLayers.Control.LayerSwitcher());
            map.addControl(new OpenLayers.Control.MousePosition());

            if( ! map.getCenter() ){
                var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
                map.setCenter (lonLat, zoom);
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

        function getJSONdata(valid){
            var geoJSON = new OpenLayers.Format.GeoJSON(); 
            var features_ff = geoJSON.read(valid,"FeatureCollection");
            /*if(features_ff.contructor != Array){
                features_ff = [features_ff];
            }*/
            return features_ff;
        }

