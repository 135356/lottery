<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLonbanLotteryConfig extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lonban_lottery_config', function (Blueprint $table) {
            $table->engine = 'MyISAM';
            $table->increments('id');
            $table->timestamps();
            $table->integer('use')->default(1)->comment('采用规则,积分表里的id');
            $table->string('user_table',16)->default('users')->comment('用户表名称');
            $table->string('user_id_field',16)->default('id')->comment('用户表id字段名称');
            $table->string('user_id_blacklist',32)->default('1,2,3')->comment('用户黑名单:输入不允许抽奖的用户id，以逗号隔开');
            $table->string('product_table',16)->default('products')->comment('产品表名称');
            $table->string('product_id_field',16)->default('id')->comment('产品表id字段名称');
            $table->string('product_integral_field',16)->default('')->comment('产品表积分字段的名称');
            $table->string('product_id_blacklist',64)->default(0)->comment('产品黑名单：不参与抽奖的商品id，逗号隔开。适用于条件为100:1等情况');
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
        Schema::dropIfExists('lonban_lottery_config');
    }
}
