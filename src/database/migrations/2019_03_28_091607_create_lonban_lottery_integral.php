<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLonbanLotteryIntegral extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lonban_lottery_integral', function (Blueprint $table) {
            $table->engine = 'MyISAM';
            $table->increments('id');
            $table->timestamps();
            $table->string('consumption',8)->default('100:1')->comment('消耗：每抽一次奖所需要的积分');
            $table->string('condition',8)->default('*')->comment('产生积分条件：为*则是根据产品表里的积分字段');
            $table->string('condition2',64)->default('0')->comment('产生积分条件2：0则是采用条件1，示例：产品id:可以获得的积分');
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
        Schema::dropIfExists('lonban_lottery_integral');
    }
}
