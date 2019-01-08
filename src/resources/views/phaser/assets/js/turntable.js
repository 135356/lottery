/**
 * @obj obj_div 游戏dom盒子
 * @obj data_came:
 @int rounds转多少圈
 @array/int prizes停在第几个产品，为空则随机，为数字如:1则中1号奖品，为数组如:[1,2,3]则是分别可以中1,2,3号奖品(为数组的时候time最好设置为auto)
 @array/int time可以玩多少次，为空则不可以玩(空数组空字符串或0)，为auto则自动根据奖品多少个决定玩多少次(如prizes=[1,2,3],time='auto'则可以玩3次依次中奖奖品为3,2,1)，大于奖品数量时随机从给出的产品中选(如prizes=[1,2,3]，time=4，则可以玩4次每次从给出的1,2,3号奖品中随机选出一个)，且每结束一次减一个产品(不可中途修改)
 * @obj data_img:
 @dom wheel大转盘图
 @dom pin指针图
 * @obj data_style 各种样式
 * @obj array data_prizes
 @string a1 第一段文字
 @string a2 第二段文字
 @string a3 第三段文字
 * */
jQuery.turntable=function(obj_div,data_came,data_img,data_style,data_prizes,callback){
    var game = new Phaser.Game(data_style['width'],data_style['height'],Phaser.CANVAS,'canvas_prize1',{
        preload:preload,
        create:create
    },true);
    //提前判断出可玩次数
    if(data_came['time']=='auto'){
        if($.isArray(data_came['prizes'])){
            data_came['time'] = data_came['prizes'].length;
        }else if(parseInt(data_came['prizes'])>0){
            data_came['time'] = 1;
        }else{
            data_came['time'] = 0;
        }
    }
    //反转数组，更好的控制中奖的 奖品
    data_prizes = data_prizes.reverse();
    // PLAYGAME STATE
    var playGame = function(game){};
    //为false停止
    var canSpin;
    // the spinning wheel
    var wheel;
    // slices (prizes) placed in the wheel
    var slices = data_prizes.length;
    // the prize you are about to win
    var prize;
    // text field where to show the prize
    var prizeText;

    function preload()
    {
        // preloading graphic assets
        game.load.image("wheel", data_img['wheel']);
        game.load.image("pin", data_img['pin']);
    }

    function create()
    {
        // giving some color to background
        //game.stage.backgroundColor = data_style['background'];
        // adding the wheel in the middle of the canvas
        wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
        // setting wheel registration point in its center
        wheel.anchor.set(0.5);
        // adding the pin in the middle of the canvas
        var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");
        // setting pin registration point in its center
        pin.anchor.set(0.5);
        // adding the text field
        prizeText = game.add.text(game.world.centerX, 480, "");
        // setting text field registration point in its center
        prizeText.anchor.set(0.5);
        // aligning the text to center
        prizeText.align = "center";
        // the game has just started = we can spin the wheel
        canSpin = true;
        // waiting for your input, then calling "spin" function
        game.input.onDown.add(spin, game);
    }

    // function to spin the wheel
    function spin()
    {
        if(Math.round(data_came['time']) != data_came['time'] || data_came['time']<1){
            callback.prizeHintNo();
            return false;
        }
        // can we spin the wheel?
        if(canSpin){
            var rounds = data_came['rounds']?parseInt(data_came['rounds']):game.rnd.between(2, 4);
            //var degrees = data_came['degrees']?data_came['degrees']:game.rnd.between(0, 360);
            var one = 360/data_prizes.length;
            var degrees = null;
            if($.isArray(data_came['prizes'])){
                if(data_came['time'] > data_came['prizes'].length){
                    degrees = data_came['prizes'][game.rnd.between(0, data_came['prizes'].length-1)];
                }else{
                    degrees = parseInt(data_came['prizes'][data_came['time']-1]);
                }
            }else{
                degrees = parseInt(data_came['prizes']);
            }
            if(degrees){
                degrees = parseInt(degrees*one-one+game.rnd.between(1, (one-2)>2?one-2:1));
            }else{
                data_came['time'] = 0;
            }
            //degrees = degrees?parseInt(degrees*one-one+game.rnd.between(1, (one-2)>2?one-2:1)):game.rnd.between(0, 360);
            // resetting text field
            prizeText.text = "";
            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            prize = slices - 1 - Math.floor(degrees / (360 / slices));
            // now the wheel cannot spin because it's already spinning
            canSpin = false;
            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            var spinTween = game.add.tween(wheel).to({angle: 360 * rounds + degrees}, 3000, Phaser.Easing.Quadratic.Out, true);
            // once the tween is completed, call winPrize function
            spinTween.onComplete.add(winPrize, game);
        }
    }
    //回调
    function winPrize()
    {
        //每运行一次减一为假停止旋转
        data_came['time'] = parseInt(data_came['time']);
        if(Math.round(data_came['time']) === data_came['time']){
            if((--data_came['time'])>0){
                canSpin = true;
            }else{
                canSpin = false;
            }
            //最后结果
            if(data_prizes[prize]){
                callback.prizeHint(data_prizes[prize],data_came);
            }else{
                callback.prizeHintNo();
            }
            //prizeText.text = data_prizes[prize];
        }else{
            canSpin = false;
        }
    }
    // adding "PlayGame" state
    game.state.add("PlayGame",playGame);
    // launching "PlayGame" state
    game.state.start("PlayGame");
};