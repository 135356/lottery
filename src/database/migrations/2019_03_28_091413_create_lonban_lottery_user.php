<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLonbanLotteryUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lonban_lottery_user', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('points')->default('500')->comment('调有的抽奖积分');
            $table->string('prize',64)->default('1:1,2:1')->comment('已获得的奖品');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lonban_lottery_user');
    }
}
