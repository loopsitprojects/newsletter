<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmailTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'subject_template',
        'content_html',
        'content_json',
        'category',
        'header_content',
        'footer_content',
        'is_default',
    ];

    protected $casts = [
        'content_json' => 'array',
        'is_default' => 'boolean',
    ];

    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class, 'template_id');
    }
}
