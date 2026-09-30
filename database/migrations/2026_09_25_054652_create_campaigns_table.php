<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subject');
            $table->string('sender_name')->nullable();
            $table->string('sender_email')->nullable();
            $table->longText('content_html');
            $table->foreignId('template_id')->nullable()->constrained('email_templates')->onDelete('set null');
            $table->enum('target_type', ['all', 'group'])->default('all');
            $table->foreignId('subscriber_group_id')->nullable()->constrained('subscriber_groups')->onDelete('set null');
            $table->enum('status', ['draft', 'scheduled', 'sending', 'sent', 'cancelled'])->default('draft');
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->integer('total_subscribers')->default(0);
            $table->integer('sent_count')->default(0);
            $table->integer('open_count')->default(0);
            $table->integer('click_count')->default(0);
            $table->integer('unsubscribe_count')->default(0);
            $table->integer('bounce_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
