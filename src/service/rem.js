(function () {
  function remReSize () {
    var deviceWidth = document.documentElement.clientWidth
    if (deviceWidth > 540) {
      document.documentElement.style.fontSize = '144px'
    } else {
      document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px'
    }
  };
  remReSize()
  // 当窗体大小变化时，html字体大小随着变化
  window.onresize = function () {
    remReSize()
  }
})()
