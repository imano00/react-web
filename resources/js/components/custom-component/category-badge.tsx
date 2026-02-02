import { CakeSlice, Coffee, Croissant, CupSoda, Donut, Droplets, GlassWater, IceCream, Leaf, Milk, Package, Sandwich, SprayCan } from 'lucide-react';

type CategoryBadgeProps = {
    category: string;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
    const normalized = category.trim().toLowerCase();

    if (normalized === 'coffee') return <Coffee size={20} className="text-amber-700" />;
    if (normalized === 'soda') return <CupSoda size={20} className="text-sky-500" />;
    if (normalized === 'matcha') return <Leaf size={20} className="text-green-600" />;
    if (normalized === 'chocolate') return <CakeSlice size={20} className="text-brown-700" />;

    if (normalized === 'tea') return <GlassWater size={20} className="text-emerald-500" />;
    if (normalized === 'milk') return <Milk size={20} className="text-gray-400" />;
    if (normalized === 'dessert') return <IceCream size={20} className="text-pink-500" />;
    if (normalized === 'pastry') return <Croissant size={20} className="text-yellow-600" />;
    if (normalized === 'snack') return <Donut size={20} className="text-fuchsia-500" />;
    if (normalized === 'food') return <Sandwich size={20} className="text-orange-600" />;

    if (normalized === 'coffee beans') return <Coffee size={20} className="text-amber-700" />;

    if (normalized === 'milk') return <Milk size={20} className="text-gray-400" />;

    if (normalized === 'syrups') return <Droplets size={20} className="text-purple-500" />;

    if (normalized === 'packaging') return <Package size={20} className="text-stone-500" />;

    if (normalized === 'cups & lids' || normalized === 'cups and lids') return <CupSoda size={20} className="text-sky-500" />;

    if (normalized === 'cleaning supplies') return <SprayCan size={20} className="text-green-500" />;

    return null;
}
