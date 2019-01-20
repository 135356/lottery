<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>@yield('title')</title>
    <script src="{{Lottery::getVccAssets('js/jquery-1.12.4.min.js')}}"></script>
    <link rel="stylesheet" href="{{Lottery::getVccAssets('css/init.min.css')}}">
    <link rel="stylesheet" href="{{Lottery::getVccAssets('css/vcc_a.min.css')}}">
    <link rel="stylesheet" href="{{Lottery::getVccAssets('font/iconfont.min.css')}}">
    <script src="{{Lottery::getVccAssets('font/iconfont.min.js')}}"></script>
    <script src="{{Lottery::getVccAssets('js/vcc_a.min.js')}}"></script>
    <script src="{{Lottery::getVccAssets('js/vcc_b.min.js')}}"></script>
    <script src="{{Lottery::getAssets('js/phaser2.6.2.min.js')}}"></script>
</head>
<body>
@yield('content')
{{--@section('content')
@show--}}
</body>
</html>