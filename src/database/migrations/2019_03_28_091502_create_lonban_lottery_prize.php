<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLonbanLotteryPrize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lonban_lottery_prize', function (Blueprint $table) {
            $table->engine = 'MyISAM';
            $table->increments('id');
            $table->timestamps();
            $table->string('probability',8)->default('100:1')->comment('概率：每100个人参与抽奖中奖1个');
            $table->string('content',128)->default('title:手机一部,body:恭喜您，请您到xxx选择您的收货地址')->comment('奖品内容');
            $table->string('event',16)->default('clickPrize1')->comment('按扭触发的事件方法名称');
            $table->string('admin_id',16)->default('000')->comment('最后一个修改管理员id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lonban_lottery_prize');
    }
}
