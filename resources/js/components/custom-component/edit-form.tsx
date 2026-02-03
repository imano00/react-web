import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Textarea } from '../textarea';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';

type Subcategory = {
    id: number;
    name: string;
};
type EditFormData = {
    name: string;
    subcategory_id?: number;
    subcategory?: Subcategory;
    price?: number;
    description?: string;
    unit?: string;
    current_stock?: number;
    reorder_level?: number;
};

type EditFormProps = {
    data: EditFormData;
    setData: <K extends keyof EditFormData>(key: K, value: EditFormData[K]) => void;
    categories?: string[];
    showDescription?: boolean;
};

export default function EditForm({ data, setData, categories, showDescription }: EditFormProps) {
    const [price, setPrice] = useState<number>(data.price || 0);
    const incrementPrice = (amount: number) => {
        setData('price', Number((Number(data.price ?? 0) + amount).toFixed(2)));
    };

    const decrementPrice = (amount: number) => {
        setData('price', Number((Number(data.price ?? 0) - amount).toFixed(2)));
    };

    const incrementCurrentStock = (amount: number) => {
        setData('current_stock', Number((Number(data.current_stock ?? 0) + amount).toFixed(2)));
    };

    const decrementCurrentStock = (amount: number) => {
        setData('current_stock', Number((Number(data.current_stock ?? 0) - amount).toFixed(2)));
    };

    const incrementReorderLevel = (amount: number) => {
        setData('reorder_level', Number((Number(data.reorder_level ?? 0) + amount).toFixed(2)));
    };

    const decrementReorderLevel = (amount: number) => {
        setData('reorder_level', Number((Number(data.reorder_level ?? 0) - amount).toFixed(2)));
    };
    return (
        <FieldGroup>
            <FieldSet>
                {/* Name Field */}
                <Field className="mt-4">
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </Field>

                {/* Category Field */}
                <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Select value={data.subcategory_id?.toString() ?? ''} onValueChange={(v) => setData('subcategory_id', Number(v))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Coffee">Coffee</SelectItem>
                                <SelectItem value="Soda">Soda</SelectItem>
                                <SelectItem value="Chocolate">Chocolate</SelectItem>
                                <SelectItem value="Matcha">Matcha</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                {/* Price Field */}
                <Field>
                    <FieldLabel htmlFor="price">Price (RM)</FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="price"
                            type="number"
                            step="1.0"
                            value={data.price}
                            onChange={(e) => setData('price', Number(e.target.value))}
                            className="w-full rounded-md p-2"
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton variant="outline" onClick={() => incrementPrice(1.0)}>
                                +
                            </InputGroupButton>
                            <InputGroupButton variant="outline" onClick={() => decrementPrice(1.0)}>
                                -
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>

                {/* Unit Field */}
                {data.unit !== undefined && (
                    <Field>
                        <FieldLabel htmlFor="unit">Unit</FieldLabel>
                        <Select value={data.unit} onValueChange={(v) => setData('unit', v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="grams">grams</SelectItem>
                                    <SelectItem value="pieces">pieces</SelectItem>
                                    <SelectItem value="liters">liters</SelectItem>
                                    <SelectItem value="kilograms">kilograms</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                )}

                {/* Current Stock Field */}
                {data.current_stock !== undefined && (
                    <Field>
                        <FieldLabel htmlFor="current_stock">Current Stock</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="current_stock"
                                type="number"
                                step="100.0"
                                value={data.current_stock}
                                onChange={(e) => setData('current_stock', Number(e.target.value))}
                                className="w-full rounded-md p-2"
                            />
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="outline" onClick={() => incrementCurrentStock(100.0)}>
                                    +
                                </InputGroupButton>
                                <InputGroupButton variant="outline" onClick={() => decrementCurrentStock(100.0)}>
                                    -
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                )}

                {/* Reorder Level Field */}
                {data.reorder_level !== undefined && (
                    <Field>
                        <FieldLabel htmlFor="reorder_level">Reorder Level</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="reorder_level"
                                type="number"
                                step="100.0"
                                value={data.reorder_level}
                                onChange={(e) => setData('reorder_level', Number(e.target.value))}
                                className="w-full rounded-md p-2"
                            />
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="outline" onClick={() => incrementReorderLevel(100.0)}>
                                    +
                                </InputGroupButton>
                                <InputGroupButton variant="outline" onClick={() => decrementReorderLevel(100.0)}>
                                    -
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                )}

                {/* Description (optional) */}
                {showDescription && (
                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </Field>
                )}
            </FieldSet>
        </FieldGroup>
    );
}
