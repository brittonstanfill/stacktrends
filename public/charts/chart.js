historicalBarChart = [ 
  {
    key: "Cumulative Return",
    values: [
      { 
        "label" : "JAVASCRIPT" ,
        "value" : 554343
      } , 
      { 
        "label" : "RUBY" , 
        "value" : 462902
      } , 
      { 
        "label" : "JAVA" , 
        "value" : 383585
      } , 
      { 
        "label" : "PYTHON" , 
        "value" : 278990
      } , 
      { 
        "label" : "PHP" ,
        "value" : 272597
      }
    ]
  }
];



nv.addGraph(function() {  
  var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .staggerLabels(true)
      //.staggerLabels(historicalBarChart[0].values.length > 8)
      .tooltips(false)
      .showValues(true)
      .transitionDuration(250)
      ;

  d3.select('#chart1 svg')
      .datum(historicalBarChart)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;
});