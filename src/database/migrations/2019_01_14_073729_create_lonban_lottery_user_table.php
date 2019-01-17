<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLonbanLotteryUserTable extends Migration
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
            $table->integer('user_id')->comment('用户的id');
            $table->integer('editor_id')->nullable()->default('')->comment('最后一个修改它的管理员id');
            $table->string('plan_start',256)->nullable()->default('')->comment('抽到资格');
            $table->string('plan_ok',256)->nullable()->default('')->comment('可以抽到');
            $table->string('plan_end',256)->nullable()->default('')->comment('已经抽到');
            $table->integer('tatal_money')->nullable()->default('')->comment('累计消费总金额');
            $table->integer('tatal_points')->nullable()->default('')->comment('累计消费获得的总积分');
            $table->integer('tatal_number')->nullable()->default('')->comment('累计消费购买的总数量');
            $table->timestamps();
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
