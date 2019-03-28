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
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');
        $this->loadRoutesFrom(__DIR__.'/routes/api.php');
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');
        $this->loadTranslationsFrom(__DIR__.'/lang', 'lottery');
        $this->mergeConfigFrom(__DIR__ . '/config/lottery.php', 'lottery');
        $this->loadViewsFrom(__DIR__ . '/resources/views', 'lottery');
        $this->publishes([
            __DIR__.'/lang' => resource_path('lang/lottery'),
            __DIR__ . '/config/lottery.php' => config_path('lottery.php'),
            __DIR__.'/database/migrations/' => database_path('migrations'),
            __DIR__.'/resources/views' => base_path('resources/views/lottery'),
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Lottery', function ($app) {
            return new LotteryFacade($app['session'], $app['config']);
        });
    }
}
