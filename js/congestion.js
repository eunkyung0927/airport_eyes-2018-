var congqueryString = encodeURIComponent(JSON.stringify({
  objectType: "hourdata",
  limit: 24,
  ascending: true
}));

function makebarchart(item){
$.ajax({
  url: "http://waste.me:1344/V2/TableData?siteId=n3n&query="+congqueryString,
  dataType: "json",
  success: function (d) {
      var congcontext = d.data.hourdata.rows;
      var t1data = [];
      var t2data = [];
      
      for (var i = 0,len=congcontext.length; i < len; i++) {
        var congarr =  congcontext[i];
        var arrt1 = parseInt(congarr[4])+parseInt(congarr[5]);
        var arrt2 = parseInt(congarr[5])+parseInt(congarr[6]);
        t1data.push(arrt1);
        t2data.push(arrt2);
      }

      c3.generate({
        bindto : "#congestion",
        data: {
            columns: [
              ['Terminal 1',t1data[0],t1data[1],t1data[2],t1data[3],t1data[4],t1data[5],t1data[6],t1data[7],t1data[8],t1data[9],t1data[10],t1data[11],
                       t1data[12],t1data[13],t1data[14],t1data[15],t1data[16],t1data[17],t1data[18],t1data[19],t1data[20],t1data[21],t1data[22],t1data[23]],
              ['Terminal 2',t2data[0],t2data[1],t2data[2],t2data[3],t2data[4],t2data[5],t2data[6],t2data[7],t2data[8],t2data[9],t2data[10],t2data[11],
              t2data[12],t2data[13],t2data[14],t2data[15],t2data[16],t2data[17],t2data[18],t2data[19],t2data[20],t2data[21],t2data[22],t2data[23]]
            ]
        }
      });
  },
  error: function (e) {
    console.log(e.responseText)
  }
});
}
makebarchart(1);
makebarchart(2);
