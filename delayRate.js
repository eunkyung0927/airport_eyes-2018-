var chart = c3.generate({
  bindto : "#departuredelay",
  data: {
      columns: [
        ['data1', 30],
        ['data3', 70],
        ['data4', 100],
        ['data5', 10],
        ['data6', 70]
      ],
      type : 'donut',
  },
  donut: {
      title: "Departure Delay Rate"
  }
});

var chart2 = c3.generate({
  bindto : "#arrivaldelay",
  data: {
      columns: [
          ['data1', 30],
          ['data2', 20],
          ['data3', 70],
          ['data4', 90],
      ],
      type : 'donut',
  },
  donut: {
      title: "Arrival Delay Rate"
  }
});


var chart3 = c3.generate({
    bindto : "#departurecancellation",
    data: {
        columns: [
            ['data1', 30],
            ['data2', 20],
            ['data3', 70],
            ['data4', 90],
        ],
        type : 'donut',
    },
    donut: {
        title: "Departure Cancellation"
    }
  });
  
