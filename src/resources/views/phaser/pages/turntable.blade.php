@extends('lottery::phaser.layouts.default')
@section('title'){{__('lottery::turntable.title')}}@endsection
@section('content')
    <script src="{{LotteryPath::getAssets('js/turntable.min.js')}}"></script>
    <div style="background: #eee;">
        <div id="canvas_prize1_html">
            <div style="padding:10px;">
                <div vcc_alert_run="1" style="width: 600px;margin:auto;">
                    <div vcc_alert_content="1" vcc_prize_hint="true" style="position:fixed;top: 50%;transform: translate(0,-50%);width: 600px;display:none;padding:20px;text-align:center;font-size:24px;-webkit-border-radius: 8px;-moz-border-radius: 8px;border-radius: 8px;background:#ff8000;background-size: 100% 100%;">
                        <a>
                            <i vcc_alert_click="hide" class="vcc_iconfont" style="position:absolute;top:6px;right:6px;cursor:default">&#xe63a;</i>
                        </a>
                        <p vcc_prize_hint="title" style="font-weight: 800;width: 90%;margin: 0;"></p>
                        <p vcc_prize_hint="code" style="font-weight: 500;width: 90%;color:#c00;margin: 0;"></p>
                        <p vcc_prize_hint="desc" style="font-size:16px;margin: 0;"></p>
                        <p vcc_prize_hint="click1" style="margin:20px auto;">
                            <a href="/" style="padding:10px 30px;font-weight: 800;color:#fff;border-radius:5px;background:#0097FF;">立即使用</a>
                        </p>
                        <p vcc_prize_hint="click2" style="margin: 0;">
                            <a href="#" style="font-size:16px;color:#00A8FF;">检查我的优惠券</a>
                        </p>
                    </div>
                </div>
                <div id="canvas_prize1" style="width: 600px; height: 600px;margin:0 auto;"></div>
                <div>
                    <div class="swiper-container" id="prize1_swiper_container1" style="width:50%;height:120px;margin:20px auto;padding:10px;text-align:center;font-weight:500;font-size:24px;line-height:30px;background:#fafafa;">
                        <div class="swiper-wrapper">
                            <p class="swiper-slide"><span class="prize-user">aaaaaaaaaaa</span> ( <span class="prize-email">a@ddddddddd.com</span> )は <span class="prize-code">123456</span> 恭喜获奖 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        /*{#
            rounds转多少圈
            prizes停在第几个产品，为空则随机，为数字如:1则中1号奖品，为数组如:[1,2,3]则是分别可以中1,2,3号奖品(为数组的时候time最好设置为auto)
            time可以玩多少次，为auto则自动根据奖品多少个决定玩多少次(如prizes=[1,2,3],time='auto'则可以玩3次依次中奖奖品为3,2,1)，大于奖品数量时随机从给出的产品中选(如prizes=[1,2,3]，time=4，则可以玩4次每次从给出的1,2,3号奖品中随机选出一个)，且每结束一次减一个产品(不可中途修改)
        #}*/
        var data_came = {'prizes':'2','time':'10','rounds':'3'};
        /*{#转盘内的参数#}*/
        var slicePrizes = [
            {'id':'1','title' : '恭喜您中得<br />1号奖品', 'code' : '1', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'2','title' : '恭喜您中得<br />2号奖品', 'code' : '2', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'3','title' : '恭喜您中得<br />3号奖品', 'code' : '3', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'4','title' : '恭喜您中得<br />4号奖品', 'code' : '4', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'5','title' : '恭喜您中得<br />5号奖品', 'code' : '5', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'6','title' : '恭喜您中得<br />6号奖品', 'code' : '6', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'7','title' : '恭喜您中得<br />7号奖品', 'code' : '7', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'},
            {'id':'8','title' : '恭喜您中得<br />8号奖品', 'code' : '8', 'desc' : '详细的说明文本内容比如1号奖品为苹果手机一台'}
        ];
        /*{#回调对象#}*/
        var callback = {
            /*{#中奖后的提示#}*/
            prizeHint:function(data)
            {
                var obj = $('[vcc_prize_hint="true"]');
                if(data['id']=='4'||data['id']=='11'){
                    obj.find('[vcc_prize_hint="title"]').html(data['title']);
                    obj.find('[vcc_prize_hint="code"]').hide();
                    obj.find('[vcc_prize_hint="desc"]').html(data['desc']);
                    obj.find('[vcc_prize_hint="click1"]').hide();
                    obj.find('[vcc_prize_hint="click2"]').hide();
                }else if(data['id']=='5'||data['id']=='10'||data['id']=='15'){
                    obj.find('[vcc_prize_hint="title"]').html('<span style="font-size: 36px;line-height: 32px;">'+data['title']+'</span>');
                    obj.find('[vcc_prize_hint="code"]').hide();
                    obj.find('[vcc_prize_hint="desc"]').hide();
                    obj.find('[vcc_prize_hint="click1"]').hide();
                    obj.find('[vcc_prize_hint="click2"]').hide();
                }else{
                    var obj = $('[vcc_prize_hint="true"]');
                    obj.find('[vcc_prize_hint="title"]').html(data['title']);
                    obj.find('[vcc_prize_hint="code"]').html(data['code']);
                    obj.find('[vcc_prize_hint="desc"]').html(data['desc']);
                    obj.find('[vcc_prize_hint="click1"]').show();
                    obj.find('[vcc_prize_hint="click2"]').show();
                }
                $('[vcc_alert_run="1"]').vcc_alert_run();
                $.post('{{url('/')}}',{prize_id:data['id'],user_id:'{{'123'}}'});
            },
            /*{#没有中奖资格或中奖次数以用完#}*/
            prizeHintNo:function()
            {
                var obj = $('[vcc_prize_hint="true"]');
                obj.find('[vcc_prize_hint="title"]').html('<span style="font-size: 36px;line-height: 32px;">没有中奖资格或中奖次数以用完</span>');
                obj.find('[vcc_prize_hint="code"]').hide();
                obj.find('[vcc_prize_hint="desc"]').hide();
                obj.find('[vcc_prize_hint="click1"]').hide();
                obj.find('[vcc_prize_hint="click2"]').hide();
                $('[vcc_alert_run="1"]').vcc_alert_run();
            }
        };
        /*{#游戏dom元素#}*/
        var obj_div = $('#canvas_prize1');
        $.turntable(obj_div,data_came,{'wheel':"{{LotteryPath::getAssets('img/game_wheel.png')}}",'pin':"{{LotteryPath::getAssets('img/game_pin.png')}}"},{'width':parseInt(obj_div.css('width')),'height':parseInt(obj_div.css('height'))},slicePrizes,callback);
    </script>
@endsection