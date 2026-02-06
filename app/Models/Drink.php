<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'subcategory_id',
        'price',
        'description',
    ];

    public function subcategory(){
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }
}
