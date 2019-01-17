<?php

namespace Lonban\Lottery\Controllers;

use Illuminate\Http\Request;
use Lonban\Lottery\Classes\PathClasses;

class IndexController extends CommonController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return 12346;
    }

    public function showTurntable()
    {
        $view = view('lottery::phaser.pages.turntable');
        $src = PathClasses::getSrc($view);
        return $view->with('src',$src)->with('public_src',dirname($src).'/');
    }

    public function showRedEnvelopesRain()
    {
        $view = view('lottery::phaser.pages.redEnvelopesRain');
        $src = PathClasses::getSrc($view);
        return $view->with('src',$src)->with('public_src',dirname($src).'/');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
