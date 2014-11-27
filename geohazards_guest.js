// Start position for the map (hardcoded here for simplicity)
        var lat=14.168151;
        var lon=121.222115;
        var zoom=14;
 
        var map, drawControls, selectControl, selectedFeature; //complex object of type OpenLayers.Map
    
        function onPopupExit(evt){
            selectControl.unselect(selectedFeature);
        }

        function onFeatureSelect(feature){
            selectedFeature = feature;
            popup = new OpenLayers.Popup.FramedCloud("chicken",
                feature.geometry.getBounds().getCenterLonLat(),
                null,
                "<div style='font-size:.8em'>Feature: "+ feature.id + "<br>Area: " + feature.geometry.getArea()+"</div>",
                null, false, onPopupExit
                );
            feature.popup = popup;
            map.addPopup(popup);
        }

        function onFeatureUnselect(feature){
            map.removePopup(feature.popup);
            feature.popup.destroy();
            feature.popup = null;
        }
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
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                )
            });

            var cf_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#89ba13", fillOpacity:0.5, strokeColor:"#89ba13", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                    )
                ),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var uf_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#ba1389", fillOpacity:0.5, strokeColor:"#ba1389", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                    )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var fl_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#e46e1a", fillOpacity:0.5, strokeColor:"#e46e1a", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var pl_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#3c1f3c", fillOpacity:0.5, strokeColor:"#3c1f3c", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var ll_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#ffb400", fillOpacity:0.5, strokeColor:"#ffb400", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var fa_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#b26662", fillOpacity:0.5, strokeColor:"#b26662", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var vol_style = new OpenLayers.StyleMap({
                "default":new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#b00004", fillOpacity:0.5, strokeColor:"#b00004", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
                    )
            });

            var tsu_style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(OpenLayers.Util.applyDefaults(
                    {fillColor:"#c1e2ea", fillOpacity:0.5, strokeColor:"#c1e2ea", strokeWidth:5, pointRadius: 10},
                    OpenLayers.Feature.Vector.style["default"]
                )),
                "select":new OpenLayers.Style(
                    {fillColor:"#FFDE00", fillOpacity:0.5, strokeColor:"#FFDE00", strokeWidth:5, pointRadius:20}
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
//=======================================================================================================
            var geoJSON = new OpenLayers.Format.GeoJSON();
            var var_ff = document.getElementById('container_guest_1').innerHTML;
            var var_cf = document.getElementById('container_guest_2').innerHTML;
            var var_uf = document.getElementById('container_guest_3').innerHTML;
            var var_fl = document.getElementById('container_guest_4').innerHTML;
            var var_pl = document.getElementById('container_guest_5').innerHTML;
            var var_ll = document.getElementById('container_guest_6').innerHTML;
            var var_fa = document.getElementById('container_guest_7').innerHTML;
            var var_vol = document.getElementById('container_guest_8').innerHTML;
            var var_tsu = document.getElementById('container_guest_9').innerHTML;
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

//=======================================================================================================

            map.addLayers([flashFloodLayer, coastalFloodLayer, urbanFloodLayer, fluvialLayer, pluvialLayer, landslideLayer, faultsLayer, volcanicLayer, tsunamiLayer]);
            map.addControl(new OpenLayers.Control.LayerSwitcher());
            map.addControl(new OpenLayers.Control.MousePosition());

            selectControl = new OpenLayers.Control.SelectFeature(
                [
                    flashFloodLayer,
                    coastalFloodLayer,
                    urbanFloodLayer,
                    fluvialLayer,
                    pluvialLayer,
                    landslideLayer,
                    faultsLayer,
                    volcanicLayer,
                    tsunamiLayer
                ],{
                    onSelect: onFeatureSelect, onUnselect: onFeatureUnselect,
                    clickout: true, toggle: false,
                    multiple: false, hover: true,
                    toggleKey: "ctrlKey", //ctrl key removes from selection
                    multipleKey: "shiftKey" //shift key adds to selection
                }
                
            );
            
            map.addControl(selectControl);
            selectControl.activate();

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

