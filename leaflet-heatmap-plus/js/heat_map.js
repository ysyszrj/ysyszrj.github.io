/**
 * Created by artemis_zrj on 2016/5/23.
 */
define(['leaflet', "HeatmapOverlay"], function (leaflet) {
    var mymap;
    var heatmapLayer;
    var data_source="words";
    var saved_data={};
    var new_layer;

    draw_map();

    function draw_map() {
        HeatmapOverlay = require("HeatmapOverlay");
        mymap = L.map('mapid');

        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
        var streets = L.tileLayer(mbUrl, {
            maxZoom: 18,
            attribution: mbAttr,
            id: 'mapbox.streets'
        });

        var grayscale = L.tileLayer(mbUrl, {
            maxZoom: 18,
            attribution: mbAttr,
            id: 'mapbox.light'
        });

        var baseLayers = {
            "Grayscale": grayscale,
            "Streets": streets
        };


        grayscale.addTo(mymap);

        /*
         这里开始
         */
        var cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            // if scaleRadius is false it will be the constant radius used in pixels
            "radius": 0.003,
            // scales the radius based on map zoom
            "scaleRadius": true,
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries
            //   (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": false,
            // which field name in your data represents the latitude - default "lat"
            latField: 'latitude',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'longitude',
            // which field name in your data represents the data value - default "value"
            valueField: 'value',
            gradient: {
                ".7": "#fc9272",
                ".8": "#fd8d3c",
                ".9": "#f03b20",
                "1": "#bd0026"
            },
            maxOpacity: 0.9,
            // minOpacity:0,
            // blur: .55
        };

        var cfg2 = {

            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            // if scaleRadius is false it will be the constant radius used in pixels
            "radius": 0.003,
            // scales the radius based on map zoom
            "scaleRadius": true,
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries
            //   (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": false,
            // which field name in your data represents the latitude - default "lat"
            latField: 'latitude',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'longitude',
            // which field name in your data represents the data value - default "value"
            valueField: 'value',
            gradient: {

                ".7": "#a6d96a",
                ".8": "#66bd63",
                ".9": "#1a9850",
                "1": "#006837"
            },
            maxOpacity: 0.3,
            // minOpacity:0,
            // blur: .55
        };

        heatmapLayer = new HeatmapOverlay(cfg);
        new_layer = new HeatmapOverlay(cfg2);
        new_layer.addTo(mymap);
        heatmapLayer.addTo(mymap);
    }


    function change_radius(radius) {
        heatmapLayer.changeRadius(radius);
    }


    function bind_data(data) {

        mymap.setView([data["info"][2], data["info"][1]], 12);
        var final_data = [];
        var normal_data = [];
        data["businesses"].forEach(function (item) {
            if (item["key_count"] > 0) {
                final_data.push(item);
            }else{
                normal_data.push(item);
            }
        });

        saved_data["words"] = final_data;
        saved_data["all"] = data["businesses"];
        new_layer.setData({max:0,data:normal_data});
        big_heatmap(data_source);

    }


    function big_heatmap(data_source) {
        /*
         大城市的heat map，没有评论的餐馆不管它，先画一个
         */
        if(data_source==="all"){
            heatmapLayer.configure()
        }

        console.log(saved_data[data_source]);
        heatmapLayer.setData({max: 50, data: saved_data[data_source]});

    }

    
    return {
        draw_map: draw_map,
        big_heatmap: big_heatmap,
        change_radius:change_radius,
        bind_data:bind_data
    };
});