<?php

namespace Lonban\Lottery\Classes;

class CommonClass
{
    public function __construct()
    {
    }

    public static function newSelf()
    {
        if(static::$SELF instanceof self) {
            //static::$SELF;
        } else {
            static::$SELF = new static();
        }
    }

    public static function __callstatic($method,$arg)
    {
        static::newSelf();
    }

    public function __call($method,$arg)
    {
        static::newSelf();
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
}