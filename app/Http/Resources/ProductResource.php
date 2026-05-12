<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductImageResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'name' => $this->name,
        'price' => (float) $this->price,
        'stock' => $this->stock,
        'category_id' => $this->category_id,
        'category_name' => $this->category?->name,
        // 'image_url' => $this->image_url,

        'images' => ProductImageResource::collection(
        $this->whenLoaded('images')),

        'is_active' => $this->is_active,
        ];
    }

}
