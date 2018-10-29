function printDate() {

  var dateClock = document.getElementById("dateClock"); 
  var currentDate = new Date(); // 현재시간
  var calendar = currentDate.getFullYear() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getDate() + "." // 현재 날짜
  var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var dayOfWeek = week[new Date(calendar).getDay()];
  dateClock.innerHTML = calendar + dayOfWeek;
  setTimeout("printClock()", 86400000); // 하루마다 printDate() 함수 호출
}

function printTime() {
  var timeClock = document.getElementById("timeClock"); 
  var currentDate = new Date(); // 현재시간
  var currentHours = addZeros(currentDate.getHours(), 2);
  var currentMinute = addZeros(currentDate.getMinutes(), 2);
  var currentSeconds = addZeros(currentDate.getSeconds(), 2);
  timeClock.innerHTML = currentHours + ":" + currentMinute + ":" + currentSeconds;
  setTimeout("printTime()", 1000); // 1초마다 printClock() 함수 호출
}

function addZeros(num, digit) { // 자릿수 맞춰주기
  var zero = '';
  num = num.toString();
  if (num.length < digit) {
    for (i = 0; i < digit - num.length; i++) {
      zero += '0';
    }
  }
  return zero + num;
}

printDate();
printTime();