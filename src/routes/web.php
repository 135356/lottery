<?php

Route::group(['prefix'=>'lottery','namespace'=>'Lonban\Lottery\Controllers'],function(){
    Route::get('/turntable','IndexController@showTurntable');
    Route::get('/redEnvelopesRain','IndexController@showRedEnvelopesRain');
});