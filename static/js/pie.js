
var url = "/genre";

d3.json(url)
  .then(function(response) {

    data = response.filter(genre => genre.count > 3)
    console.log(data)

    var labels = data.map(genre => genre.genre);
    var values = data.map(genre => genre.count);



    var pie = [{
        values: values,
        labels: labels,
        type: 'pie'
    }];
    
    var layout = {
        title: "Genre Count of Top 100 artists",
        height: 500,
        width: 500
    };
    
    Plotly.newPlot('pie', pie, layout);

});