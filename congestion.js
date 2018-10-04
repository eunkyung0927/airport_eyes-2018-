var congqueryString = encodeURIComponent(JSON.stringify({
  objectType: "hourdata",
  limit: 24,
  ascending: true
}));

$.ajax({
  url: "http://dev.wizeye.io:1344/V2/TableData?siteId=b26233b869a034b33e2a7550e4f75001&query="+congqueryString,
  dataType: "json",
  success: function (d) {
      var congcontext = d.data.hourdata.rows;
      var data = [];
      for (var i = 0; i < congcontext.length; i++) {
        var congarr =  congcontext[i];
        var time = congarr[3];
        var t1sumset = parseInt(congarr[4])+parseInt(congarr[5]);
        var t2sumset = parseInt(congarr[5])+parseInt(congarr[6]);
        var arrt1 = [time,t1sumset];
        var arrt2 = [time,t2sumset];

        data.push(arrt1);
        
        // $('#t1btn').on('click', function() {
        //   data.push(arrt1);
        // makepie();
        // });
        // $('#t2btn').on('click', function() {
        // data.push(arrt2);
        // makepie();
        // });
      
      }
    //function makepie(){
      c3.generate({
        bindto : "#congestion",
        data: {
            columns: [
              data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],
              data[12],data[13],data[14],data[15],data[16],data[17],data[18],data[19],data[20],data[21],data[22],data[23]
            ],
            type : 'pie'
        }
      });
  //}
},
  error: function (e) {
    console.log(e.responseText)
  }
});
