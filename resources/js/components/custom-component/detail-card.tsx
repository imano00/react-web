import { Button } from '@/components/ui/button';
import { CakeSlice, Coffee, CupSoda, Eye, Leaf } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';

type DetailCardProps = {
    name: string;
    category: string;
    price?: number;
    unit?: string;
    current_stock?: number;
    reorder_level?: number;
    description?: string;
};

export default function DetailCard({ name, category, price, description, unit, current_stock, reorder_level }: DetailCardProps) {
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
                                <p className="text-md px-2 font-medium capitalize">{category}</p>
                                {(category === 'coffee' || category === 'Coffee') && (
                                    <Badge className="h-7 min-w-7 rounded-full">
                                        <Coffee size={20} />
                                    </Badge>
                                )}
                                {(category === 'soda' || category === 'Soda') && (
                                    <Badge className="h-7 min-w-7 rounded-full">
                                        <CupSoda size={20} className="text-sky-500" />
                                    </Badge>
                                )}
                                {(category === 'matcha' || category === 'Matcha') && (
                                    <Badge className="h-7 min-w-7 rounded-full">
                                        <Leaf size={20} className="text-green-600" />
                                    </Badge>
                                )}
                                {(category === 'chocolate' || category === 'Chocolate') && (
                                    <Badge className="h-7 min-w-7 rounded-full">
                                        <CakeSlice size={20} className="text-brown-700" />
                                    </Badge>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <DialogDescription className="text-foreground text-xl font-semibold">
                        <p>
                            <strong className="text-foreground text-xl font-semibold">Price:</strong> RM {Number(price).toFixed(2)}
                        </p>
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
