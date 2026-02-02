<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SubCategory;

class InventoryItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'subcategory_id',
        'unit',
        'current_stock',
        'reorder_level',
        'description',
    ];

    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }
    //Relationships
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function restockBatches()
    {
        return $this->hasMany(RestockBatch::class);
    }
}
