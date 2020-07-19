/**
 *   1.移动div的大小 / 小图大小 = 大div大小 / 大图大小
 *   2.移动div的 left / 小图大小 = 大图背景图position left(为负数) / 大图大小
 */

(function () {
   let config = {
         samllImgSrc:'img/samll.jpg',
         bigImgSrc:'img/big.jpg',
         samllDiv:document.querySelector('.samllBox'),
         bigDiv:document.querySelector('.bigBox'),
         moveDiv:document.querySelector('.moveBox'),
         smallBgSize:{
             width:350,
             height:350,
         },
         bigBgSize:{
             width:900,
             height:900,
         },
         bigDivSize:{
            width:400,
            height:400
        },
        movieSzie:{}
   }
   function init(){
       initStyle();
       initEvent();
   }

    /**
     *  初始化小div背景+moveBox样式
     */
   function initStyle() {
        config.samllDiv.style.background = `url(${config.samllImgSrc}) no-repeat left top/contain`;
        config.moveDiv.style.width = config.bigDivSize.width / config.bigBgSize.width * config.smallBgSize.width + 'px'
        config.moveDiv.style.height = config.bigDivSize.height / config.bigBgSize.height * config.smallBgSize.height + 'px'
        config.movieSzie.width = config.bigDivSize.width / config.bigBgSize.width * config.smallBgSize.width;
        config.movieSzie.height = config.bigDivSize.width / config.bigBgSize.width * config.smallBgSize.width;
    }

    /**
     *  给小div绑定事件
     */
    function initEvent(){

        config.samllDiv.onmouseenter = function(e){
            config.moveDiv.style.display = 'block'
            config.bigDiv.style.display = 'block'
        }
        config.samllDiv.onmouseleave = function(e){
            config.moveDiv.style.display = 'none'
            config.bigDiv.style.display = 'none'
        }
        config.samllDiv.onmousemove = function(e){
            let offset = getPosition(e);
            setMoveDivPos(offset);
            setBigImgPos();
        }
    }

    /**
     * 设置moveDiv left top
     */
    function setMoveDivPos(data){
        let disx = config.smallBgSize.width - config.movieSzie.width;
        let disy = config.smallBgSize.height - config.movieSzie.height;

        let nowLeft = data.x - config.movieSzie.width / 2;
        let nowTop = data.y - config.movieSzie.height / 2;
        if(nowLeft< 0){
            nowLeft = 0
        }
        if(nowTop  < 0){
            nowTop = 0
        }
        if(nowLeft > disx){
            nowLeft = disx
        }
        if(nowTop  > disy){
            nowTop = disy
        }
        config.moveDiv.style.left = nowLeft + 'px';
        config.moveDiv.style.top = nowTop + 'px';

    }

    /**
     * 设置大图的position
     */
    function setBigImgPos(data){
          let style = getComputedStyle(config.moveDiv);
          let left = parseFloat(style.left);
          let top = parseFloat(style.top);
          bigLeft = left / config.smallBgSize.width * config.bigBgSize.width;
          bigTop = top /config.smallBgSize.height * config.bigBgSize.height;
          config.bigDiv.style.backgroundPosition = `-${bigLeft}px -${bigTop}px`
    }
    /**
     *获取moveDiv left top
     */
    function getPosition(e){
          let style = getComputedStyle(config.moveDiv);
          let left = parseFloat(style.left);
          let top =  parseFloat(style.top);
          if(e.target == config.samllDiv){
               return {
                   x:e.offsetX,
                   y:e.offsetY,
               }
          }
          else
          {
              return {
                  x:e.offsetX + left + 1,
                  y:e.offsetY+ top +1,
              }
          }
    }

   init();
})()