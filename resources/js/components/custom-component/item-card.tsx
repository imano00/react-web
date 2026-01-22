import { InventoryItem } from '@/types/InventoryItem';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import DetailCard from './detail-card';

type Props = {
    item: InventoryItem;
    onEdit: (item: InventoryItem) => void;
    onDelete: (id: number) => void;
};

export function ItemCard({ item, onEdit, onDelete }: Props) {
    const isLowStock = item.reorder_level !== undefined && item.quantity <= item.reorder_level;
    return (
        <Card className="rounded-2xl shadow-md">
            <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold">{item.name}</h2>
                    <span>
                        <Badge className="h-7 min-w-7 rounded-full px-2 font-mono tabular-nums">{item.unit}</Badge>
                    </span>
                </div>
                <p className="text-sm opacity-70">
                    Current Stock: {item.quantity} {item.unit}
                </p>
                <p className="text-sm opacity-70">
                    Reorder Level: {item.reorder_level} {item.unit}
                </p>
                <div className="flex gap-2">
                    <DetailCard {...item} />
                    <Button onClick={() => onEdit(item)} className="rounded-2xl text-blue-500 hover:bg-blue-100">
                        Edit
                    </Button>
                    <Button onClick={() => onDelete(item.id)} className="rounded-2xl text-red-500 hover:bg-red-100">
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
