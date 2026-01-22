import { InventoryItem } from '@/types/InventoryItem';
import { ItemCard } from './item-card';
type Props = {
    items: InventoryItem[];
    onEdit: (item: InventoryItem) => void;
    onDelete: (id: number) => void;
};

export function ItemList({ items, onEdit, onDelete }: Props) {
    if (items.length === 0) {
        return <p className="text-sm text-gray-500">No ingredients yet 🥲</p>;
    }

    return (
        <div className="mb-6 grid grid-cols-3 gap-3">
            {items.map((item) => (
                <ItemCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}
