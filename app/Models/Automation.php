<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Automation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'trigger_event',
        'template_id',
        'delay_minutes',
        'is_active',
        'execution_count',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'delay_minutes' => 'integer',
        'execution_count' => 'integer',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(EmailTemplate::class, 'template_id');
    }
}
