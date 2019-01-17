<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>@yield('title')</title>
    <script src="{{vcJs('js/jquery-1.12.4.min.js')}}"></script>
    <link rel="stylesheet" href="{{vcJs('css/init.min.css')}}">
    <link rel="stylesheet" href="{{vcJs('css/vc_a.min.css')}}">
    <link rel="stylesheet" href="{{vcJs('font/iconfont.min.css')}}">
    <script src="{{vcJs('font/iconfont.min.js')}}"></script>
    <script src="{{vcJs('js/vc_a.min.js')}}"></script>
    <script src="{{vcJs('js/vc_b.min.js')}}"></script>
    <script src="{{$src.'assets/js/phaser2.6.2.min.js'}}"></script>
</head>
<body>
@yield('content')
{{--@section('content')
@show--}}
</body>
</html>