$(function() {
    var mymap = L.map('mapid').setView([47.08, 2.39], 7);


    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieWF5b3U0OCIsImEiOiJjamppaTVmb3gyaW9vM3dvbDl1eTRwMjJlIn0.T-2LUM3QOsgSS6F41A_nMw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',



        maxZoom: 7,
        minZoom: 7,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    mymap.bounds = [],

        mymap.setMaxBounds([
            [47.08, 2.39],
            [47.08, 2.39]
        ]);
    $.ajax({
        url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=105&facet=code_dept',
        dataType: "json",
        success: function(data) {
            for (dept of data['records']) {
                var shape = dept['fields']['geo_shape'];
                L.geoJSON(shape).addTo(mymap);
                var chfLieu = dept['fields']['nom_chf'];

                $.get({
                    url: 'http://api.openweathermap.org/data/2.5/weather?q='+ chfLieu+',fr&appid=4ae1deede5f40b035e56949606e20525',
                    dataType: "json",
                    success: function(weather) {
                        console.log(weather);
                    }
                })
            }
        }

    })
    var marker = L.marker([44.52, 3.5]).addTo(mymap);
});
