/**
 * 
 * @param {String} objectType objectType의 이름
 * @param {Object} option 
 * 
 * example- 
 * 
 * urlOption : {
    startDate : curDate,
    endDate : Date.now() - 7200000
  },
  tableOption : {
    columnIndex : [13, 3, 8, 7, 10],
    headLabel : ['TIME', 'FROM', 'FLIGHT', 'TERMINAL', 'REMARKS'],
    targetElementId : "arrivals"
  }
 */
var beforecurDate = Date.now() - 2 * 60 * 60 * 1000;
var aftercurDate = Date.now() + 24 * 60 * 60 * 1000;

function maketable(objectType, option) {
  var tb;
  var rawArr = [];//원본데이터의 columns에 해당하는 값들 저장 
  $.ajax({
    url: "http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query=" + makeTableOption(objectType, option.urlOption),
    dataType: "json",
    async: false,
    success: function (d) {
      var tableOption = option.tableOption;
      var $el = document.getElementById(tableOption.targetElementId);
      var context = d.data[objectType].rows;
      var columnData = d.data[objectType].columns;
      var tableBody = [];
      var index=[];
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
      for (i = 0, len = columnData.length; i < len; i++) {
        rawArr.push(columnData[i]);
      }
      makeIndex(rawArr, option.rightOrder);
      for (var i = 0, len = context.length; i < len; i++) {
        var rowData = context[i];
        var rowTempArr = [];
        for (var j = 0, len2 = index.length; j < len2; j++) {
          var singleElement = rowData[index[j]];
          rowTempArr.push(singleElement);
        }
        tableBody.push(rowTempArr);
      }
      tb = new TablePlayer($el, tableOption.headLabel, tableBody, 10, 2);
    },
    error: function (e) {
      console.log(e.responseText)
    }
  });
  return tb;

}

function makeTableOption(objectType, urlOption) {
  if (objectType === undefined) {
    throw 'objectType is required';
  }

  var option = {};

  option.objectType = objectType;
  option.startDate = urlOption.startDate || beforecurDate;
  option.ascending = urlOption.ascending || true;
  if (urlOption.endDate !== undefined) option.endDate = urlOption.endDate;

  return encodeURIComponent(JSON.stringify(option));
}
// make table
var depTable = maketable("dep_airplane", {
  rightOrder: ["time", "airport", "flightId", "chkinrange", "remark"],
  urlOption: {
    startDate: beforecurDate,
    endDate: aftercurDate
  },
  tableOption: {
    headLabel: ['TIME', 'DESTINATION', 'FLIGHT', 'CHECK IN', 'REMARKS'],
    targetElementId: "departures"
  }
});
var arrTable = maketable("airplane", {
  rightOrder: ["time", "airport", "flightId", "exitnumber", "remark"],
  urlOption: {
    startDate: beforecurDate,
    endDate: aftercurDate
  },
  tableOption: {
    headLabel: ['TIME', 'FROM', 'FLIGHT', 'EXIT GATE', 'REMARKS'],
    targetElementId: "arrivals"
  }
});
depTable.show();
arrTable.show();