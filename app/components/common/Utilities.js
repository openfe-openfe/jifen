// util工具函数
module.exports = {
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    findElement: function (arr, propName, propValue) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][propName] == propValue)
                return arr[i];
    },
    findWithAttr: function(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    },
    jsonObjToBase64: function (json) {
        return btoa(encodeURIComponent(JSON.stringify(json)));
    },
    base64TojsonObj: function (base64) {
        return JSON.parse(decodeURIComponent(atob(base64)));
    },
    pageJump: function (url) {
        location.href = url;
    },
    setLocalTitle:function(name){
        try {
           csb.setLocalTitle(name);
           WVJsFunction.showTitle(true)
       } catch (e) {
         try {
           window.webkit.messageHandlers.setLocalTitle.postMessage(name)
           window.webkit.messageHandlers.WVJsFunction.postMessage({showTitle:true})
         } catch (e) {
           console.log('没有在潍V内打开')
        //    location.href='http://songhao888.cn/lalala/'
         }
       }
    }
}