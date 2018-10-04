var objecttype={
  0: "dep_airplane",
  1: "airplane"
};
var startDate = Date.now() - 3600000;

var queryString ={
  0: encodeURIComponent(JSON.stringify({
    objectType: objecttype[0],
    startDate: startDate,
    ascending: true
  })),
  1: encodeURIComponent(JSON.stringify({
    objectType: objecttype[1],
    startDate: startDate,
    ascending: true
  }))
};

function maketable(option) {
  var depHead = ['TIME', 'DESTINATION', 'FLIGHT', 'CHECK IN', 'REMARKS'];
  var arrHead = ['TIME', 'FROM', 'FLIGHT', 'TERMINAL', 'REMARKS'];
  var depBody = [], arrBody = [];
  var basicurl = "http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query=";
  
  $.ajax({
    url: basicurl + option,
    dataType: "json",
    success: function (d) {
      function dep(){
        var depcontext = d.data.dep_airplane.rows;
        for (var i = 0; i < depcontext.length; i++) {
          var deparr =  depcontext[i];
          var arr2 = [deparr[17],deparr[7],deparr[11],deparr[9],deparr[13]];
          depBody.push(arr2);
        }
          var $el = document.getElementById('departures');
          var tb = new TablePlayer($el, depHead, depBody, 10, 2);
          tb.show();
      };
      function arr(){
          var context = d.data.airplane.rows;
          for (var i = 0; i < context.length; i++) {
            var arrarr =  context[i];
            var arr = [arrarr[13], arrarr[3], arrarr[8], arrarr[7], arrarr[10]];
            arrBody.push(arr);
          }
            var $el2 = document.getElementById('arrivals');
            var tb2 = new TablePlayer($el2, arrHead, arrBody, 10, 2);
            tb2.show();
      };
      if(option==queryString[0]){
          dep();
        }
      if(option==queryString[1]){
          arr();
      }
    },
    error: function (e) {
      console.log(e.responseText)
    }
  });
};
for(a=0;a<2;a++){
  maketable(queryString[a]);
}
