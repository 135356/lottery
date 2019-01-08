@extends('lottery::phaser.layouts.default')
@section('content')
<script src="{{ $src.'/assets/js/red_envelopes_rain.min.js' }}"></script>
<div>
    <div class="main container" style="position:relative;margin:10px auto;">
        <div id="redEnvelopesRain" style="position:absolute;top:0;left:0;width: 100%;">
            <div id="vc_alert_body_redEnvelopesRain" style="text-align:center;width: 100%;height:100%;min-height: 1000px;position: fixed;top: 0;left: 0;z-index: 990;background-color: rgba(0, 0, 0, 0.3);"></div>
            <div style="width: 100%;">
                <div vc_alert_run="1" style="width: 500px;margin:auto;">
                    <div vc_alert_content="1" vc_prize_hint="true" style="position:fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);z-index:991;width: 500px;display:none;padding:15px;text-align:center;font-size:24px;-webkit-border-radius: 8px;-moz-border-radius: 8px;border-radius: 8px;background:#fff;background-size: 100% 100%;">
                        <a>
                            <i vc_alert_click="hide" vc_prize_game="continuance" class="vc_iconfont" style="position:absolute;top:2px;right:2px;cursor:default">&#xe63a;</i>
                        </a>
                        <p vc_prize_hint="title" style="font-weight: 800;width: 90%;margin:auto;"></p>
                        <p vc_prize_hint="code" style="font-weight: 500;color:#c00;"></p>
                        <p vc_prize_hint="desc" style="font-size:16px;"></p>
                        <p vc_prize_hint="click1" style="margin:20px auto;">
                            <a href="/" style="padding:10px 30px;font-weight: 800;color:#fff;border-radius:5px;background:#0097FF;">立即使用</a>
                        </p>
                        <p vc_prize_hint="click2">
                            <a href="#" style="font-size:16px;color:#00A8FF;">检查我的优惠券</a>
                        </p>
                    </div>
                </div>
                <div style="width: 1024px; height: 1000px;margin:0 auto;">
                    <div id="canvas_prize1" style="width: 1024px; height: 1000px;position:fixed;top:0;z-index:990;">
                        <i class="vc_iconfont" vc_canvas_prize1_click_hide="true" style="position:absolute;top:6px;right:6px;font-size:63px;color:#fff;cursor:default">&#xe63a;</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    /*{#
        prizes奖第几号产品，为空则随机，为数字如:1则中1号奖品，为数组如:[1,2,3]则是分别可以中1,2,3号奖品(为数组的时候can_spin最好设置为auto)
        time可以玩多少次，为auto则自动根据奖品多少个决定玩多少次(如prizes=[1,2,3],can_spin='auto'则可以玩3次依次中奖奖品为3,2,1)，大于奖品数量时随机从给出的产品中选(如prizes=[1,2,3]，can_spin=4，则可以玩4次每次从给出的1,2,3号奖品中随机选出一个)，且每结束一次减一个产品(不可中途修改)
        rounds多少个红包一屏
    #}*/

    var data_came = {'prizes':[1,2,3,4,5],'time':'10','rounds':'10'};

    /*{#转盘内的参数#}*/
    var data_prizes = [
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
            var obj = $('[vc_prize_hint="true"]');
            obj.find('[vc_prize_hint="title"]').html(data['title']);
            obj.find('[vc_prize_hint="code"]').html('code：'+data['code']);
            obj.find('[vc_prize_hint="desc"]').html(data['desc']);
            $('[vc_alert_run="1"]').vc_alert_run();
            $.post('{{url('/')}}',{prize_id:data['id'],user_id:'{{'123'}}', code:data['code']});
        },
        /*{#没有中奖资格或中奖次数以用完#}*/
        prizeHintNo:function()
        {
            var obj = $('[vc_prize_hint="true"]');
            obj.find('[vc_prize_hint="title"]').html('没有中奖资格或中奖次数以用完');
            obj.find('[vc_prize_hint="code"]').hide();
            obj.find('[vc_prize_hint="desc"]').html('每<span style="color:#f00;font-weight:800;">1</span>人<span style="color:#f00;font-weight:800;">1</span>天<span style="color:#f00;font-weight:800;">10</span>次机会。');
            obj.find('[vc_prize_hint="click1"]').hide();
            obj.find('[vc_prize_hint="click2"]').hide();
            $('[vc_alert_click="hide"]').click(function(){
                $('#redEnvelopesRain').hide();
            });
            $('[vc_alert_run="1"]').vc_alert_run();
        },
        /*{#暂停与继续#}*/
        clickContinuance:function(game,i)
        {
            $('[vc_prize_game="continuance"]').click(function(){
                if(i>0){
                    game.paused = false;
                }else{
                    game.paused = true;
                }
            });
        }
    };

    var obj_div = {'canvas_prize1':$('#canvas_prize1'),'vc_canvas_prize1_click_hide':$('[vc_canvas_prize1_click_hide="true"]'),'vc_alert_body_redEnvelopesRain':$('#vc_alert_body_redEnvelopesRain'),'redEnvelopesRain':$('#redEnvelopesRain'),'vc_click_show_redEnvelopesRain':$('[vc_click_show_redEnvelopesRain="true"]')};
    var data_img = {'jing_ling1':"{{$src.'/assets/img/honbao.png'}}"};
    var data_style = {'width':parseInt(obj_div['canvas_prize1'].css('width')),'height':parseInt(obj_div['canvas_prize1'].css('height'))};
    $.redEnvelopesRain(obj_div,data_came,data_img,data_style,data_prizes,callback);
</script>
@endsection
