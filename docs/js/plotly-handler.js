/*
  Jennings Anderson, Project EPIC (2020)
*/


var EpicPlotHanlder = function(plot){

  console.log("Initializing runTime object: ", plot.id);

  var currentScreenName = document.getElementById('currentScreenName');
  var currentFollowerCount = document.getElementById('currentFollowerCount');
  var currentTweetText = document.getElementById('currentTweetText');

  var clickedScreenName = document.getElementById('clickedScreenName');
  var clickedFollowerCount = document.getElementById('clickedFollowerCount');
  var clickedTweetText = document.getElementById('clickedTweetText');
  var clickedTweetId = document.getElementById('clickedTweetId');


  plot.on('plotly_hover', function(data){

    const thisIndex = data.points[0].pointIndex;
    const seriesName = data.points[0].data.name
  
    currentScreenName.innerHTML = data.points[0].data.meta.u[thisIndex]
    currentFollowerCount.innerHTML = data.points[0].data.meta.f[thisIndex]
    currentTweetText.innerHTML = DATA[seriesName].text
  })

  // add event listeners
  plot.on('plotly_click', function(data){

    const thisIndex = data.points[0].pointIndex;
    const seriesName = data.points[0].data.name
    
    console.log(thisIndex, seriesName) 

    clickedScreenName.innerHTML = data.points[0].data.meta.u[thisIndex]
    clickedFollowerCount.innerHTML = data.points[0].data.meta.f[thisIndex]
    clickedTweetText.innerHTML = DATA[seriesName].text
    clickedTweetId.innerHTML = '<a class="link" target="_blank" href="//twitter.com/i/web/status/'+
                                  data.points[0].data.meta.i[thisIndex]+'">'+
                                  data.points[0].data.meta.i[thisIndex]+'</a>'

  })
}

/*
  Silly complex ... but it works, and we're doing Object Oriented Javascript :) 
*/

var tries=0;
var plotObjects = document.getElementsByClassName('plotly-graph-div');

var runTime

var triesInterval = setInterval(function(){
    plotObjects = document.getElementsByClassName('plotly-graph-div');
    tries++;
    console.log(plotObjects.length, tries)
    
    if ( (plotObjects.length > 0) ){
      clearInterval(triesInterval)
      runTime = new EpicPlotHanlder(plotObjects.item(0))
    }else{
      if (tries>10) clearInterval(triesInterval)  
      console.warn("Failed to load after 10 seconds")
    } 
  }, 1000); 