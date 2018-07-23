function submit() {
  var id = document.getElementById("deviceId").value;
  var BoardEvent = webduino.BoardEvent,
    board = new webduino.WebArduino(id),
    p = document.getElementById('idText');
    board.on(BoardEvent.READY, function () {
      setTimeout(function () {
        board.send([0xF0, 0x0E, 0x07, 0xF7]);
      }, 0);
    });
    board.on(BoardEvent.ERROR, function () {
      setStatus('');
    });
    board.on(webduino.BoardEvent.STRING_MESSAGE,
    function (event) {
      var version = event.message.split(',')[0];
      var state = version;
      setStatus(state);
    });

  function setStatus(st) {
    if (st) {
      var myData;
      myData = {};
      myData.sheetUrl = 'https://docs.google.com/spreadsheets/d/1gnGwYNLYKi63gU7HLh1fEwX5NYGdW9cl9N2NU_qK-hI/edit?usp=sharing';
      myData.sheetName = '工作表1';
      myData.column0 = id;
      myData.column1 = st;
      var dt = new Date();
      var time = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes()
        ;
      myData.column2 = time;
      p.querySelector('.status').textContent = 'ok, 老師收到了, ' + time;
      p.querySelector('.warn-status').textContent = '';
      var element = document.getElementById("deviceId");
      element.classList.remove("student-field__invalid");
      writeSheetData(myData);
    } else {
      var element = document.getElementById("deviceId");
      element.classList.add("student-field__invalid");
      p.querySelector('.status').textContent = '';      
      p.querySelector('.warn-status').textContent = '同學，此組deviceID,好像沒連線或是打錯ID喔';
    }
  }
}