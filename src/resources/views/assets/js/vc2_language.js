/*默认语言与语言切换与收货地址修改集合库*/
;(function(){
    $.fn.extend({
        'vc2_languageSwitching':function()
        {
            var A = {
                'obj':$(this),
                ajax_:function(obj,locale,currency)
                {
                    var selectLocale = obj.find('[selectLocale="1"]');
                    if(selectLocale.length>0){
                        selectLocale.html('。......。......。......。......').css({'opacity':'0.1','overflow':'hidden','height':'50px'});
                        selectLocale.animate({'margin-right':'100px','opacity':'1'},2600);
                    }

                    if(!locale || locale.constructor != String){
                        locale = vc_default.locale;
                    }
                    locale = locale.toLowerCase();/*小写*/
                    if(!currency || currency.constructor != String){
                        var div = '[locale='+locale+']';
                        div = obj.find(div);
                        if(div.length<1){
                            if(locale.substr(0,2) == 'zh'){
                                currency = 'HKD';
                            }else{
                                currency = vc_default.currency;
                            }
                        }else{
                            currency = div.attr('money');
                        }
                    }

                    locale = locale.substr(0,2);
                    locale = locale == 'zh'?'zh-cn':locale;
                    currency = currency.toUpperCase();/*大写*/

                    var url = window.location.href;
                    var end_j = url.indexOf('#') >= 0?window.location.hash:'';
                    function url_f(url){
                        var reg = new RegExp("(^|&|/?)(locale|currency|vc_locale_break)=([^&]*)");
                        url = url.replace(reg,'');
                        if(reg.test(url)){
                            url = url_f(url);
                        }
                        return url;
                    }
                    url = url_f(url);
                    if(url.indexOf('#') >= 0){
                        var top = url.substr(0,url.indexOf('#'));
                        if(url.indexOf('?') >= 0){
                            url = top+'&locale='+locale+'&currency='+currency+end_j;
                        }else{
                            url = top+'?locale='+locale+'&currency='+currency+end_j;
                        }
                    }else if(url.indexOf('?') >= 0){
                        url = url+'&locale='+locale+'&currency='+currency+end_j;
                    }else{
                        url = url+'?locale='+locale+'&currency='+currency+end_j;
                    }
                    location.href = url;
                }
            };

            if($(this).length>0){
                var obj = A.obj = $(this);
                var selectLocale = obj.find('[selectLocale]');
                if(selectLocale.length>0){
                    if($(this).find('.active').length>0){
                        var locale_obj = $(this).find('.active');
                        if(locale_obj.attr('locale_name')){
                            selectLocale.html(locale_obj.attr('locale_name')+'&nbsp;▼');
                        }else{
                            selectLocale.html(locale_obj.html()+'&nbsp;▼');
                        }
                    }
                }
                /*hide_是控制包裹语言的大盒子如<ul hide="hover">,如:鼠标经过显示这了盒子或隐藏*/
                var hide_ = obj.find('[hide]');
                if(hide_.length>0){
                    switch(hide_.attr('hide')){
                        case 'hover':obj.hover(function(){hide_.show();},function(){hide_.hide();});
                        break;
                        case 'click':obj.click(function(){hide_.toggle();});
                        break;
                        default:obj.hover(function(){hide_.show();},function(){hide_.hide();});
                    }
                }

                if(obj.find('select').length>0){
                    obj.find('select').change(function(){
                        A.ajax_(obj,$(this).find("option:selected").attr('locale'),$(this).find("option:selected").attr('money'));
                    });
                }else{
                    obj.find('[locale]').hover(function(){
                        $(this).addClass('button_ff0');
                        $(this).click(function(){
                            A.ajax_(obj,$(this).attr('locale'),$(this).attr('money'));
                        });
                    },function(){
                        $(this).removeClass('button_ff0');
                    });
                }
            }
            return this;
        },
        'vc2_limit':function(data)
        {
            //已有收货地址country_id="122";name="Checkout[address_s]"，
            //没有收货地址name="Checkout[country_id]"
            //移动电话name="Checkout[phonenumber]"
            //货到付款id="payment_method_11"
            data = $.extend({
                "address":$(this),
                "address_s":null,
                "address_b":null,
                "tel":null,
                "payment_method11":null,
                'payment_method11_parents':'div'
            },data);

            function limit(address)
            {
                /*根据国家设置它们的电话号码长度*/
                if(data.tel && data.tel.length>0){
                    var obj = data.tel;
                    var div = $('#vc2_tel_limit_tel_length_div');
                    var div_bottom = $('#vc2_tel_limit_tel_length_div_bottom');
                    switch(address.val()){
                        case '1':
                            div.show().val('+1');
                            div_bottom.html('1');
                            obj.attr('vc_length','10,11');//1美国10
                            break;
                        case '4':
                            div.hide();
                            div_bottom.html('');
                            obj.attr('vc_length','10');//4法国10
                            break;
                        case '5':
                            div.show().val('+49');
                            div_bottom.html('49');
                            obj.attr('vc_length','9,11');//5德国11
                            break;
                        case '8':
                            div.hide();
                            div_bottom.html('');
                            obj.attr('vc_length','10');//8意大利10
                            break;
                        case '9':
                            div.hide();
                            div_bottom.html('');
                            obj.attr('vc_length','9');//9西班牙9
                            break;
                        case '17':
                            div.show().val('+44');
                            div_bottom.html('44').parent().show();
                            obj.attr('vc_length','10,11');//17英国10
                            break;
                        case '114':
                            div.hide();
                            div_bottom.html('');
                            obj.attr('vc_length','10');//114香港10
                            break;
                        case '117':
                            div.show().val('+91');
                            div_bottom.html('91').parent().show();
                            obj.attr('vc_length','9,11');//117印度尼西亚12
                            break;
                        case '122':
                            div.show().val('+81');
                            div_bottom.html('81').parent().show();
                            obj.attr('vc_length','10,11');//122日本11
                            break;
                        case '145':
                            div.show().val('+60');
                            div_bottom.html('60').parent().show();
                            obj.attr('vc_length','9,11');//145马来西亚10,11
                            break;
                        case '182':
                            div.show().val('+63');
                            div_bottom.html('63').parent().show();
                            obj.attr('vc_length','10,11');//182菲律宾10
                            break;
                        case '205':
                            div.show().val('+65');
                            div_bottom.html('65').parent().show();
                            obj.attr('vc_length','8');//205新加坡8
                            break;
                        case '219':
                            div.hide();
                            div_bottom.html('');
                            obj.attr('vc_length','10');//219台湾10
                            break;
                        case '222':
                            div.show().val('+66');
                            div_bottom.html('66').parent().show();
                            obj.attr('vc_length','9,10');//222泰国10
                            break;
                        case '241':
                            div.show().val('+84');
                            div_bottom.html('84').parent().show();
                            obj.attr('vc_length','9,11');//241 越南10,11
                            break;
                        default:
                            div.hide();
                            div_bottom.html('');
                            obj.attr('vc_length','16');
                    }
                }

                /*当选中不支持货到付款的国家时将货到付款的选项致灰*/
                var payment_method11 = data.payment_method11;
                if(payment_method11 && payment_method11.length>0){
                    var id = address.attr('country_id');
                    id = id?id:address.val();
                    if(id == '114' || id == '117' || id == '122' || id == '205' || id == '219' || id == '17' || id == '5' || id == '3' || id == '2' || id == '170' || id == '211' || id == '116' || id == '1'){
                        payment_method11.parents(data.payment_method11_parents).hide().find('[type="radio"]').removeAttr("checked");
                        //payment_method11.parent().next().find('[type="radio"]').attr('checked','true').siblings('.checkedRadio').css('background','#0a0');
                    }else{
                        payment_method11.parents(data.payment_method11_parents).show();
                    }
                }
            }

            if(data.address && data.address.length>0){
                for(var i=0;i<data.address.length;i++){
                    var this_obj = data.address.eq(i);
                    if(this_obj.attr('type') == 'radio'){
                        //已有收货地址
                        if(this_obj.prop('checked')){
                            this_obj.prop('checked',true);
                            data.address_b.eq(i).prop('checked',true);
                            limit(this_obj);
                        }else{
                            this_obj.prop('checked',false);
                            data.address_b.eq(i).prop('checked',false);
                        }

                        this_obj.click(function(){
                            var click_obj = $(this);
                            if(click_obj.prop('checked')){
                                limit(click_obj);
                                for(var i=0;i<data.address.length;i++){
                                    if(data.address_b.eq(i).val() == click_obj.val()){
                                        data.address_s.eq(i).prop('checked',true);
                                        data.address_b.eq(i).prop('checked',true);
                                    }else{
                                        data.address_s.eq(i).prop('checked',false);
                                        data.address_b.eq(i).prop('checked',false);
                                    }
                                }
                            }
                        });
                    }else{
                        //没有收货地址
                        limit(this_obj);
                        this_obj.on('change',function(){
                            limit(this_obj);
                        });
                    }
                }
            }
        },
        vc2_imgLanguage:function(src1,src2,src3)/*介绍图的切换，除了日文泰文其它都显示英文图*/
        {
            var div = $('[vc2_imgLanguage]');
            if(div.length>0) {
                var val = $(this).find('.active').attr('locale');
                val = val.toLowerCase();
                switch (val) {
                    case 'ja':div.attr("src", src1);/*日语*/
                        break;
                    case 'th':div.attr("src", src2);/*泰语*/
                        break;
                    default:div.attr("src", src3);/*英语*/
                }
            }
        }
    });

    var vc_default = {
        'locale':'en',
        'currency':'USD'
    };
})(jQuery);
