import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';

type DetailCardProps = {
    name: string;
    category?: string;
    subcategory_id?: number;
    price?: number;
    unit?: string;
    current_stock?: number;
    reorder_level?: number;
    description?: string | null;
};

export default function DetailCard({ name, category, price, description, unit, current_stock, reorder_level, subcategory_id }: DetailCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="rounded-full p-2 text-purple-500 transition-colors hover:bg-purple-100" title="View Details">
                    <Eye size={18} strokeWidth={1.8} />
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="my-2 mr-4 ml-2 flex items-center justify-between">
                        <DialogTitle className="text-foreground text-xl font-semibold">{name}</DialogTitle>
                        <Card className="border-muted shadow-sm">
                            <CardContent className="flex items-center">
                                {subcategory_id !== undefined && <p className="text-md px-2 font-medium capitalize">{subcategory_id.toString()}</p>}
                                {category !== undefined && <p className="text-md px-2 font-medium capitalize">{category}</p>}

                                {/* <CategoryBadge category={category} /> */}
                            </CardContent>
                        </Card>
                    </div>

                    <DialogDescription className="text-foreground text-xl font-semibold">
                        {price !== undefined && (
                            <p>
                                <strong className="text-foreground text-xl font-semibold">Price:</strong> RM {Number(price).toFixed(2)}
                            </p>
                        )}
                        {current_stock !== undefined && reorder_level !== undefined && (
                            <div>
                                <p>
                                    <strong className="text-foreground text-xl font-semibold">Quantity:</strong> {current_stock} {unit}
                                </p>
                                <p>
                                    <strong className="text-foreground text-xl font-semibold">Reorder Level:</strong> {reorder_level} {unit}
                                </p>
                            </div>
                        )}
                        <Separator className="my-2" />
                        <p className="text-muted-foreground">
                            <strong className="text-foreground text-xl font-semibold">Description:</strong>{' '}
                            {description || 'No description provided.'}
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="w-full px-4 py-2 text-base sm:w-auto">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
