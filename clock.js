function printClock() {

  var timeClock = document.getElementById("timeClock"); // 출력할 장소 선택
  var currentDate = new Date(); // 현재시간
  var calendar = currentDate.getFullYear() + "." + (currentDate.getMonth() + 1) + "." + currentDate.getDate() + "." // 현재 날짜
  var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var dayOfWeek = week[new Date(calendar).getDay()];

  var currentHours = addZeros(currentDate.getHours(), 2);
  var currentMinute = addZeros(currentDate.getMinutes(), 2);
  var currentSeconds = addZeros(currentDate.getSeconds(), 2);

  dateClock.innerHTML = calendar + dayOfWeek;
  timeClock.innerHTML = currentHours + ":" + currentMinute + ":" + currentSeconds;

  setTimeout("printClock()", 1000); // 1초마다 printClock() 함수 호출
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

printClock();