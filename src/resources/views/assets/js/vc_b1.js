/*拒絕修改*/
;(function($){
    $.fn.extend({
        /*
        （alert_class为弹出层的class属性，在父元素或传参形式配置【在多个奇葩弹出层并出现干扰时才须要配置】），（配置两个子元素分别为vc_run触发元素，vc_come触发后需要显示的元素）（quit为取消弹框的元素）
        checked里放需要先触发的input的父元素多个以逗号隔开，checkedZ为checked的子元素多个选择时能起作用,event_在没有触发checked里面的元素时删除的事件$('.vc_alert').vc_alert({'checked':'.vc_alert_checked1,.vc_alert_checked2','event_':'data-request'});特殊情况说明
        */
        vc_alert:function(data)
        {
            data = $.extend({
                'alert_class':'alert_class',
                'quit':'.quit',
                'type':'click',
                'time':2000,
                'checked':null,
                'checkedZ':'input',
                'event_':'type'
            },Default_,data,attr_json_($(this)));

            var Vc = {
                'a_show':function(run,come,obj)
                {
                    var alert_class = data.alert_class;
                    if ($('.' + alert_class).length <= 0) {
                        come.css('position')!='static'||come.css('position','relative');
                        come.css({'z-index': '10002', 'display': 'block'});
                        $('body').append('<div class="' + alert_class + '" style="text-align:center;width: 100%;height:100%;min-height: 1000px;background: #000;position: fixed;top: 0;left: 0;z-index: 10001;opacity: 0.5;"></div>');
                        obj.find(data.quit).click(function(){
                            come.hide();
                            $('.' + alert_class).remove();
                            if(data.time != 'false'){
                                window.clearInterval(settime_stop);
                            }
                        });
                        $('.' + alert_class).on('click', function () {
                            come.hide();
                            $('.' + alert_class).remove();
                            if(data.time != 'false'){
                                window.clearInterval(settime_stop);
                            }
                        });

                        if(data.time != 'false'){
                            var settime_stop = setTimeout(function () {
                                come.hide();
                                $('.' + alert_class).remove();
                                window.clearInterval(settime_stop);
                            },data.time);
                        }
                    }
                }
            };

            $(this).each(function(){
                if($(this).attr('vc_true')!=data.vc_true2_) {
                    var obj = $(this);
                    var run = $(this).find('[vc_run]');/*触发（点击后）*/
                    var come = $(this).find('[vc_come]');/*响应（遮罩层）*/
                    var attr_val  = run.attr(data.event_);
                    var checked_arr = data.checked?data.checked.split(','):null;
                    if(checked_arr){
                        var is_checked = [];
                        $.each(checked_arr,function(i,v){
                            is_checked[i]={'str':v,'is':null};
                            $(v).each(function(){
                                $(this).find(data.checkedZ).click(function(){
                                    is_checked[i]={'str':v,'is':1};
                                });
                            });
                        });
                    }

                    if(data.type != 'load'){
                        run.on(data.type, function () {
                            if(checked_arr){
                                var length = 0;
                                $.each(is_checked,function(i,v){
                                    if(v['is']){
                                        length++;
                                    }
                                });
                                if(length < checked_arr.length){
                                    run.removeAttr(data.event_);
                                    Vc.a_show(run,come,obj);
                                }else{
                                    run.attr(data.event_,attr_val);
                                }
                            }else{
                                Vc.a_show(run,come,obj);
                            }
                        });
                    }else{
                        Vc.a_show(run,come,obj);
                    }

                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        /*点击弹出框*/
        vc_alert_click:function(data)
        {
            data = $.extend({},Default_,data,attr_json_($(this)));

            var alert = {
                'alert_add':function(obj,time)
                {
                    return Alert2_.body_background1(obj,time,'click_remove');
                },
                'alert_delete1':function(obj)
                {
                    Alert2_.delete_div1('body1',obj);
                }
            };

            $(this).each(function(){
                if($(this).attr('vc_true') != data.vc_true2_) {
                    var obj = $(this);
                    /*它们也可以共同放在一个元素上面*/
                    var content = obj.find('[vc_alert_content]');/*弹出内容*/
                    var alert_click = obj.find('[vc_alert_click]');/*点击*/

                    if(alert_click.length>0){
                        alert_click.click(function(){
                            /*点击后弹出或隐藏content*/
                            if($(this).attr('vc_alert_click') == 'show'){
                                alert.alert_add(content);
                            }else{
                                alert.alert_delete1(content);
                            }
                        });
                    }else{
                        alert.alert_add(content);
                    }

                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        /*打开页面自动弹出框，关闭后不在弹出*/
        vc_alert_open:function(data)
        {
            data = $.extend({},Default_,data,attr_json_($(this)));

            var alert = {
                'alert_add':function(obj,time)
                {
                    return Alert2_.body_background1(obj,time,'click_remove');
                },
                'alert_delete1':function(obj)
                {
                    Alert2_.delete_div1('body1',obj);
                }
            };
            $(this).each(function(){
                if($(this).attr('vc_true') != data.vc_true2_) {
                    var obj = $(this);
                    /*它们也可以共同放在一个元素上面*/
                    var content = obj.find('[vc_alert_content]');/*弹出内容*/
                    var click_show = obj.find('[vc_alert_click="show"]');/*点击*/
                    var click_hide = obj.find('[vc_alert_click="hide"]');/*点击*/

                    if(click_show.length>0){
                        click_show.click(function(){
                            alert.alert_add(content);
                        });
                    }else{
                        alert.alert_add(content);
                    }
                    click_hide.click(function(){
                        alert.alert_delete1(content);
                    });

                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        /*运行到它的时候就执行(弹出框)*/
        vc_alert_run:function(data)
        {
            data = $.extend({
                'timeout_remove':null,
                'click_remove':null
            },Default_,data,attr_json_($(this)));
            var alert = {
                'alert_add':function(obj,time,click_remove)
                {
                    return Alert2_.body_background1(obj,time,click_remove);
                },
                'alert_delete1':function(obj)
                {
                    Alert2_.delete_div1('body1',obj);
                }
            };
            $(this).each(function(){
                var obj = $(this);
                /*它们也可以共同放在一个元素上面*/
                var content = obj.find('[vc_alert_content]');/*弹出内容*/
                var click_hide = obj.find('[vc_alert_click="hide"]');/*点击*/
                alert.alert_add(content,data.timeout_remove,data.click_remove);
                click_hide.click(function(){
                    alert.alert_delete1(content);
                });
            });
            return $(this);
        },
        /*购物车数量的统计与提交*/
        /*div[vc_cart_update="{{ cart.id }}"]>button[vc_update="minus"]+input[name="pn[{{ cart.id }}]"]+button[vc_update="plus"]*/
        vc_2_cartUpdate:function (data)
        {
            data = $.extend({
                'is_ajax':'yes'
            },Default_,data,attr_json_($(this)));

            function ajax_(obj)
            {
                if(data.is_ajax == 'yes'){
                    var url = window.location.href;
                    var name = obj.attr('name');
                    var send_data = {};
                    var data_attr = obj.attr('data-request-data');data_attr = data_attr?data_attr.split(','):null;
                    if(data_attr){
                        /*<input type="text" name="qty" data-request-data="_handler:onAddToCart,qty:1,product:{{ product.id }}" />*/
                        for(var i in data_attr){
                            var a = data_attr[i].split(':');
                            send_data[a[0]] = a[1];
                            if(a[0] == name){
                                send_data[a[0]] = obj.val();
                            }
                            send_data['length'] = i;
                        }
                    }else{
                        /*name = {123:"1"}*/
                        var num= name.replace(/[^0-9]/ig,'');
                        name={};name[num]=obj.val();
                        send_data = {"_handler":"onUpdateCart","pn":name};
                    }
                    $.post(url,send_data,function(){
                        $('#vc_order_total').load(location.href+" #vc_order_total");
                    });
                }
            }
            $(this).each(function () {
                if ($(this).attr('vc_true')!=data.vc_true2_) {
                    var obj = $(this);
                    var obj_c = obj.find('[vc_update]');
                    var input = obj.find('input');
                    obj_c.on('click',function(){
                        var val = parseInt(input.val());
                        var type = $(this).attr('vc_update');
                        if(type == 'plus'){
                            input.val(val+1);
                        }else if(type == 'minus'){
                            if(input.val()>1){
                                input.val(val-1);
                            }
                        }
                        ajax_(input);
                    });
                    input.change(function(){
                        ajax_(input);
                    });
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
        },
        /*评星，评论五角星*/
        /*span[vc_score="rating"]>a[class="iconfont"]{&#xe707;}*/
        vc_2_score: function (data) {
            data = $.extend({},Default_,data,attr_json_($(this)));
            $(this).each(function () {
                if ($(this).attr('vc_true') != data.vc_true2_) {
                    var obj = $(this);
                    var input = $('[name='+obj.attr('vc_score')+']');

                    var score = obj.html();
                    obj.append(score + score + score + score);
                    obj.children().click(function () {
                        $(this).prevAll().addBack().removeClass('color_eee').addClass('color_ff0');
                        $(this).nextAll().removeClass('color_ff0').addClass('color_eee');
                    });

                    obj.parents('form').find('[type=submit]').click(function(){
                        input.val(obj.find('.color_ff0').length);
                    });
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
        },

        /*验证最后一位不通过自动删除最后一位,一般用于电话vc_tell="tel"或邮编vc_tell="zip"*/
        vc_form_auto:function(data)
        {
            data = $.extend({
                're':/[^0-9]+/g
            },Default_,data,attr_json_($(this)));
            $(this).each(function () {
                $(this).on('input propertychange', function () {
                    Form_.Auto.exe({"re":data.re,"obj":$(this)});
                });
            });
            return $(this);
        },
        /*验证邮箱vc_tell="email"*/
        vc_form_email:function(data)
        {
            data = $.extend({},Default_,data,attr_json_($(this)));
            var Email = {
                'exe':function(obj)
                {
                    var str = obj.val();
                    //var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-]{1,8})$/;
                    var re = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                    var re2 = /[^a-zA-Z0-9@._-]{1,6}/g;
                    var hint = str.match(re2)?str.match(re2)[0]:null;

                    if(!re.test(str) || str.length > 200){
                        Email.alert_add(obj,hint);
                    }else{
                        Email.alert_delete(obj);
                    }
                },
                'alert_add':function(obj,hint_)
                {
                    obj.attr('vc_tell_is','error');
                    var hint = obj.attr('hint');/*输入不匹配时提示语*/
                    hint = hint?hint:Form_.data.hint;
                    hint = hint_?hint+'('+hint_+')':hint;
                    Alert2_.relative1(obj,hint,3300,'click_remove');
                },
                'alert_delete':function(obj)
                {
                    obj.attr('vc_tell_is','pass');
                    Alert2_.delete1('relative1');
                }
            };
            $(this).each(function () {
                $(this).on('blur', function () {
                    Email.exe($(this));
                });
            });
            return $(this);
        },
        /*验证长度，必须有vc_tell属性，在有vc_length="6,16"最少长度,最大长度，只有一位如vc_length="16"则只验证最大长度*/
        vc_form_length:function(data)
        {
            data = $.extend({
                /*'length':{"min":4,"max":16},/!*电话*!/*/
                /*'length':{"min":6,"max":200},/!*邮箱*!/*/
                'length':{"min":4,"max":200},/*综合默认长度限制，vc_length="这里面没有内容才会触发默认长度限制"*/
                'tell_type':'self'/*self仅验证自己，siblings为验证他前后兄弟元素总输入长度之合*/
            },Default_,data,attr_json_($(this)));
            $(this).each(function () {
                $(this).on('blur', function () {
                    switch(data.tell_type){
                        case 'self':Form_.Length_tell.self($(this),data.length);
                            break;
                        case 'siblings':Form_.Length_tell.siblings($(this));
                            break;
                    }
                });
            });
            return $(this);
        },
        /*验证不通过阻止提交vc_tell="form"写在表单上或表单父元素上*/
        vc_form_submit:function(data)
        {
            data = $.extend({},Default_,data,attr_json_($(this)));
            var form_submit = {
                'alert_add':function(hint,time,click_remove)
                {
                    Alert2_.body1(hint,time,click_remove);
                },
                'alert_add2':function(form,hint,time,click_remove)
                {
                    Alert2_.body1(hint,time,click_remove);
                    var set_timeout = setTimeout(function ()
                    {
                        if(form.attr('vc_tell_is') == 'submit'){
                            form.removeAttr('vc_tell_is');
                        }
                        clearTimeout(set_timeout);
                    },time);
                }
            };
            if($(this).attr('vc_true')!=data.vc_true2_) {
                $(this).each(function () {
                    var form = $(this);
                    if(form.attr('vc_tell') != 'break'){
                        form.submit(function (e) {
                            var submit = Form_.Other.submit(form);
                            if(submit['vc_tell_is'] == 'error'){
                                form_submit.alert_add(submit['hint'],3300,true);
                                return false;
                            }else if(submit['vc_tell_is'] == 'submit'){
                                form_submit.alert_add(submit['hint'],88888,true);
                                return false;
                            }else{
                                form.attr('vc_tell_is','submit');
                                $._data(form, 'e', null);
                            }
                        });

                        form.on('change',function(){
                            form.attr('vc_tell_is','pass');
                        });
                    }
                });
                $(this).attr('vc_true', data.vc_true_);
            }
            return $(this);
        },
        /*表单验证集合*/
        vc_tell:function(data)
        {
            data = $.extend({/*'tell_type':['tel','zip','email']*/},Default_,data,attr_json_($(this)));
            /*for(var i=0;i<data.tell_type.length;i++){
                if($(this).attr('vc_tell') == data.tell_type[i]){
                    $(this).find('input').'vc_form_'+data.tell_type[i]();
                }
            }*/

            $(this).each(function(){
                if($(this).find('input').length > 0){
                    switch($(this).attr('vc_tell')){
                        case 'tel':$(this).find('input').vc_form_auto();
                            break;
                        case 'zip':$(this).find('input').vc_form_auto();
                            break;
                        case 'email':$(this).find('input').vc_form_email();
                            break;
                    }
                    $(this).attr('vc_length') && $(this).find('input').vc_form_length();
                }else{
                    switch($(this).attr('vc_tell')){
                        case 'tel':$(this).vc_form_auto();
                            break;
                        case 'zip':$(this).vc_form_auto();
                            break;
                        case 'email':$(this).vc_form_email();
                            break;
                    }
                    $(this).attr('vc_length') && $(this).vc_form_length();
                }

                if($(this).attr('vc_tell') == 'form'){
                    if($(this)[0].tagName == 'FORM'){
                        $(this).vc_form_submit();
                    }else{
                        var form = $(this);
                        var hint = form.attr('hint');
                        if(hint){
                            form.find('form').attr('hint',hint);
                        }
                        form.find('form').vc_form_submit();
                    }
                }
            });
            return $(this);
        },
        /*自动登录自动注册*/
        vc2_autoLogin:function(data){
            data = $.extend({},Default_,data,attr_json_($(this)));
            var form = $(this);
            var Form = {
                'form':form,
                'hint':form.find('[vc_auto-user="hint"]'),
                'tel':form.find('[vc_auto-user=tel]'),/*self:<vc_auto-user="hint">*/
                'email':form.find('[vc_auto-user=email]'),/*self:<vc_auto-user="hint">*/
                'address':form.find('[vc_auto-user="address"]'),/*children:<select>*/
                'button':form.find('[vc_auto-user=button]'),/*children:<vc_tell="children_submit">*/
                'password':form.find('[vc_auto-user=password]'),
            };
            var Form_c = {
                'tel':Form.tel.find('input'),
                'email':Form.email.find('input').eq(0),
                'email2':Form.email.find('input').eq(1),
                'email_i':$('#vc_email_i'),
                'address':Form.address.find('select'),
                'button':Form.button.find('[vc_tell]'),
                'password':Form.password.find('input').eq(0),
                'repassword':Form.password.find('input').eq(1)
            };
            var Fill = {
                'ajax_show':function(Form_c,type)
                {
                    var email = Form_c.email.val();

                    function address(id)
                    {
                        var state = 'null';
                        if(id == '222' || id == '241' || id == '182' || id == '145'){/*泰国，越南，菲律宾，马来西亚时需要自动填充邮箱 || id == '17'*/
                            state = 'pass';
                        }else{
                            state = 'error';
                        }
                        return state;
                    }

                    var tel = Form_c.tel.val();
                    if(type == 'tel'){
                        if(tel.length>6){
                            email = tel+'@default.com';
                        }
                    }else{
                        /*如果该地区邮箱是非必填的且邮箱输入是错误的，用手机号做邮箱*/
                        var re = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                        if(address(Form_c.address.val()) != 'error' && (!re.test(email) || email.length <= 6 || email.length > 200)){
                            if(tel.length>6){
                                email = tel+'@default.com';
                            }
                        }
                    }

                    $.ajax({
                        type : 'post',
                        url : window.location.href,
                        data : {'_handler':'onValidateEmail','email':email},
                        async : true,/*异步请求*/
                        success : function(data){
                            /*大于0就是已经注册，显示登录*/
                            if (data['data'] > 0) {
                                if(type == 'tel'){
                                    //Form.email.hide();Form.tel.show();
                                    Form_c.tel.attr('required','true');
                                }else if(type == 'email'){
                                    //Form.tel.hide();Form.email.show();
                                    Form_c.tel.removeAttr('required');
                                }
                                Form.hint.show();
                                Form.button.show();
                                Form.password.show();
                                Form_c.button.attr('vc_tell_is','error');
                                Form_c.password.val(Form_c.tel.val()).attr('name','password');
                                Form_c.repassword.removeAttr('name');
                            }else{
                                /*没有注册自动进行注册*/
                                Form.tel.show();
                                Form.email.show();
                                Form.hint.hide();
                                Form.button.hide();
                                Form.password.hide();
                                Form_c.button.attr('vc_tell_is','pass');
                                Form_c.password.val(Form_c.tel.val()).attr('name','password');
                                Form_c.repassword.val(Form_c.tel.val()).attr('name','repassword');
                                Fill.alert_delete(Form_c.button);

                                if(address(Form_c.address.val()) == 'error'){
                                    /*显示必填图标并清空填充的默认邮箱*/
                                    Form_c.email_i.show();
                                    Form_c.email.attr('required','true');
                                    if(Form_c.email.val().indexOf('@default.com') > -1){
                                        Form_c.email.val('');
                                        Form_c.email2.val('');
                                    }else{
                                        Form_c.email2.val(Form_c.email.val());
                                    }
                                }else{
                                    /*隐藏必填图标并自动填充默认邮箱*/
                                    Form_c.email_i.hide();
                                    Form_c.email.removeAttr('required').attr('vc_tell_is','pass');
                                    if(type == 'tel'){
                                        if(Form_c.email.val().length <= 6){
                                            Form_c.email.val(email);
                                            Form_c.email2.val(email);
                                        }else if( Form_c.email.val().indexOf('@default.com') > -1){
                                            Form_c.email.val(email);
                                            Form_c.email2.val(email);
                                        }else{
                                            Form_c.email2.val(Form_c.email.val());
                                        }
                                    }else{
                                        Form_c.email.val(email);
                                        Form_c.email2.val(email);
                                    }
                                }
                            }
                        },error:function(){
                            Fill.alert_add(Form_c.password);
                        }
                    });
                },
                'ajax_signIn':function(Form_c)
                {
                    /*登录*/
                    var email = Form_c.email.val();
                    if(email.length<6){
                        email = Form_c.tel.val()+'@default.com';
                    }
                    var data = {'_handler':'onSignin','email':email,'password':Form_c.password.val()};
                    $.post(window.location.href,data,function(){
                        Fill.alert_delete(Form_c.password);location.reload();
                    }).error(function(){
                        Fill.alert_add(Form_c.password);
                    });
                },
                'alert_add':function(obj,hint,time)
                {
                    time = time?time:1200;
                    obj.attr('vc_tell_is','error');
                    var hint_ = obj.attr('hint');/*输入不匹配时提示语*/
                    hint = hint?hint:hint_?hint_:Form_.data.hint;
                    Alert2_.body1(hint, time,'click_remove');
                },
                'alert_delete':function(obj)
                {
                    obj.attr('vc_tell_is','pass');
                    Alert2_.delete1('body1');
                }
            };

            if($(this).attr('vc_true')!=data.vc_true2_) {
                Form_c.address.on('change',function(){
                    Fill.ajax_show(Form_c,'email');
                });
                Form_c.tel.on('change',function(){
                    Fill.ajax_show(Form_c,'tel');
                });
                Form_c.email.on('change',function(){
                    Fill.ajax_show(Form_c,'email');
                });
                Form_c.email.on('input propertychange',function(){
                    Form_c.email2.val($(this).val());
                });
                Form_c.button.click(function(){
                    Fill.ajax_signIn(Form_c);
                });
                /*自动登录*/
                Form.form.find('input').not(Form_c.password).not(Form_c.email).not(Form_c.tel).on('focus',function(){
                    if(Form_c.button.attr('vc_tell_is') == 'error'){
                        Fill.ajax_signIn(Form_c);
                    }
                });
                $(this).attr('vc_true',data.vc_true_);
            }
            return $(this);
        }
    });

    var Form_ = {
        'data':{'hint':' Input Error'},
        'Length':function(obj)
        {
            var length = obj.attr('vc_length');
            var min = null;
            var max = null;
            var state = null;
            if(length){
                if(length.indexOf(',') > -1){
                    var arr = length.split(',');
                    if(arr[1]){
                        min = arr[0];
                        max = arr[1];
                        state = 'yes';
                    }else{
                        min = arr[0];
                        max = arr[0];
                        state = 'no';
                    }
                }else{
                    min = length;
                    max = length;
                    state = 'signNo';
                }
            }else{
                min = 0;
                max = 256;
                state = 'lengthNo';
            }
            return {'min':parseInt(min),'max':parseInt(max),'state':state};
        },
        'Auto':{/*自动向前删除不匹配的内容*/
            'exe':function (data)
            {
                data = $.extend({
                    'obj':null,
                    're':/[^0-9]+/g
                },Default_,data);

                if(!data.obj){return null;}
                var re = data.re;
                var obj = data.obj;
                var str = obj.val();
                var end_str = str.substr(-1);
                var str_length = str.length;
                var max_length = Form_.Length(obj)['max'];
                if(re.test(end_str)){
                    Form_.Auto.alert_add(obj);
                }else{
                    Form_.Auto.alert_delete(obj);
                }
                if(str_length>=0 && str_length<=max_length){
                    if(re.test(end_str)){
                        str = str.substr(0, str.length-1);
                    }
                    obj.val(str.replace(re,''));
                }else if(str_length>max_length){
                    str = str.replace(re,'');
                    function a(str,obj){
                        if(obj.length>0){
                            var max_length = Form_.Length(obj)['max'];
                            var strB = str.substr(0,max_length);
                            obj.val(strB).focus();
                            var next = obj.nextAll('input').eq(0);
                            if(next.length>0 && str.length - strB.length){
                                return a(str.substr(max_length),next);
                            }
                        }
                    }
                    a(str,obj);
                }
            },
            'alert_add':function(obj)
            {
                var hint = obj.attr('hint');/*输入不匹配时提示语*/
                hint = hint?hint:Form_.data.hint;
                Alert2_.relative1(obj,hint,3300,'click_remove');
            },
            'alert_delete':function(obj)
            {
                obj.attr('vc_tell_is','pass');
                Alert2_.delete1('relative1');
            }
        },
        'Length_tell':{
            'self':function(obj,length_)
            {
                var length = Form_.Length(obj);
                var min_length = length['min'];
                var max_length = length['max'];
                var state_length = length['state'];
                max_length = max_length<1?2:max_length;
                var val_length = obj.val().length;

                if(state_length != 'yes'){
                    if(length_){
                        if(state_length == 'signNo'){
                            if(obj.attr('required')){
                                min_length = length_['min'];
                            }else{
                                min_length = 0;
                            }
                        }else if(state_length == 'lengthNo'){
                            min_length = length_['min'];
                            max_length = length_['max'];
                        }
                        if(val_length < min_length || val_length > max_length){
                            Form_.Length_tell.alert_add(obj,{'min':min_length,'max':max_length});
                        }else{
                            Form_.Length_tell.alert_delete(obj);
                        }
                    }else{
                        if(val_length > max_length){
                            Form_.Length_tell.alert_add(obj,length);
                        }else if(obj.attr('required') && val_length < 0){
                            Form_.Length_tell.alert_add(obj,length);
                        }else{
                            Form_.Length_tell.alert_delete(obj);
                        }
                    }
                }else if(val_length < min_length || val_length > max_length){
                    Form_.Length_tell.alert_add(obj,length);
                }else{
                    Form_.Length_tell.alert_delete(obj);
                }
            },
            'siblings':function(obj)/*验证自己与兄弟长度电话用到*/
            {
                var length = Form_.Length(obj);
                var min_length = length['min'];
                var max_length = length['max'];
                var state_length = length['state'];
                var val_length = obj.val().length;
                if(state_length != 'yes'){
                    return null;
                }

                if (val_length > 0 && (val_length < min_length || val_length > max_length)) {/*验证自己是否有输入并且输入长度正常*/
                    Form_.Length_tell.alert_add(obj,length);
                }else{
                    var input_a = 0; //有输入长度的
                    var input_ok = 0; //合法的
                    var input_length = obj.siblings('input').length; //兄弟元素长度
                    obj.siblings('input').each(function () {
                        var min_length = Form_.Length($(this))['min'];
                        var val_length = $(this).val().length;
                        if (val_length > 0) {
                            input_a = input_a + 1;
                        }
                        if (val_length == min_length) {
                            input_ok = input_ok + 1;
                        }
                    });
                    /*只要兄弟元素里有一个进行了输入则进行验证，相当于验证总长度*/
                    if(input_a > 0){
                        if(input_ok != input_length){
                            Form_.Length_tell.alert_add(obj,length);
                        }else{
                            Form_.Length_tell.alert_delete(obj);
                        }
                    }else{
                        /*如果没有兄弟元素，删掉提示与取消禁止提交【最上层的if验证了自己是合法的】*/
                        Form_.Length_tell.alert_delete(obj);
                    }
                }
            },
            'alert_add':function(obj,length)
            {
                obj.attr('vc_tell_is','length');
                var hint = null;
                if(obj.attr('hint_length')){
                    hint = obj.attr('hint_length');/*长度不匹配时元素上的hint_length="提示语"*/
                }else if(length){
                    var min_length = length['min'];
                    var max_length = length['max'];
                    if(min_length == max_length){
                        hint = 'Length must( '+min_length+' )';
                    }else{
                        hint = 'Input Length limit( '+min_length+'~'+max_length+' )';
                    }
                }else{
                    hint = Form_.data.hint;
                }
                Alert2_.relative1(obj,hint,3300,'click_remove');
            },
            /*'alert_addBody':function(obj,length,title)
            {
                obj.attr('vc_tell_is','length');
                var hint = null;
                if(length){
                    var min_length = length['min'];
                    var max_length = length['max'];
                    hint = title+'—Input Length limit('+min_length+'~'+max_length+')';
                }else if(obj.attr('hint_length')){
                    hint = obj.attr('hint_length');/!*长度不匹配时元素上的hint_length="提示语"*!/
                }else{
                    hint = title+'—'+Form_.data.hint;
                }

                Alert2_.body1(obj,hint,3300,'click_remove');
            },*/
            'alert_delete':function(obj)
            {
                obj.attr('vc_tell_is','pass');
                Alert2_.delete1('relative1');
            }
        },
        'Other':{
            'radio':function(form)
            {
                var obj = form.find('[vc_tell="radio"]');
                var radio_data = null;
                if(obj.length>0){
                    var name = {};
                    obj.each(function () {
                        name[$(this).attr('name')]=0;
                    });
                    radio_data = {};
                    $.each(name,function(key){
                        radio_data[key] = {'hint':'Please check the options','vc_tell_is':'radio'};
                        var obj_c = $('[name="'+key+'"]');
                        obj_c.eq(0).attr('vc_tell_is','radio');
                        obj_c.each(function(){
                            var hint = $(this).attr('hint');
                            if(hint){
                                radio_data[key]['hint'] = hint;
                                obj_c.eq(0).attr('hint',hint);
                            }
                            if($(this).prop('checked')){
                                radio_data[key]['vc_tell_is'] = 'pass';
                                obj_c.eq(0).attr('vc_tell_is','pass');
                            }
                        });
                    });
                }
                return radio_data;
            },
            'submit':function(form)
            {
                Form_.Other.radio(form);/*必选框*/
                var error_arr = {'submit':null};
                form.find('[vc_tell]').addBack().each(function (i) {
                    var hint = null;
                    var vc_tell_is = $(this).attr('vc_tell_is');
                    switch (vc_tell_is) {
                        case 'length':
                            hint = $(this).attr('hint_length');
                            if(!hint){
                                $(this).val($(this).val()).focus();
                                hint = 'Length' + Form_.data.hint;
                            }
                            error_arr[i] = hint;
                            break;
                        case 'error':
                            hint = $(this).attr('hint');
                            if(!hint){
                                if($(this)[0].tagName == 'INPUT'){
                                    $(this).val($(this).val()).focus();
                                    hint = Form_.data.hint;
                                }else{
                                    var type = $(this).attr('vc_tell');
                                    hint = type+'—'+Form_.data.hint;
                                }
                            }
                            error_arr[i] = hint;
                            break;
                        case 'radio':
                            hint = $(this).attr('hint');
                            if(!hint){
                                var type = $(this).attr('vc_tell');
                                hint = type+'— Please check the options';
                            }
                            error_arr[i] = hint;
                            break;
                        case 'submit':
                            hint = $(this).attr('hint');
                            hint = hint?hint:'Half a moment...';
                            error_arr['submit'] = hint;
                            break;
                        default: error_arr[i] = null;
                    }
                });

                var arr={'hint':'Radio please select','vc_tell_is':'pass','vc_tell_type':null};
                $.each(error_arr,function(i){
                    if(i != 'submit' && error_arr[i]){
                        arr['hint'] = error_arr[i];
                        arr['vc_tell_is'] = 'error';
                    }
                });
                if(arr['vc_tell_is'] == 'pass' && error_arr['submit']){
                    arr['hint'] = error_arr['submit'];
                    arr['vc_tell_is'] = 'submit';
                }
                return arr;
            }
        }
    };

    var Default_ = {
        'vc_true_':1,
        'vc_true2_':1
    };

    var Alert2_ = {
        'id':{'relative1':'vc__alert_relative1','body1':'vc__alert_body1'},
        'relative1':function(obj,hint,time,click_remove)
        {
            Alert2_.id.relative1 = Alert2_.id.relative1+Math.ceil(Math.random()*10);
            var id_name = Alert2_.id.relative1;
            hint = hint?hint:'Formatting error';
            if($('#'+id_name).length<1){
                if(obj.parent().css('position')=='static'){
                    obj.parent().css('position','relative');
                }
                obj.after('<div id="'+ id_name +'" style="width:100%;position:absolute;top:-15px;left:0;font-size: 16px;text-align:center;padding: 10px;color:#fff;background-color: rgba(50, 10, 0, 0.8);">' + hint + '</div>');
                if(time){
                    /*如果有time，在time时间后删除（time为毫秒）*/
                    var set_timeout = setTimeout(function () {$('#'+id_name).remove();clearTimeout(set_timeout);},time);
                }
            }
            if(click_remove){
                /*点击时删除弹框*/
                $('#'+id_name).click(function(){
                    $('#'+id_name).remove();
                    set_timeout&&clearTimeout(set_timeout);
                });
                obj.click(function(){
                    $('#'+id_name).remove();
                    set_timeout&&clearTimeout(set_timeout);
                });
            }
            return $('#'+id_name);
        },
        'body1':function(hint,time,click_remove)
        {
            hint = hint?hint:'null';
            var id_name = Alert2_.id.body1;
            var div = '<div id="'+id_name+'" style="text-align:center;width: 100%;height:100%;min-height: 1000px;position: fixed;top: 0;left: 0;z-index: 10001;background-color: rgba(0, 0, 0, 0.7);"><div style="position:relative;top:10%;width:80%;margin:0 auto;min-height:100px;padding: 6px 3px;line-height: 24px;display: flex;justify-content: center;align-items:center;font-size:24px;color:#fff;background:#000;background-color: rgba(0, 0, 0, 0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;vertical-align: middle;">' + hint + '</div></div>';
            if ($('#'+id_name).length < 1) {
                $('body').append(div);
            }else{
                $('#'+id_name).remove();
                $('body').append(div);
            }
            if(time){
                /*如果有time，在time时间后删除（time为毫秒）*/
                var set_timeout = setTimeout(function () {$('#'+id_name).remove();clearTimeout(set_timeout);},time);
            }
            if(click_remove){
                $('#'+id_name).click(function(){
                    $(this).remove();
                    set_timeout&&clearTimeout(set_timeout);
                });
            }
            return $('#'+id_name);
        },
        /*就只是一个黑色大背景html为要弹出来的内容*/
        'body_background1':function(html,time,click_remove)
        {
            var id_name = Alert2_.id.body1;
            if(!html || html.length<1){
                return $('#'+id_name);
            }
            html.show(100);
            html.css('position')!='static' || html.css('position','relative');
            (!parseInt(html.css('z-index')) || parseInt(html.css('z-index'))<10001) && html.css('z-index','10002');
            var div = '<div id="'+id_name+'" style="text-align:center;width: 100%;height:100%;min-height: 1000px;position: fixed;top: 0;left: 0;z-index: 10001;background-color: rgba(0, 0, 0, 0.7);"></div>';
            if ($('#'+id_name).length < 1) {
                $('body').append(div);
            }
            if(time){
                /*如果有time，在time时间后删除（time为毫秒）*/
                var set_timeout = setTimeout(function () {$('#'+id_name).remove();html.hide(300);clearTimeout(set_timeout);},time);
            }
            if(click_remove){
                $('#'+id_name).click(function(){
                    $(this).remove();
                    html.hide(300);
                    set_timeout&&clearTimeout(set_timeout);
                });
            }
            return $('#'+id_name);
        },
        /*通常用于验证通过的调用，传要删除的弹框名称name(name为Alert2_对象id里的)，click_remove为真在点击的时候才删除*/
        'delete1':function(name,click_remove)
        {
            name = name?name:'relative1';
            var obj = $('#'+Alert2_.id[name]);
            if(obj.length>0){
                if(click_remove){
                    /*还必须满足点击才进行删除*/
                    obj.click(function(){
                        obj.remove();
                    });
                }else{
                    /*只要有就删除*/
                    obj.remove();
                }
            }
        },
        /*通常用于内容弹框，传要删除的弹框名称name与要隐藏的div(name为Alert2_对象id里的)，click_remove为真在点击的时候才删除*/
        'delete_div1':function(name,div,click_remove)
        {
            name = name?name:'relative1';
            var obj = $('#'+Alert2_.id[name]);
            if(click_remove){
                /*还必须满足点击才进行删除*/
                obj.length>0&&obj.click(function(){
                    obj.remove();
                    div.length>0&&div.hide(300);
                });
            }else{
                /*只要有就删除*/
                obj.length>0&&obj.remove();
                div.length>0&&div.hide(300);
            }
        },
        /*点击的时候删除弹框与div*/
        'click_delete1':function(div)
        {
            $(this).click(function(){
                $(this).remove();
                div.length>0&&div.hide(300);
            });
        },
        /*在time时间后删除弹框与div*/
        'time_delete1':function(time,div)
        {
            if(time){
                var set_timeout = setTimeout(function () {$(this).remove();div.length>0&&div.hide(300);clearTimeout(set_timeout);},time);
            }
        }
    };

    function attr_json_(obj)
    {
        var data = obj.attr('vc_data');
        var arr = null;
        if(data){
            arr = jQuery.parseJSON(data);
        }
        return arr;
    };
})(jQuery);

$(function(){
    /*五角星*/
    var vc_score = $('[vc_score]');
    if(vc_score.length>0){
        vc_score.vc_2_score();
    }

    /*表单验证*/
    var vc_tell = $('[vc_tell]');
    if(vc_tell.length>0){
        vc_tell.vc_tell();
    }
});
/*拒絕修改*/