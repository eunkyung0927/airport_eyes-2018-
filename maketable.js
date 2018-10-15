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
function maketable(objectType, option) {
  var tb;

  $.ajax({
    url: "http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query=" + makeTableOption(objectType, option.urlOption),
    dataType: "json",
    async: false,
    success: function (d) {
        var tableOption = option.tableOption;
        var $el = document.getElementById(tableOption.targetElementId);
        var context = d.data[objectType].rows;
        var tableBody = [];
        
        for (var i = 0, len = context.length; i < len; i++) {
          var rowData = context[i];
          var rowTempArr = [];
          for(var j = 0, len2 = tableOption.columnIndex.length; j < len2; j++){ 
            var singleElement = rowData[tableOption.columnIndex[j]];
            rowTempArr.push(singleElement);
          }
          tableBody.push(rowTempArr);
        }

        tb = new TablePlayer($el, tableOption.headLabel,tableBody,10,2);
      },    
    error: function (e) {
      console.log(e.responseText)
    }
  });

  return tb;
};

function makeTableOption(objectType, urlOption){
  if(objectType === undefined) {
    throw 'objectType is required';
  }

  var option = {};

  option.objectType = objectType;
  option.startDate = urlOption.startDate || beforecurDate;
  option.ascending = urlOption.ascending || true;
  if(urlOption.endDate !== undefined) option.endDate = urlOption.endDate;

  return encodeURIComponent(JSON.stringify(option));
}
var beforecurDate = Date.now() - 2*60*60*1000;
var aftercurDate = Date.now() + 24*60*60*1000;

// make table
var depTable = maketable("dep_airplane", {
  urlOption : {
    startDate : beforecurDate,
    endDate : aftercurDate
  },
  tableOption : {
    columnIndex : [17, 8, 12, 10, 14],
    headLabel : ['TIME', 'DESTINATION', 'FLIGHT', 'CHECK IN', 'REMARKS'],
    targetElementId : "departures"
  }
});


var arrTable = maketable("airplane",  {
  urlOption : {
    startDate : beforecurDate,
    endDate : aftercurDate
  },
  tableOption : {
    columnIndex : [16, 6, 11, 10, 13],
    headLabel : ['TIME', 'FROM', 'FLIGHT', 'TERMINAL', 'REMARKS'],
    targetElementId : "arrivals"
  }
});

depTable.show();
arrTable.show();