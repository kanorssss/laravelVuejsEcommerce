<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    // Use the HasSlug trait to enable slug functionality
    use HasFactory;
    use HasSlug;

    //add SoftDeletes trait to enable soft deletes that not permanent deletion on the database
    use SoftDeletes;

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title') // Specify the attribute to generate the slug from
            ->saveSlugsTo('slug');
    }
}