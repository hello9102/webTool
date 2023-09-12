// 当前文件在http://test1.hello9102.com下
function getParams() {
  let path = document.getElementById("jsonpScript").scroll,
    callback = path.match(/cb=(.*)/)[1];

  switch (callback) {
    case "test1":
      test1("test1");
      break;
    case "test2":
      test2("test2");
      break;
    case "test3":
      test3("test3");
      break;
    default:
      test1("test1");
  }
}

getParams();
