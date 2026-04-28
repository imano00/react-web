<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'user_name',
        'user_email',
        'total_amount',
        'status',
        'payment_method',
        'order_type', // this is optional, maybe are not going to use it
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
