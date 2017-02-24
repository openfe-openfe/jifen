function convertToStarsArray(stars) {
  //组件加载时第一次是undefined
  if(stars==undefined){
    return false
  }
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push('★');
    }
    else {
      array.push('☆');
    }
  }
  return array;
}

module.exports = {
  convertToStarsArray: convertToStarsArray
}