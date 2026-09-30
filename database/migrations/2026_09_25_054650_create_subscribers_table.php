<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->enum('status', ['pending', 'active', 'unsubscribed', 'bounced'])->default('pending');
            $table->string('verification_token')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->string('unsubscribe_token')->unique();
            $table->timestamp('unsubscribed_at')->nullable();
            $table->string('consent_ip')->nullable();
            $table->string('consent_source')->default('web_form');
            $table->timestamp('consent_timestamp')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscribers');
    }
};
