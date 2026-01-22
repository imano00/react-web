import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'New Sale',
        href: '/create',
    },
];
type Drink = {
    id: number;
    name: string;
    price: number;
    category: string;
    description?: string;
};

type SaleItem = Drink & { quantity: number };

export default function TransactionPage({ drinks }: { drinks: Drink[] }) {
    const [cart, setCart] = useState<SaleItem[]>([]);
    const [paid, setPaid] = useState<string>('');
    const [filter, setFilter] = useState('All');

    const addToCart = (drink: Drink) => {
        const existing = cart.find((item) => item.id === drink.id);
        if (existing) {
            setCart(cart.map((item) => (item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item)));
        } else {
            setCart([...cart, { ...drink, quantity: 1 }]);
        }
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = () => {
        router.post(
            '/sales',
            {
                items: cart.map((item) => ({
                    drink_id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                paid: paid,
            },
            {
                onSuccess: () => {
                    setCart([]);
                    setPaid('');
                    alert('Transaction completed! 🎉');
                },
            },
        );
    };

    const filteredDrinks = filter === 'All' ? drinks : drinks.filter((d) => d.category === filter);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-1/2 flex-1 flex-col gap-4 rounded-xl p-4">
                <h2 className="mb-4 text-2xl font-semibold">🧾 New Sale</h2>
                {/* ✨ Filter by Category */}
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Coffee">Coffee</SelectItem>
                            <SelectItem value="Soda">Soda</SelectItem>
                            <SelectItem value="Chocolate">Chocolate</SelectItem>
                            <SelectItem value="Matcha">Matcha</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* Drinks Grid */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                    {filteredDrinks.map((drink) => (
                        <div key={drink.id} className="cursor-pointer rounded-lg border p-3 hover:bg-slate-100" onClick={() => addToCart(drink)}>
                            <p className="font-semibold">{drink.name}</p>
                            <p>RM {Number(drink.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Cart Section */}
                <div className="border-t pt-4">
                    <h3 className="mb-2 font-semibold">Cart</h3>
                    {cart.length === 0 ? (
                        <p>No items yet~ tap a drink to add it 😘</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id} className="mb-2 flex justify-between">
                                    <span>
                                        {item.name} x {item.quantity}
                                    </span>
                                    <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                                    <button className="ml-2 text-red-500" onClick={() => removeFromCart(item.id)}>
                                        🗑
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-4 flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>RM {total.toFixed(2)}</span>
                    </div>

                    <input
                        type="number"
                        placeholder="Enter amount paid 💵"
                        className="mt-3 w-full rounded border p-2"
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                    />

                    <Button className="mt-4 w-full" onClick={handleSubmit} disabled={cart.length === 0}>
                        Complete Sale 💳
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
