<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLonbanLotteryConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lonban_lottery_config', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('content',256)->nullable()->default('')->comment('中奖内容');
            $table->integer('settling_time')->nullable()->default('')->comment('结算时间');
            $table->integer('number')->nullable()->default('')->comment('奖品总个数');
            $table->integer('tatal_money')->nullable()->default('')->comment('累计消费总金额');
            $table->integer('tatal_points')->nullable()->default('')->comment('累计消费获得的总积分');
            $table->integer('tatal_number')->nullable()->default('')->comment('累计消费购买的总数量');
            $table->integer('solo_min')->nullable()->default('')->comment('单个最少');
            $table->integer('solo_max')->nullable()->default('')->comment('单个最多');
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
