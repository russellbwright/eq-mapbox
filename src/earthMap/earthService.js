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



    var quakeButtonInfo = {
        "past hour": {
            "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
            "all 2.5+": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson"
        },
        "past day": {
            "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
            "all 4.5+": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
        },
        "past week": {
            "all 2.5+": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",
            "all 4.5+": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
        },
        "past 30 days": {
            "all earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
            "significant earthquakes": "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
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
            url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"

        }).then(function(data){
            map.on('load', function(){
                map.addSource("earthquakes", {
                    type: "geojson",
                    data: data.data,
                    
                })

                map.addLayer({
                    id: "singleMarkers",
                    type: "circle",
                    source: "earthquakes",
                    paint: {
                        "circle-radius": 15,
                        "circle-color": '#6dfaff',
                        "circle-opacity": 1,
                        "circle-blur": 0
                    }
                })

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
                        "text-size": 12
                    },
                    paint: {
                        "text-color": "#000"
                    }
                });
            })

            
            return data
        })
    }

    // this.mapQuest()

    this.quaker = function(){
        return $http({
            method: 'GET',
            url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

        }).then(function(data){
            
            return data.data
        })
    }
    






})