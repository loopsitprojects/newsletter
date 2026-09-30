<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('automations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('trigger_event'); // e.g., 'subscriber.registered', 'subscriber.confirmed'
            $table->foreignId('template_id')->nullable()->constrained('email_templates')->onDelete('set null');
            $table->integer('delay_minutes')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('execution_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('automations');
    }
};
