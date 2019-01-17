<?php

namespace Lonban\Lottery\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\App;

/**
 * @OA\Info(
 *   title="L-Swagger",
 *   version="1.2",
 *   @OA\Contact(email="454595025@qq.com")
 * )
 */
class CommonController extends Controller
{
    public function __construct()
    {
        App::setLocale('zh');
    }

    public static function newSelf()
    {
        if(static::$SELF instanceof self) {
            return static::$SELF;
        } else {
            return static::$SELF = new static();
        }
    }

    public function __get($variable)
    {
        static::newSelf();
        return static::$SELF->$variable;
    }

    public static function all()
    {
        static::newSelf();
        return static::$SELF;
    }

    public static function eTime()
    {
        //开始时间
        function utime() {
            $time = explode( " ", microtime() );
            $usec = (double)$time[0];
            $sec = (double)$time[1];
            return $usec + $sec;
        }
        $startTimes = $branch_time['startTimes'] = utime();
        ////////
        ////////
        //结束时间
        $endTimes = $branch_time['endTimes'] = utime();
        echo '执行的时间为'.sprintf( '%0.4f', ( $endTimes - $startTimes ) );
    }

    public static function eTime2()
    {
        //开始时间
        $time_start = microtime(true);
        //结束时间
        $time_end = microtime(true);
        echo '执行的时间为'.$time_end - $time_start;
    }
}