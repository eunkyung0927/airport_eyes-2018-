var getFlightData = function (objectType, interval, targetElementId,rightOrder) {
  var returnObj = {};
  var indexNum=[];
  $.ajax({
    url: 'http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query=' + makeChartOption(objectType),
    datatype: "json",
    success: function (d) {
      var originalData = d.data[objectType].rows;
      var delayRateData = [];
      var depCancelRateData = [];
      var airlineData = [];
      var index=[];
      var rawArr = [];//원본데이터의 columns에 해당하는 값들 저장 
      //column값을 기준으로 rows의 데이터를 가져오도록하는 columnIndex생성
      function makeIndex(arr, rightOrder) {
        var cacheObj = {};
        for (var idx = 0, len = rightOrder.length; idx < len; idx++) {
          var value = rightOrder[idx];
          if (cacheObj.hasOwnProperty(value)) {
            throw new Error('error');
          } else {
            cacheObj[value] = -1;
          }
        }
        for (var i = 0, len = arr.length; i < len; i++) {
          var value = arr[i];
          if (cacheObj[value] === -1) {
            cacheObj[value] = i;
          }
          //else {
          // throw new Error('error'); 
          //}
        }
        for(var key in cacheObj){
          index.push(cacheObj[key]);
        }
         return index;
      }
      for (i = 0, len = d.data[objectType].columns.length; i < len; i++) {
        rawArr.push(d.data[objectType].columns[i]);
      }
      indexNum=makeIndex(rawArr,rightOrder);
      for (var i = 0, len = originalData.length; i < len; i++) {
        var rowData = originalData[i];
        delayRateData.push(rowData[indexNum[1]] || 0);
        depCancelRateData.push(rowData[indexNum[2]] || 0);
        airlineData.push(rowData[indexNum[0]]);
      }
      returnObj = {
        delayRateData: delayRateData,
        depCancelRateData: depCancelRateData,
        airlineData: airlineData
      };
      var chart = makeChart(returnObj, interval, targetElementId);
      chart.make();
    },
    error: function (e) {
      console.log(e.responseText)
    }
  });
  return returnObj
};

function makeChartOption(objectType) {
  if (objectType === undefined) {
    throw 'objectType is required';
  }
  var option = {};
  option.objectType = objectType;
  return encodeURIComponent(JSON.stringify(option));
}

function makeChart(data, showCount, targetElementId) {
  var delayColumnData = [];
  var depCancelColumnData = [];

  for (var i = 0, len = data.delayRateData.length; i < len; i++) {
    var adata = data.airlineData[i];
    var ddata = data.delayRateData[i];
    var cdata = data.depCancelRateData[i];
    if (ddata > 100) {
      ddata = 100;
    }
    delayColumnData.push([adata, ddata]);
    depCancelColumnData.push([adata, cdata]);
  }
  // page 계산
  var curPage = 1,
    maxPage;
  var timer;
  var maxPage = Math.ceil(data.delayRateData.length / showCount);
  var getNextPage = function () {
    if (curPage < maxPage) {
      curPage++;
    } else {
      curPage = 1;
    }
    return curPage;
  }

  var partialData = function () {
    var startIdx = (curPage - 1) * showCount;
    var endIdx = curPage < maxPage ? curPage * showCount : data.delayRateData.length;
    var pDelayData = delayColumnData.slice(startIdx, endIdx);
    var pDepCancelData = depCancelColumnData.slice(startIdx, endIdx);
    var pData = {};
    pData = {
      pDelayData: pDelayData,
      pDepCancelData: pDepCancelData
    };
    return pData;
  }


  var render = function (pData) {
    c3.generate({
      bindto: document.getElementById(targetElementId),
      data: {
        columns: pData.pDelayData,
        type: 'bar'
      },
      axis:{
        x:{
              show:false 
        },
        y:{
          max:90
        }
      }

    });
    if (targetElementId === "departuredelay") {
      var cancel = pData.pDepCancelData;
      if (parseInt(cancel[0][1] || cancel[1][1] || cancel[2][1] || cancel[3][1] || cancel[4][1] || cancel[5][1] || cancel[6][1]) === 0) {
        document.getElementById("departurecancellation").innerHTML = '<p style="font-size: 20px;padding: 15%;text-align: center;"> NO CANCELLED FLIGHT THIS MONTH</p>';
        // $('#departurecancellation').textContent = 'NO CANCELLED FLIGHT THIS MONTH';
      } else {
        c3.generate({
          bindto: document.getElementById("departurecancellation"),
          data: {
            columns: pData.pDepCancelData,
            type: 'bar'
          },
        });
      }
    }
    curPage = getNextPage();
  }
  var make = function () {
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        var data = partialData();
        render(data);
        make();
      }, 3000);
    }
  }
  return {
    make: make
  }
}
// execute main()
var depRightOrder=["airline","delayRate","cancelRate"];
var arrRightOrder=["airline","delayRate"]
getFlightData("dep_monthlyFlightInfo",7,"departuredelay",depRightOrder);
getFlightData("monthlyFlightInfo", 7,"arrivaldelay",arrRightOrder);