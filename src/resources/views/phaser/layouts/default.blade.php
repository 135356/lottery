<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>@yield('title')</title>
    <script src="{{VccPath::getAssets('js/jquery-1.12.4.min.js')}}"></script>
    <link rel="stylesheet" href="{{VccPath::getAssets('css/init.min.css')}}">
    <link rel="stylesheet" href="{{VccPath::getAssets('css/vcc_a.min.css')}}">
    <link rel="stylesheet" href="{{VccPath::getAssets('font/iconfont.min.css')}}">
    <script src="{{VccPath::getAssets('font/iconfont.min.js')}}"></script>
    <script src="{{VccPath::getAssets('js/vcc_a.min.js')}}"></script>
    <script src="{{VccPath::getAssets('js/vcc_b.min.js')}}"></script>
    <script src="{{LotteryPath::getAssets('js/phaser2.6.2.min.js')}}"></script>
</head>
<body>
@yield('content')
{{--@section('content')
@show--}}
</body>
</html>