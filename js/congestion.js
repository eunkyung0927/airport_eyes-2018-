var congqueryString = encodeURIComponent(JSON.stringify({
  objectType: "hourdata",
  limit: 24,
  ascending: true
}));
function makebarchart(){
$.ajax({
  url: "http://waste.me:1344/V2/TableData?siteId=n3n&query="+congqueryString,
  dataType: "json",
  success: function (d) {
      var congcontext = d.data.hourdata.rows;
      var t1data = ['Terminal 1'];
      var t2data = ['Terminal 2'];
      
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
            columns: [t1data,t2data]
        }
      });
  },
  error: function (e) {
    console.log(e.responseText)
  }
});
}
makebarchart();
