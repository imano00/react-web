import { InventoryItem } from '@/types/InventoryItem';
import { useForm } from '@inertiajs/react';
import { Pen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import DetailCard from './detail-card';
import EditDialog from './edit-dialog';
import EditForm from './edit-form';

type ItemCardProps = {
    item: InventoryItem;
    onEdit: (item: InventoryItem) => void;
    onDelete: (id: number) => void;
};

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
    const isLowStock = item.reorder_level !== undefined && item.current_stock <= item.reorder_level;

    const {
        data,
        setData,
        post,
        reset,
        put,
        delete: destroy,
    } = useForm({
        id: item.id,
        name: '',
        subcategory_id: item.subcategory_id,
        unit: '',
        current_stock: 0,
        reorder_level: 0,
        description: '',
    });

    const [open, setOpen] = useState(false);
    const [editingDrink, setEditingDrink] = useState<null | number>(null);
    const [categories, setCategories] = useState([]);
    const [showDescription, setShowDescription] = useState(false);

    const startEdit = (InventoryItem: InventoryItem) => {
        setEditingDrink(InventoryItem.id);
        setData({
            name: InventoryItem.name,
            subcategory_id: InventoryItem.subcategory_id,
            unit: InventoryItem.unit,
            current_stock: InventoryItem.current_stock,
            reorder_level: InventoryItem.reorder_level,
            description: InventoryItem.description || '',
        });
        setOpen(true);
    };

    const editSubmit = (e: React.FormEvent) => {
        try {
            e.preventDefault();
            console.log('Updating item:', data);
            put(route('item.update', { id: data.id }), {
                onSuccess: () => {
                    (setEditingDrink(null), toast.success('Edit saved successfully! 💛'), setOpen(false));
                },
            });
        } catch (e) {
            console.error('Error updating drink:', e);
        }
    };
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
                    Current Stock: {item.current_stock} {item.unit}
                </p>
                <p className="text-sm opacity-70">
                    Reorder Level: {item.reorder_level} {item.unit}
                </p>
                <div className="flex gap-2">
                    <DetailCard {...item} />
                    <EditDialog
                        open={open}
                        setOpen={setOpen}
                        title="Edit Item"
                        onSubmit={(e) => editSubmit(e)}
                        trigger={
                            <Button onClick={() => startEdit(item)} className="rounded-full p-2 text-blue-500 hover:bg-blue-100">
                                <Pen size={18} />
                            </Button>
                        }
                        children={<EditForm data={data} setData={setData} categories={categories} showDescription={showDescription} />}
                    />
                    <Button onClick={() => onDelete(item.id)} className="rounded-2xl text-red-500 hover:bg-red-100">
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
