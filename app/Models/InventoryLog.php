<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_item_id',
        'type',
        'quantity',
        'previous_quantity',
        'new_quantity',
        'note',
        'created_by',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function inventoryItem()
    {
        return $this->belongsTo(InventoryItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /*
    |--------------------------------------------------------------------------
    | Optional: Movement Type Helpers
    |--------------------------------------------------------------------------
    */

    const TYPE_IN = 'IN';
    const TYPE_OUT = 'OUT';
    const TYPE_ADJUSTMENT = 'ADJUSTMENT';
}
