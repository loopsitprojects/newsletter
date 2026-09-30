<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subject',
        'sender_name',
        'sender_email',
        'content_html',
        'template_id',
        'target_type',
        'subscriber_group_id',
        'status',
        'scheduled_at',
        'sent_at',
        'total_subscribers',
        'sent_count',
        'open_count',
        'click_count',
        'unsubscribe_count',
        'bounce_count',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
        'total_subscribers' => 'integer',
        'sent_count' => 'integer',
        'open_count' => 'integer',
        'click_count' => 'integer',
        'unsubscribe_count' => 'integer',
        'bounce_count' => 'integer',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(EmailTemplate::class, 'template_id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(SubscriberGroup::class, 'subscriber_group_id');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(CampaignLog::class);
    }
}
