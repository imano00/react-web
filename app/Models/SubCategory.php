<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $table = 'subcategories';
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function inventoryItems()
    {
        return $this->hasMany(InventoryItem::class);
    }
    public function drinks()
    {
        return $this->hasMany(Drink::class);
    }
}
