<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('group_subscriber', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscriber_id')->constrained('subscribers')->onDelete('cascade');
            $table->foreignId('subscriber_group_id')->constrained('subscriber_groups')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['subscriber_id', 'subscriber_group_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_subscriber');
    }
};
