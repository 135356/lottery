<?php

namespace Lonban\Lottery\Facades;

use Illuminate\Support\Facades\Facade;

class LotteryFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'Lottery';
    }
}