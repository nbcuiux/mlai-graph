/* ==========================================================================
    Convert time to proper date format
 * ========================================================================== */
function sec2timestamp(sec) {
    // Convert seconds to milliseconds first
    var duration = sec * 1000;

    // Parse value
    var milliseconds = parseInt((duration%1000)), 
        seconds = parseInt((duration/1000)%60), 
        minutes = parseInt((duration/(1000*60))%60), 
        hours = parseInt((duration/(1000*60*60))%24);

    // Add zero's as necessary
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // You have to provide YYYY-MM-DD for plotly to understand it as a date (Date is hidden from frontend)
    return '2017-01-01 '+ hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

/* ==========================================================================
    Global Variables
 * ========================================================================== */
var mapArr = [],
    buttonArr = [];
    colori = 0;

var colorPalette = ['#631357', '#AD1457', '#F06292', '#F48FB1', '#FAB9CF'];

var dataJSON = {
  "Nudity": {
    "21.855": 55,
    "596.963": 89.8,
    "597.129": 97.9,
    "597.73": 97.3,
    "597.93": 96.3,
    "598.13": 92.8,
    "598.731": 60.1,
    "598.931": 98.1,
    "599.131": 98.9,
    "599.732": 84.6,
    "599.932": 97.8,
    "600.132": 82.1,
    "600.333": 51.3,
    "600.533": 84.2,
    "600.733": 90,
    "600.933": 98.7,
    "601.133": 97.3,
    "601.334": 96.1,
    "607.74": 56.5,
    "702.601": 55.4,
    "704.003": 56.4,
    "743.175": 55.9,
    "777.576": 52.6,
    "1006.939": 77.5,
    "1342.708": 58.1,
    "1408.64": 98.5,
    "1409.441": 99.1,
    "1487.886": 54.4,
    "1512.043": 58.6,
    "1512.244": 52.7,
    "1512.444": 65,
    "1512.644": 79.1,
    "1512.844": 91.6,
    "1513.044": 97.5,
    "1513.245": 91.6,
    "1519.651": 62.7,
    "1534.199": 81.5,
    "1534.399": 90.7,
    "1619.15": 55.1,
    "1815.38": 72.2,
    "1895.126": 94.7,
    "1895.927": 61.7,
    "2075.44": 53.1,
    "2121.652": 56.3,
    "2321.218": 84.3,
    "2389.22": 57.9
  },
  "Graphic Male Nudity": {
    "21.855": 50.9,
    "228.394": 56.9,
    "236.202": 91.9,
    "564.163": 54.9,
    "567.967": 59.3,
    "604.537": 91.8,
    "605.738": 50.4,
    "605.938": 62.6,
    "651.15": 93.6,
    "702.001": 81.8,
    "778.577": 63.1,
    "779.111": 64.2,
    "1003.535": 59.5,
    "1007.139": 54.4,
    "1007.339": 93.9,
    "1007.539": 95.4,
    "1007.74": 83.1,
    "1302.701": 72.9,
    "1339.738": 89.4,
    "1478.91": 54.5,
    "1480.278": 67.2,
    "1493.492": 54.7,
    "1589.621": 92.5,
    "1630.962": 71.9,
    "1740.271": 56.9,
    "1778.076": 64.9,
    "2073.838": 52.5,
    "2133.664": 58.4,
    "2135.266": 50.2,
    "2135.466": 99.1,
    "2138.069": 55.7,
    "2337.635": 98.7,
    "2447.278": 50.2,
    "2450.281": 66.8,
    "2485.082": 57.1
  },
  "Graphic Female Nudity": {
    "21.454": 71.2,
    "283.85": 51.6,
    "605.137": 65,
    "606.339": 65.2,
    "612.345": 65.4,
    "613.145": 97.7,
    "703.002": 87.5,
    "703.202": 59.4,
    "703.402": 93.7,
    "703.602": 92.9,
    "703.803": 84.5,
    "704.003": 85.2,
    "704.203": 94.6,
    "778.577": 60.4,
    "779.578": 84.8,
    "779.712": 84.6,
    "780.513": 76.5,
    "1478.91": 75.1,
    "1479.01": 80.6,
    "1479.077": 55.2,
    "1479.211": 74.8,
    "1479.277": 89.3,
    "1479.411": 60.6,
    "1479.478": 61.5,
    "1479.611": 89.6,
    "1479.678": 84.7,
    "1479.811": 96.5,
    "1479.878": 96.6,
    "1480.078": 94.1,
    "1480.278": 81.4,
    "1492.824": 93.8,
    "1873.938": 54.7,
    "2264.395": 60.1
  },
  "Sexual Activity": {
    "45.545": 75.7,
    "346.546": 58.6,
    "598.13": 52.2,
    "599.732": 51.1,
    "599.932": 61.1,
    "600.132": 59.7,
    "600.533": 71.6,
    "600.733": 61.6,
    "600.933": 59.6,
    "601.133": 61.9,
    "601.334": 59.3,
    "603.736": 50.3,
    "603.936": 54.4,
    "604.136": 69,
    "604.737": 95.5,
    "604.937": 70.1,
    "605.137": 59.9,
    "605.338": 58.1,
    "605.538": 65.7,
    "605.738": 63.3,
    "605.938": 89.6,
    "606.138": 85.6,
    "606.539": 53.8,
    "606.739": 82.7,
    "606.939": 90.5,
    "607.139": 93.7,
    "607.34": 84.7,
    "607.54": 84,
    "607.74": 50.8,
    "608.14": 72.4,
    "608.341": 75.1,
    "608.541": 77.1,
    "608.741": 81.8,
    "608.941": 57.4,
    "609.141": 62.7,
    "609.542": 69.6,
    "611.344": 77.2,
    "611.544": 88.8,
    "611.744": 87.1,
    "611.944": 95.6,
    "612.144": 96.2,
    "612.345": 74.2,
    "612.745": 69.7,
    "612.945": 79.6,
    "702.601": 82.5,
    "702.802": 79.7,
    "703.002": 80.3,
    "703.202": 87.2,
    "703.402": 85.2,
    "703.602": 89.8,
    "703.803": 85.9,
    "704.003": 59.1,
    "704.203": 69.2,
    "777.309": 55.7,
    "778.31": 57.4,
    "779.311": 80.6,
    "1008.54": 59.1,
    "1010.943": 76.8,
    "1011.143": 93.6,
    "1011.343": 91.7,
    "1011.543": 62,
    "1011.944": 62.8,
    "1012.144": 59.3,
    "1012.745": 93.9,
    "1013.545": 54.1,
    "1434.199": 54.5,
    "1479.211": 54.6,
    "1492.29": 59.4,
    "1492.824": 50.4,
    "1637.569": 63,
    "1811.576": 80.6,
    "2073.838": 72.9,
    "2265.196": 60.8
  },
  "Partial Nudity": {
    "343.142": 52.8
  }
};

/* ==========================================================================
    Convert JSON data into plot.ly readable data
 * ========================================================================== */
for (var category in dataJSON) {
  var xArr = [],
      yArr = [],
      items = dataJSON[category];

  if (Object.keys(items).length != 0) {
    for (var item in items) {
      itemInSeconds = sec2timestamp(item);
      xArr.push(itemInSeconds);
      yArr.push(items[item]);
    }
    // Create data objects for each section of the graph
    catergoryObj = {
      x: xArr,
      y: yArr,
      mode: 'markers',
      type: 'scatter',
      name: category,
      hoverinfo: 'x+text',
      hoverlabel: {
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        bordercolor: 'rgba(0, 0, 0, 0.8)',
        font: {
          size: 11,
          family: 'Arial',
          color: '#ffffff'
        }
      },
      // text: custom hover label text added in plotly_hover event,
      marker: { 
        size: 6, 
        color: colorPalette[colori]
      }
    };
    // Create array of buttons to add to DOM later (custom legend)
    buttonObj = {
      id: colori,
      label: category,
      color: colorPalette[colori]
    };
    // Push plotly object/button object to an array (for later use)
    buttonArr.push(buttonObj);
    mapArr.push(catergoryObj);
    // Increase color count (for legend)
    colori++;
  }
}

/* ==========================================================================
    Add layout preferences for plot.ly graph
 * ========================================================================== */
var layout = {
  showlegend: false,
  font: {
    family: 'Arial',
    size: 11
  },
  hovermode: 'closest',
  margin: {
    l: 10,
    r: 40,
    b: 40,
    t: 10,
    pad: 4
  },
  // Sets graph to color of the panel
  paper_bgcolor: '#bdbdbd',
  plot_bgcolor: '#bdbdbd',
  xaxis: {
    color: '#ffffff', 
    type: 'date',
    showline: true,
    linecolor: '#ffffff',
    showgrid: false,
    spikethickness: 1,
    spikemode: 'across',
    spikedistance: 10,
    spikecolor: '#ffffff',
    tickformat: '%H:%M:%S.%3f',
    nticks: 7,
    tickwidth: 1,
    tickcolor: '#ffffff'
  },
  yaxis: {
    color: '#ffffff',
    ticksuffix: '%',
    gridcolor: '#ffffff',
    showline: true,
    linecolor: '#ffffff',
    side: 'right',
    tickwidth: 1,
    tickcolor: '#ffffff'
  }
};

/* ==========================================================================
    Create plot.ly graph
 * ========================================================================== */
(function() {
  // Init graph
  var d3 = Plotly.d3;

  var gd3 = d3.select('.chart__wrapper')
    .append('div')
    .attr('id', 'scatterPlot')
    .style({
      width: '100%',
      height: '370px',
  });

  var gd = gd3.node();

  // Create graph and pass data and layout options
  Plotly.plot(gd, mapArr, layout);

  // Resize the graph when needed
  window.onresize = function() {
    Plotly.Plots.resize(gd);
  };

  /* ==============================================
   * Filter Y Value
   * ============================================== */
  $('#heatMapRangeFilter').on('input', function(element) {
    var sliderAmount = $(this).val(),
        graphUpdate = {
          'yaxis.range': [sliderAmount, 100],
        };

    // Update text on front end
    $('.chart__slider--value').html(sliderAmount);
    
    // Initialize relayout
    Plotly.relayout("scatterPlot", graphUpdate);
  });

  /* ==============================================
   * Customize Tooltip
   * ============================================== */
  gd.on('plotly_hover', function(eventData) {
    // Get data points values
    var markerColor    = eventData.points[0].fullData.marker.color,
        tooltipValY    = eventData.points[0].data.y[eventData.points[0].pointIndex],
        tooltipValName = eventData.points[0].fullData.name;

    // Set tooltip's text area with relevant info (custom styling)
    var graphUpdate = eventData.points[0].data.text = '<span style="font-size: 10px; line-height: 20px; color: ' + markerColor + '">' + decodeURI('%E2%AC%A4') + '</span> ' + tooltipValName + ' | ' + tooltipValY + '%';
    // Update the graph
    Plotly.relayout("scatterPlot", graphUpdate);
  });

  /* ==============================================
   * Update slider values on zoom
   * ============================================== */
  gd.on('plotly_relayout', function(eventData){  
    var minConfidence = Math.round(eventData['yaxis.range[0]']);
    
    if (!isNaN(minConfidence)) {
      $('.chart__slider--value').html(minConfidence);
      $('#heatMapRangeFilter').val(minConfidence);
    }
  });
  // Reset to original value when double clicked
  gd.on('plotly_doubleclick', function() {
    $('.chart__slider--value').html('45');
    $('#heatMapRangeFilter').val(45);
  });

  /* ==============================================
   * Add legend buttons to the DOM
   * ============================================== */
   buttonArr.forEach(function(element) {
    $('.legend').append('<button class="legend__btn" data-indexnumber="' + element.id + '">' + element.label + '<span style="background: ' + element.color + '"></span></button>')
   });
  /* ==============================================
   * Custom Legend (toggle buttons)
   * ============================================== */
  $('.legend__btn').on('click', function(){
    var btn_id = $(this).data('indexnumber'),
        data_index = btn_id,
        myDiv = document.getElementById("scatterPlot"),
        visible = myDiv.data[data_index].visible;

    // Set visibility of each data point
    if (visible === undefined) visible = true;
    // Update class of button element based off visibility
    (visible === true) ? $(this).addClass('unselected') : $(this).removeClass('unselected');
    // Uncheck 'Select All' button
    $('#graphSelectAll').prop('checked', false); 
    // Update graph
    Plotly.restyle("scatterPlot", 'visible', !visible, data_index);

    // If all 5 checkboxes are marked set the select all to true
    if($(".legend__btn:not(.unselected)").length === 5) {
      $('#graphSelectAll').prop('checked', true);
    }
  });
  /* ==============================================
   * Select All Legend
   * ============================================== */
  $('#graphSelectAll').on('change', function(){
    var myDiv = document.getElementById("scatterPlot"),
        visible;

    if ($(this).is(':checked')) {
      // Deselect all element styles
      $('.legend__btn').each(function() {
        $(this).removeClass('unselected');
      });
      // Set visibility
      visible = true;
    } else {
      // Select all element styles
      $('.legend__btn').each(function() {
        $(this).addClass('unselected');
      });
      // Set visbility
      visible = false;
    }
    // Update graph
    Plotly.restyle("scatterPlot", 'visible', visible);
  });
})();