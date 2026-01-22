<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'category',
        'unit',
        'current_stock',
        'reorder_level',
        'description',
    ];

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
