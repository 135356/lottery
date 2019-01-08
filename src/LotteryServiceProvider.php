<?php

namespace Lonban\Lottery;

use Illuminate\Support\ServiceProvider;
use Lonban\Lottery\Facades\LotteryFacade;

class LotteryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'lottery');
        $this->loadRoutesFrom(__DIR__.'/routes.php');
        $this->mergeConfigFrom(__DIR__ . '/config/lottery.php', 'lottery');
        $this->publishes([
            __DIR__.'/resources/views' => base_path('resources/views/lottery'),
            __DIR__ . '/config/lottery.php' => config_path('lottery.php'),
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        // 单例绑定服务
        $this->app->singleton('Lottery', function ($app) {
            return new LotteryFacade($app['session'], $app['config']);
        });
    }
}
