/**
 * @obj obj_div 游戏dom盒子
 * @obj data_whirl:
 @int rounds转多少圈
 @array/int prizes停在第几个产品，为空则随机，为数字如:1则中1号奖品，为数组如:[1,2,3]则是分别可以中1,2,3号奖品(为数组的时候can_spin最好设置为auto)
 @array/int can_spin可以玩多少次，为空则不可以玩(空数组空字符串或0)，为auto则自动根据奖品多少个决定玩多少次(如prizes=[1,2,3],can_spin='auto'则可以玩3次依次中奖奖品为3,2,1)，大于奖品数量时随机从给出的产品中选(如prizes=[1,2,3]，can_spin=4，则可以玩4次每次从给出的1,2,3号奖品中随机选出一个)，且每结束一次减一个产品(不可中途修改)
 * @obj data_img:
 @dom wheel大转盘图
 @dom pin指针图
 * @obj data_style 各种样式
 * @obj array slicePrizes
 @string a1 第一段文字
 @string a2 第二段文字
 @string a3 第三段文字
 * */
jQuery.redEnvelopesRain=function(obj_div,data_came,data_img,data_style,data_prizes,Callbacks){
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
    var game = new Phaser.Game(data_style['width'],data_style['height'],Phaser.AUTO,'canvas_prize1',{preload:preload,create:create},true);
    /*obj_div['canvas_prize1'].click(function(){});*/
    /*点击叉叉隐藏*/
    obj_div['vc_canvas_prize1_click_hide'].on('click',function(){
        obj_div['redEnvelopesRain'].hide();
    });
    /*点击右侧红包显示*/
    obj_div['vc_click_show_redEnvelopesRain'].click(function(){
        obj_div['redEnvelopesRain'].show();
        if(data_came['time']<1 || !data_came['prizes']){
            Callbacks.prizeHintNo();
        }
    });
    function preload(){
        game.load.spritesheet('jing_ling1',data_img['jing_ling1'],100, 123, 3);
    }
    var jing_ling1_sprite;
    var item;
    function create(){
        jing_ling1_sprite = game.add.group();
        //全组开启body
        jing_ling1_sprite.enableBody = true;
        //预先创建16个精灵对象
        jing_ling1_sprite.createMultiple(data_came['rounds']>0?data_came['rounds']:10,'jing_ling1');
        //红包组全体添加边界检测和边界销毁
        jing_ling1_sprite.setAll('anchor.y',1);
        jing_ling1_sprite.setAll('outOfBoundsKill',true);
        jing_ling1_sprite.setAll('checkWorldBounds',true);

        //生成红包的函数
        var buildRedpack = function()
        {
            if(item = jing_ling1_sprite.getFirstExists(false)){
                item.events.onInputDown.removeAll();
                item.angle = game.rnd.between(10,20);
                item.reset(game.rnd.between(1,data_style['width']-100),0);
                //item.scale.set(game.rnd.between(1,2));
                item.body.velocity.x = game.rnd.integerInRange(1, 50);
                item.body.velocity.y = game.rnd.between(400,600);
                item.inputEnabled = true;
                item.checkWorldBounds = true;
                item.outOfBoundsKill = true;
                item.events.onInputDown.add(hitted, game);
                item.animations.add('left',[0,1],2,true);item.play('left');
            }
        };
        var hitted = function(e)
        {
            e.animations.add(2);e.play(2);
            e.kill();
            if(data_came['time']>0){
                var data;
                if($.isArray(data_came['prizes'])){
                    if(!(data = data_prizes[data_came['prizes'][data_came['time']-1]-1])){
                        data = data_prizes[game.rnd.between(0,data_came['time']-1)];
                    }
                }else if(parseInt(data_came['prizes'])>0){
                    data = data_prizes[parseInt(data_came['prizes'])-1];
                }
                data_came['time']--;
                if(data){
                    Callbacks.prizeHint(data);
                }else{
                    Callbacks.prizeHintNo();
                }
            }else{
                Callbacks.prizeHintNo();
            }
        };
        //定时添加红包
        game.time.events.loop(500,buildRedpack,this);
    }
};