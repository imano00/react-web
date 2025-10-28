<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    protected $fillable = [
    'transaction_id',
    'drink_id',
    'quantity',
    'price',
];


    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function drink()
    {
        return $this->belongsTo(Drink::class);
    }
}
