/**
 * Created by artemis_zrj on 2016/5/23.
 */

require.config({
    paths: {
        leaflet: "lib/leaflet",
        heat_map: "heat_map",
        heatmap: "lib/heatmap.min",
        "get_data": "get_data",
        "HeatmapOverlay": "lib/leaflet-heatmap",
        "vue": "lib/vue",
        "data": "data"
    },
    shim: {
        "HeatmapOverlay": {
            deps: ["leaflet"]
        }
    }
})

require(["heatmap", "data", "heat_map","vue"], function (get_data, d3, $) {


    var dd = require("data");
    var heat_map = require("heat_map");
    var data = dd.data;
    data["businesses"].forEach(function (item) {
        item["value"] = (item["key_count"] * 100 / item["review_count"]);
        item["point"] = 30;
    });
    heat_map.bind_data(data);

    Vue = require("vue");
    heat_map = require("heat_map");
    Vue.config.delimiters = ['[[', ']]'];
    new Vue({
        el: '#add',
        data: {
            radius: "30"
        },
        methods: {
            change_radius: function () {
                heat_map.change_radius(this.radius * 0.0001);
            }
        }
    })

});

