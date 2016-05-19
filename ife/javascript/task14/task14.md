# 任务十四：零基础JavaScript编码（二）
http://ife.baidu.com/task/detail?taskId=14

## 任务目的
 - 在上一任务基础上继续JavaScript的体验
 - 学习JavaScript中的if判断语法，for循环语法
 - 学习JavaScript中的数组对象
 - 学习如何读取、处理数据，并动态创建、修改DOM中的内容
 
## 任务描述
  参考以下示例代码，页面加载后，将提供的空气质量数据数组，按照某种逻辑（比如空气质量大于60）进行过滤筛选，最后将符合条件的数据按照一定的格式要求显示在网页上
```
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>IFE JavaScript Task 01</title>
    </head>
  <body>
  
    <h3>污染城市列表</h3>
    <ul id="aqi-list">
  <!--   
      <li>第一名：福州（样例），10</li>
    	<li>第二名：福州（样例），10</li> -->
    </ul>
  
  <script type="text/javascript">
  
  var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
  ];
  
  (function () {
  
    /*
    在注释下方编写代码
    遍历读取aqiData中各个城市的数据
    将空气质量指数大于60的城市显示到aqi-list的列表中
    */
    aqiData.sort(function(){
    
    })
  
  })();
  
  </script>
  </body>
  </html>
```
## 参考资料
1. Array.prototype.sort()
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
***如果没有指明 compareFunction ，那么元素会被转换为字符串并按照万国码位点顺序排序。例如 "Cherry" 会被排列到 "banana" 之前。当对数字进行排序的时候， 9 会出现在 80 之后，因为他们会先被转换为字符串，而 "80" 比 "9" 要靠前。***
2. appendChild createElement
https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild