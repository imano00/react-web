type InventoryLog = {
    id: number;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantity: number;
    previous_quantity: number;
    new_quantity: number;
    note?: string;
    created_at: string;
    inventory_item: {
        id: number;
        name: string;
    };
};
