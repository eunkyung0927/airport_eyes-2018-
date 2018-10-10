var congqueryString = encodeURIComponent(JSON.stringify({
  objectType: "hourdata",
  limit: 24,
  ascending: true
}));

function makebarchart(item){
$.ajax({
  url: "http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query="+congqueryString,
  dataType: "json",
  success: function (d) {
      var congcontext = d.data.hourdata.rows;
      var data = [];
      
      for (var i = 0,len=congcontext.length; i < len; i++) {
        var congarr =  congcontext[i];
        var time = congarr[3];
        var arrt1 = [time,parseInt(congarr[4])+parseInt(congarr[5])];
        var arrt2 = [time,parseInt(congarr[5])+parseInt(congarr[6])];

        item==1?data.push(arrt1):data.push(arrt2);
      }
      c3.generate({
        bindto : "#congestion",
        data: {
            columns: [
              data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],
              data[12],data[13],data[14],data[15],data[16],data[17],data[18],data[19],data[20],data[21],data[22],data[23]
            ],
            type : 'bar'
        },
        bar: {
          width: {ratio:1 } 
        },
      });
  },
  error: function (e) {
    console.log(e.responseText)
  }
});
}
makebarchart(1);

