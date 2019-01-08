<?php

namespace Lonban\Lottery\Classes;

use Illuminate\View\View;

class PathClasses
{
    public static function getSrc(View $path=null)
    {
        $string = $path->getPath();
        $start = stripos($string,'vendor');
        if($start != false){
            $stop = stripos($string,'pages');
        }else{
            $start = stripos($string,'resources');
            $stop = stripos($string,'pages');
        }
        return preg_replace("/[\\\]/",'/',url(substr($string,$start,$stop-$start))).'/';
    }
    public static function getPublicSrc(View $path=null)
    {
        return dirname(self::getSrc($path)).'/';
    }
}