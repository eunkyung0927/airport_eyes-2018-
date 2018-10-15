function makeOption(objectType) {
  if (objectType === undefined) {
    throw 'objectType is required';
  }
  var option = {};
  option.objectType = objectType;
  return encodeURIComponent(JSON.stringify(option));
}
//var dataContainer=["#departuredelay","#arrivaldelay","#departurecancellation"];
var delayRateData = [];
var cancelRateData = [];
var airlineData = [];   
var depDalayColumnData=[];
var depCancelColumnData =[];
var showCount = 5;


function makechart(objectType) {
  $.ajax({
    url: "http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query=" + makeOption(objectType),
    datatype: "json",
    success: function (d) {
      var originalData = d.data[objectType].rows;
      
      for (var i = 0, len = originalData.length; i < len; i++) {
        var rowData = originalData[i];
        delayRateData.push(rowData[3] || 0);
        cancelRateData.push(rowData[2] || 0);
        airlineData.push(rowData[10]);
      }
      
      for(var i = 0, len = delayRateData.length; i < len; i++){
        var adata = airlineData[i];
        var ddata = delayRateData[i];
        var cdata = cancelRateData[i];
        depDalayColumnData.push([adata,ddata]);
        depCancelColumnData.push([adata,cdata]);
      }
      
      var curPage = 1;
      var maxPage = Math.ceil(delayRateData.length /showCount);
      function nextPage(){
        if (curPage < maxPage) {
          curPage++;
        } else {
          curPage = 1;
        }
      }
      
      function partialdata(){
        var startIdx = (curPage - 1) * showCount;
        var endIdx = curPage < maxPage ? curPage * showCount: delayRateData.length;
        var pDelaydata=depDalayColumnData.slice(startIdx, endIdx);
        var pCanceldata=depCancelColumnData.slice(startIdx, endIdx);
        console.log(pDelaydata);
        console.log(pCanceldata);
      //for(var conIndex = 0, len = conIndex.length; conIndex < len;conIndex++){ 
        
       c3.generate({
          bindto: "#departuredelay",
          data: {
            columns: pDelaydata,
            type: 'bar',
          },
        });

      // c3.generate({
      //   bindto: "#arrivaldelay",
      //   data: {
      //     columns: [
      //       [airlineData[0], delayRateData[0]]
      //     ],
      //     type: 'bar',
      //   },
      // });
         //cancelrate data가 전부 0인경우 차트를 그리지 않는 예외처리 
        console.log(cdata[0] + cdata[1] + cdata[2] + cdata[3] + cdata[4] + cdata[5]);
        if (cdata[0] + cdata[1] + cdata[2] + cdata[3] + cdata[4] + cdata[5] == 0) {
          $('#departurecancellation').empty();
          document.getElementById('departurecancellation').innerHTML = 'NO CANCELLED FLIGHT THIS MONTH';
        }else{
          c3.generate({
            bindto: "#departurecancellation",
            data: {
              columns: pCanceldata,
              type: 'bar',
            },
          });
        }
        console.log(curPage);  
        nextPage();
      }
      setInterval(partialdata, 2000);
    }
  })
}

makechart("dep_monthlyFlightInfo");
// makechart("monthlyFlightInfo");