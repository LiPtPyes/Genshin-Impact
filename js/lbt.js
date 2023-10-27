window.onload = () => {
  var img_1 = document.querySelectorAll('.out .inner .img_1');
  var left = document.querySelector('.arrow .left');
  var right = document.querySelector('.arrow .right');
  var button_1 = document.querySelectorAll('.button_1 p');
  var inner = document.querySelector('.inner');
  var index=0;
  var timer=null;

  // 设置一个数组用来储存id
  idArr = ['first','second','right','left','left','last']

  initialize();

  // 设置一个定时器，让图片轮播
  function start(){
    timer = setInterval(next, 3000);
  }
  // 创建切换图片的函数
  function prev(){
    clearInterval(timer);
    // 切换上一张也就是让数组的最后一个元素变成第一个元素
    idArr.push(idArr.shift());
    initialize();
    if(index<=0){
      index=img_1.length-1;
    }else{
      index--;
    }
    clearColor();
    start();
  }
  function next(){
    clearInterval(timer);
    // 切换上一张也就是让数组的最后一个元素变成第一个元素
    idArr.unshift(idArr.pop());
    initialize();
    if(index>=img_1.length-1){
      index=0;
    }else{
      index++;
    }
    clearColor();
    start();
  }
  
  left.addEventListener('click',prev)
  right.addEventListener('click',next)
  inner.addEventListener('mouseover',() => {clearInterval(timer);})
  inner.addEventListener('mouseout',start)

  //给小方块添加点击事件
  for(let i=0;i<button_1.length;i++){
    button_1[i].addEventListener('click',() => {
      //在用户点击的时候关闭定时器
      timer = clearInterval(timer);
      //这里需要判断用户点击的小方块与当前图片的索引之差，如果
      //大于0，则表明用户需要更换的是后面的图片，反之，表明用户
      //需要更换之前也就是前面的图片
      if(i > index){
        let len = i-index;
        while(len--){
          next();
        }
      }else if(i < index){
        let len = index-i;
        while(len--){
          prev();
        }
      }
    })
  }

  //创建一个函数用来让小方块跟随图片运动
  function clearColor() {
    for (let i = 0; i < button_1.length; i++) {
      button_1[i].style.background = "silver";
    }
    //让当前的索引变色
    button_1[index].style.background = "rgb(20, 134, 187)";
  }
  // 创建一个函数用来初始化图片
  function initialize(){
    for(let i=0;i<img_1.length;i++){
      img_1[i].id = idArr[i];
    }
  }

  start(); // 开启定时器
}
