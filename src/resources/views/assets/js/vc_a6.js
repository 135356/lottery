/*拒絕修改*/
;(function($){
    $.fn.extend({
        /*tab菜单和选项 （vc_tab="true"父div），（vc_tab_top="1"头部选择按扭），（vc_tab_content="1"对应的内容区）*/
        vc_tab:function(data)
        {
            data = $.extend({
                'event': 'click',
                'type': 1
            },Default_,data,attr_json_($(this)));
            var TypeObj = {
                '1' : function(obj)
                {
                    /*通过eq，订单页用*/
                    var vc_top = obj.find('[vc_tab_top]');
                    var vc_content = obj.find('[vc_tab_content]');
                    vc_content.each(function (i) {
                        if (i != 0) {
                            $(this).hide();
                        }
                    });
                    vc_top.each(function (i) {
                        if (data.event == 'hover') {
                            $(this).hover(function () {
                                $(this).addClass('active').siblings().removeClass('active');
                                vc_content.eq(i).show().siblings().hide();
                            });
                        } else {
                            $(this).click(function () {
                                $(this).addClass('active').siblings().removeClass('active');
                                vc_content.eq(i).show().siblings().hide();
                            });
                        }
                    });
                    return $(this);
                },
                '2':function(obj)
                {
                    /*通过父元素的兄弟元素的子元素，首页分类产品用*/
                    obj.find('[vc_tab_top]').each(function () {
                        if (data.event == 'hover') {
                            $(this).hover(function () {
                                $(this).addClass('active');
                                $(this).next().show();
                                $(this).parent().siblings().find('[vc_tab_top]').removeClass('active');
                                $(this).parent().siblings().find('[vc_tab_content]').hide();
                            });
                        } else {
                            $(this).click(function () {
                                $(this).addClass('active');
                                $(this).next().show();
                                $(this).parent().siblings().find('[vc_tab_top]').removeClass('active');
                                $(this).parent().siblings().find('[vc_tab_content]').hide();
                            });
                        }
                    });
                    return $(this);
                }
            };
            $(this).each(function(){
                if($(this).attr('vc_true')!=data.vc_true2_){
                    if(data.type>0 && data.type<=2){
                        TypeObj[data.type]($(this));
                    }
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        /*图片盒子，每一个需要图片盒子,控制图片高等于宽的,都得用一个<div class="imgDIV">包起来。调用$('.imgDIV').vc_imgdiv();*/
        vc_imgDiv:function(data)
        {
            data = $.extend({
                'obj':'img',
            },Default_,data,attr_json_($(this)));

            var WidthObj = {
                'width':function(obj)
                {
                    return obj.eq(0).width();
                },
                'A': function(obj)
                {
                    var i = 0;
                    while(!obj.eq(i).width()){
                        i++;
                        if(i>100){
                            break;
                        }
                    }
                    return obj.eq(i).width();
                },
                'vC':function(obj,obj_z)
                {
                    var widthB = obj.eq(0).width();
                    var width = widthB > 0?widthB+'px':WidthObj.A(obj)+'px';
                    obj_z.css({'height': width, 'line-height':width,'text-align': 'center', 'overflow': 'hidden', 'background': '#eee'});
                    obj_z.find(data.obj).css({
                        'width':data.width?width:null,
                        'max-width': width,
                        'max-height': width,
                        'display':'inline-block',
                        'margin': '0 auto',
                        'text-align': 'center',
                        'vertical-align': 'middle'
                    });
                }
            };

            var obj = $(this);
            $(this).each(function(){
                if($(this).attr('vc_true')!=data.vc_true2_){
                    var obj_z = $(this);
                    WidthObj.vC(obj,obj_z);
                    $(window).resize(function(){
                        WidthObj.vC(obj,obj_z);
                    });
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        /*在父元素上加上一个class或属性用于捕捉，需要控制宽度的子元素加上vc_divided_z="true"。调用$('.a').vc_divided(可以用json形式传css样式进来{"border":"solid 1px #eee"});*/
        vc_divided:function(data)
        {
            data?data:0;
            $(this).each(function(){
                data = $.extend({
                    'length':4
                },Default_,data,attr_json_($(this)));

                var WidthObj = {
                    'A' : function(obj)
                    {
                        var z_obj = obj.find('[vc_divided_z]');z_obj.css(data);
                        var obj_margin_padding_border = (parseInt(obj.outerWidth(true))-parseInt(obj.width()));/*父元素的边框等宽度*/
                        var z_margin_padding_border = (parseInt(z_obj.outerWidth(true))-parseInt(z_obj.width()))*data.length;/*子元素的边框等宽度*/
                        var margin_padding_border = obj_margin_padding_border+z_margin_padding_border;/*所有的边框等宽度*/
                        var width = (parseInt(obj.width()) - margin_padding_border)/data.length;
                        return width;
                    },
                    'vC':function(obj)
                    {
                        var width = WidthObj.A(obj);
                        var css_json = {'width': width + 'px'};css_json = eval('(' + (JSON.stringify(data) + JSON.stringify(css_json)).replace(/}{/, ',') + ')');
                        obj.find('[vc_divided_z]').css(css_json);
                    }
                };

                if($(this).attr('vc_true')!=data.vc_true2_){
                    var obj = $(this);
                    WidthObj.vC(obj);
                    $(window).resize(function(){
                        WidthObj.vC(obj);
                    });
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        /*$('#left_menu').vc_position({"top":'#top_menu',"bottom":'.footer',"type":1}); top距离顶部的距离，bottom距离底部的距离，可以是固定的数字也可以是id选择元素也就是该固定元素上面或下面的元素,type是类型1为最终定位2为实时相对定位*/
        vc_position:function(data)
        {
            data?data:0;
            $(this).each(function(){
                data = $.extend({
                    'top':null,
                    'top2':null,
                    'top3':null,
                    'bottom':null,
                    'bottom2':null,
                    'bottom3':null,
                    'type':1
                },Default_,data,attr_json_($(this)));

                var CssObj = {
                    '1':function(obj,height,top,height2)
                    {
                        var z_index = obj.css('z-index');
                        if(!z_index || z_index == 'auto' || z_index < 1){
                            z_index = 10000;
                        }
                        if(height2 < 0) {
                            top = height2;
                            obj.css({'position': 'fixed', 'top': top + 'px', 'z-index': z_index});
                        }
                        if(height < obj.height()){
                            obj.css({'position':'fixed','top':top+'px','z-index':z_index});
                        }else{
                            obj.css({'position':'relative','top':0});
                        }
                    },
                    '2':function(obj,height,top,height2)
                    {
                        var z_index = obj.css('z-index');
                        if(!z_index || z_index == 'auto' || z_index < 1){
                            z_index = 10000;
                        }
                        if(height2 < 0) {
                            top = top+height2;
                            obj.css({'position':'relative','left':0,'top':top+'px','z-index':z_index});
                        }
                        if(height < obj.height()){
                            obj.css({'position':'relative','left':0,'top':top+'px','z-index':z_index});
                        }else{
                            obj.css({'position':'relative','top':0});
                        }
                    },
                    'vC':function(obj)
                    {
                        var top = 0;
                        if(!isNaN(data.top)){
                            top = parseInt(data.top);
                        }else{
                            top = parseInt($(data.top).outerHeight(true));
                            if(isNaN(data.top2)){
                                top = top+parseInt($(data.top2).outerHeight(true));
                            }
                            if(isNaN(data.top3)){
                                top = top+parseInt($(data.top3).outerHeight(true));
                            }
                        }

                        var bottom = 0;
                        if(!isNaN(data.bottom)){
                            bottom = parseInt(data.bottom);
                        }else{
                            bottom = parseInt($(data.bottom).outerHeight(true));
                            if(isNaN(data.bottom2)){
                                bottom = top+parseInt($(data.bottom2).outerHeight(true));
                            }
                            if(isNaN(data.bottom3)){
                                bottom = top+parseInt($(data.bottom3).outerHeight(true));
                            }
                        }

                        var obj_top = obj.offset().top;obj_top = parseInt(obj_top);
                        var obj_bottom = $(document).height() - $(window).height() - bottom;/*页面总高度-窗口高度=滚动条高度-底部元素的高度*/obj_bottom = data.bottom&&obj_bottom>800?obj_bottom:null;
                        data.type = parseInt(data.type);
                        $(window).on('scroll',function(){
                            var s_top = $(window).scrollTop();s_top = parseInt(s_top);
                            var height = obj_top-s_top;
                            var height2 = obj_bottom?obj_bottom-s_top:null;
                            switch(data.type){
                                case 1:CssObj[1](obj,height,top,height2);
                                    break;
                                case 2:CssObj[2](obj,height,s_top-obj_top+top,height2?height2-top:null);
                                    break;
                                default:CssObj[1](obj,height,top,height2);
                            }
                        });
                    }
                };
                /*暂时解决页面大小改变后浮动异常*/
                if($(this).attr('vc_true')!=data.vc_true2_){
                    var obj = $(this);
                    var obj_vC = CssObj.vC(obj);
                    $(function(){obj_vC;});
                    $(window).resize(function(){
                        obj_vC;
                    });
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        vc_isImg : function(data){
            data = $.extend({
                'size':1,
                'default_img':'images/default_img.png'
            },Default_,data,attr_json_($(this)));
            if($(this).attr('vc_true')!=data.vc_true2_){
                $(this).each(function(){
                    var obj = $(this);
                    var img = new Image();
                    img.src = obj.attr('src');
                    function defaultImg(obj,arr_img,data_img)
                    {
                        var src = obj.attr('src');
                        var host = src.substr(0,src.indexOf('assets'));
                        if(arr_img){
                            obj.attr('src',arr_img);
                        }else if(data_img){
                            if(data_img == 'images/default_img.png'){
                                obj.attr('src',host+'assets/'+data_img);
                            }else{
                                obj.attr('src',data_img);
                            }
                        }else{
                            obj.remove();
                        }
                    }
                    img.onload = function() {
                        var arr = {"width":parseInt(img.width),"height":parseInt(img.height),"img_src":img.src,"default_img":obj.attr('default_img')};
                        if(arr.width < data.size){
                            defaultImg(obj,arr.default_img,data.default_img);
                        }
                    };
                    img.onerror = function() {
                        defaultImg(obj,$(this).attr('default_img'),data.default_img);
                    }
                });
                $(this).attr('vc_true',data.vc_true_);
            }
        },
        vc_load:function(data)
        {
            data = $.extend({},Default_,data,attr_json_($(this)));
            $(this).each(function(){
                if($(this).attr('vc_true')!=data.vc_true2_){
                    var link = $(this).attr('vc_load');
                    if(link){
                        $(this).load(link);
                    }
                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        vc_overflow_scroll:function(data)
        {
            data = $.extend({},Default_,data,attr_json_($(this)));
            var Vc = {
                'scroll':function(obj)
                {
                    /*往左*/
                    var tmp = (obj.scrollLeft)++;
                    /*当滚动条到达右边顶端时*/
                    if (obj.scrollLeft == tmp) {
                        obj.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;" + obj.innerHTML;
                    }
                    /*当滚动条滚动了初始内容的宽度时滚动条回到最左端*/
                    if (obj.scrollLeft >= obj.firstChild.offsetWidth) {
                        obj.scrollLeft = 0;
                    }
                }
            }
            $(this).each(function(){
                if($(this).attr('vc_true')!=data.vc_true2_){
                    var obj = $(this)[0];
                    $(this).css({'display': 'inline-block','white-space': 'nowrap','overflow': 'hidden'});
                    if (obj.scrollWidth > obj.offsetWidth) {
                        /*判断是否需要滚动*/
                        var timer = setInterval(function () {
                            Vc.scroll(obj);
                        }, 30);
                        $(this).hover(function(){
                            window.clearInterval(timer);
                        },function(){
                            timer = setInterval(function () {
                                Vc.scroll(obj);
                            }, 30);
                        });
                    }

                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        },
        vc_button:function(data)
        {
            function color_rgb_hex(obj,color)
            {
                var rgb=obj.css(color);
                if(rgb.toLowerCase().indexOf('rgb') != -1 && rgb.toLowerCase().indexOf('rgba') == -1){
                    rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    function hex(x)
                    {
                        var x2 = parseInt(x)-10;
                        return ("0"+parseInt(x2).toString(16)).slice(-2);
                    }
                    rgb='#'+hex(rgb[1])+hex(rgb[2])+hex(rgb[3]);
                }
                return rgb;
            }

            data = $.extend({},Default_,data,attr_json_($(this)));
            $(this).each(function(){
                if($(this).attr('vc_true')!=data.vc_true2_){
                    var size = $(this).css('font-size');
                    var color = $(this).css('color');
                    var background_color = $(this).css('background-color');
                    $(this).css('line-height',size);
                    $(this).hover(function(){
                        $(this).css('color',color_rgb_hex($(this),'color'));
                        $(this).css('background-color',color_rgb_hex($(this),'background-color'));
                    },function(){
                        $(this).css('color',color);
                        $(this).css('background-color',background_color);
                    });

                    $(this).attr('vc_true',data.vc_true_);
                }
            });
            return $(this);
        }
    });

    var Default_ = {
        'vc_true_':1,
        'vc_true2_':1
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
    var node_overflow_scroll = $('.overflow_scroll');
    if(node_overflow_scroll.length>0){
        node_overflow_scroll.vc_overflow_scroll({'vc_true_':'0'});
    }

    var node_button = $('.button');
    if(node_button.length>0){
        node_button.vc_button({'vc_true_':'0'});
    }

    /*if($('.active').length>0){
        var obj = $('.active');
        obj.addClass('background');
        $('.active').css({'background-color':$('.background').css('background-color'),'color':$('.color').css('color')});
    }*/
});
/*拒絕修改*/