/**
 * Created by artemis_zrj on 2016/5/23.
 */
define(["heat_map"], function () {
    var data;


    heat_map = require("heat_map");

    function read_small_city() {
        /*
         测试用的函数
         */
        var key_words = ["parking"];
        // $("#p_words > ul").children().each(function (i,d) {
        //     key_words.push(d.innerHTML);
        // });
        d3.csv("static/data/a.csv", function (error, data) {
            data.forEach(function (e) {
                e.label = e.value + "   " + e.count;
            })
            $("#city_name").autocomplete({
                source: data,
                select: function (event, ui) {
                    $.ajax({
                        type: "post",
                        url: $SCRIPT_ROOT + '/get_city_res',
                        data: {
                            "city": ui.item.value,
                            "key_words": JSON.stringify(key_words)
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log("3");
                            var re = $("#reviews");
                            data["business"].forEach(function (item) {
                                if (item[0] == "1j7xdgHkm-zU036o9EOUDw") {
                                    console.log(item);
                                }
                                item.push(item[3] * 80 / item[4]);
                                item[5].forEach(function (review) {
                                    var cc = $("<div class='review'></div>").html(review["review"]);
                                    re.append(cc);
                                })

                            })
                            console.log(data);
                            heat_map.draw_map(data);
                        }
                    })
                }
            })
        })
    }

    function read_small_city_test() {
        var key_words = ["parking"];
        $("#p_words > ul").children().each(function (i, d) {
            key_words.push(d.innerHTML);
        });

    }

    function read_big_city(city) {
        // $("#big_city_name").change(function () {
        var key_words = [];
        $("#p_words > ul").children().each(function (i, d) {
            key_words.push(d.innerHTML);
        });
        console.log(city);
        console.log(key_words);
        // var city = $(this).find("option:selected").val();
        $.ajax({
            type: "post",
            url: $SCRIPT_ROOT + "/get_big_city",
            data: {
                city: city,
                key_words:JSON.stringify(key_words)
            },
            success: function (data) {

                data = JSON.parse(data);
                console.log(data);

                var reviews = data["reviews"];
                data["businesses"].forEach(function (item) {
                    item["value"] = (item["key_count"] * 100 / item["review_count"]);
                    item["point"] = 30;
                    
                });


                var re = $("#reviews");
                re.html("");
                for(key in reviews){
                    var cc = $("<div class='review'></div>").html(reviews[key]);
                    //cc.attr("business_id","")
                    re.append(cc);
                }

                heat_map.bind_data(data);
            }
        })
        // })

    }

    function read_city_info() {
        /*
         这里的代码是用来测试的
         */
        read_big_city();
    }


    function similar_words(p_words, n_words) {
        // debugger
        $.ajax({
            type: "post",
            url: $SCRIPT_ROOT + '/get_words',
            data: {
                "p_words": JSON.stringify(p_words),
                "n_words": JSON.stringify(n_words)
            },
            success: function (data) {
                // console.log(data);
                var res_words = JSON.parse(data)

                var ul = $("#s_words > ul");
                ul.html("");
                res_words.forEach(function (item) {
                    // var li = $('<li data-cursor="pointer" style="cursor: pointer;"></li>').html(item[0]);
                    var li = $('<li></li>').html(item[0]);
                    // console.log(ul.html())
                    ul.append(li);
                });

            }
        })
    }

    function city_position() {
        /*
         这个函数用来显示各个city在地图上的标注
         */
        $.ajax({
            type: "post",
            url: $SCRIPT_ROOT + '/city_location',
            data: {
                "data": ""
            },
            success: function (data) {
                heat_map.all_city(JSON.parse(data));
            }
        })
    }

    return {
        read_city_info: read_city_info,
        similar_words: similar_words,
        city_position: city_position,
        read_big_city:read_big_city
    }
})
