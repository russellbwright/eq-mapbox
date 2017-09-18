angular.module('earthApp').service('earthService', function($http){
var map;
    this.intiMap = function(){
        mapboxgl.accessToken = 'pk.eyJ1IjoicnVzc2VsbGJ3cmlnaHQiLCJhIjoiY2o3a3JibWIwMHIxazMycW51NHB4c3VuNCJ9.sZkGh2UGSZKRQORo20LVxA';
        map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [-96.79, 32.77],
        zoom: 5,
        })
        return;
    }
    // mapboxgl.accessToken = 'pk.eyJ1IjoicnVzc2VsbGJ3cmlnaHQiLCJhIjoiY2o3a3JibWIwMHIxazMycW51NHB4c3VuNCJ9.sZkGh2UGSZKRQORo20LVxA';
    // var map = new mapboxgl.Map({
    // container: 'map',
    // style: 'mapbox://styles/mapbox/dark-v9',
    // center: [-96.79, 32.77],
    // zoom: 5,
    // })

    
    // var layerList = document.getElementById('menu');
    // var inputs = layerList.getElementsByTagName('input');
    
    // function switchLayer(layer) {
    //     var layerId = layer.target.id;
    //     map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
    // }
    
    // for (var i = 0; i < inputs.length; i++) {
    //     inputs[i].onclick = switchLayer;
    // }



    var framesPerSecond = 15; 
    var initialOpacity = 1
    var opacity = initialOpacity;
    var initialRadius = 8;
    var radius = initialRadius;
    var maxRadius = 23;


    

    var quakeButtonInfo = {
        "Past Hour": {
            "All Earthquakes": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
            "All 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson"
        },
        "Past Day": {
            "All Earthquakes": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
            "All 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
        },
        "Past Week": {
            "All 2.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
            "All 4.5+": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
        },
        "Past 30 Days": {
            "All Earthquakes": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
            "Significant Earthquakes": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
        }
    };
this.fixIt = function(){
    this.makeQuakeButtons = function(obj, currentProp) {
        var childProps = '';
        for (var prop in quakeButtonInfo[currentProp]) {
            var quakeChange = "<div class='child-prop'><button class='feed-name' data-feedurl='" + quakeButtonInfo[currentProp][prop] + "'>" + prop + "</button></div>";
            childProps += quakeChange;
        }
        
        return childProps;
    }


    for (var prop in quakeButtonInfo) {
        if (!quakeButtonInfo.hasOwnProperty(prop)) {
            continue;
        }
        $('#feedSelector').append("<div class='feed-date'>" + prop + "</div>" + this.makeQuakeButtons(quakeButtonInfo, prop));
        
    }


    $('.feed-name').click(function(e){
        var source = map.getSource('earthquakes');
        $.ajax({
            url: $(e.target).data('feedurl'),
            complete: function(data) {
                source.setData(data.responseJSON);
                console.log(data.responseJSON);
            }
        });
    });


};


    
    this.mapQuest = function(){
        return $http({
            method: 'GET',
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"

        }).then(function(data){
            map.on('load', function(){
                map.addSource("earthquakes", {
                    type: "geojson",
                    data: data.data,
                    
                })

                // map.addLayer({
                //     id: "singleMarkers",
                //     type: "circle",
                //     source: "earthquakes",
                //     paint: {
                //         "circle-radius": 15,
                //         "circle-color": '#6dfaff',
                //         "circle-opacity": 1,
                //         "circle-blur": 0
                //     }
                // })

                

                // map.addLayer({
                //     id: "magLayer",
                //     type: "symbol",
                //     source: "earthquakes",
                //     layout: {
                //         "text-field": "{mag}",
                //         "text-font": [
                //                 "DIN Offc Pro Medium",
                //                 "Arial Unicode MS Bold"
                //             ],
                //         "text-size": 12
                //     },
                //     paint: {
                //         "text-color": "#000"
                //     }
                // })



                map.addLayer({
                    id: "point",
                    source: "earthquakes",
                    type: "circle",
                    paint: {
                        "circle-radius": initialRadius,
                        "circle-radius-transition": {duration: 0},
                        "circle-opacity-transition": {duration: 0},
                        "circle-color": "#FD0E35"
                    }
                });
            
                map.addLayer({
                    id: "point1",
                    source: "earthquakes",
                    type: "circle",
                    paint: {
                        "circle-radius": initialRadius,
                        "circle-color": "#AAEEFF"
                    }
                });

                
                // map.addSource({
                //     id: "point1",
                //     source: "earthquakes",
                //     type: "image",
                //     url: '../../img/DM.png',
                //     // paint: {
                //     //     "circle-radius": initialRadius,
                //     //     "circle-color": "#6dfaff"
                //     // }
                // });


              


                map.addLayer({
                    id: "magLayer",
                    type: "symbol",
                    source: "earthquakes",
                    layout: {
                        "text-field": "{mag}",
                        "text-font": [
                                "DIN Offc Pro Medium",
                                "Arial Unicode MS Bold"
                            ],
                        "text-size": 11
                    },
                    paint: {
                        "text-color": "#000"
                    }
                })


                map.on('click', 'point1', function(e){
                    new mapboxgl.Popup()
                     .setLngLat(e.features[0].geometry.coordinates)
                     .setHTML(e.features[0].properties.title)
                     .addTo(map);
                });
 
                map.on('mouseenter', 'point1', function(){
                    map.getCanvas().style.cursor = 'pointer';
                });
 
                map.on('mouseleave', 'point1', function(){
                    map.getCanvas().style.cursor = '';
                });


                // control.scale().addTo(map);


                function animateMarker(timestamp) {
                    setTimeout(function(){
                        requestAnimationFrame(animateMarker);
            
                        radius += (maxRadius - radius) / framesPerSecond;
                        opacity -= ( .9 / framesPerSecond );
            
                        map.setPaintProperty('point', 'circle-radius', radius);
                        map.setPaintProperty('point', 'circle-opacity', opacity);
            
                        if (opacity <= .1) {
                            radius = initialRadius;
                            opacity = initialOpacity;
                        } 
            
                    }, 1000 / framesPerSecond);
                    
                }
            
                // Start the animation.
                animateMarker(0);


            })

            
            return data
        })
    }

    // this.mapQuest()

    this.quaker = function(){
        return $http({
            method: 'GET',
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

        }).then(function(data){
            
            return data.data
        })
    }
    






})