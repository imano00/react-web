import { CakeSlice, Coffee, CupSoda, Leaf } from 'lucide-react';

type CategoryBadgeProps = {
    category: string;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
    const normalized = category.toLowerCase();

    if (normalized === 'coffee') return <Coffee size={20} />;
    if (normalized === 'soda') return <CupSoda size={20} className="text-sky-500" />;
    if (normalized === 'matcha') return <Leaf size={20} className="text-green-600" />;
    if (normalized === 'chocolate') return <CakeSlice size={20} className="text-brown-700" />;

    return null;
}
