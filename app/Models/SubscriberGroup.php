<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriberGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function subscribers(): BelongsToMany
    {
        return $table = $this->belongsToMany(Subscriber::class, 'group_subscriber');
    }

    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class);
    }
}
