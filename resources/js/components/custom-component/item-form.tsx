import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';
import { Textarea } from '../ui/textarea';

type Category = {
    id: number;
    name: string;
    subcategories: Subcategory[];
};

type Subcategory = {
    id: number;
    name: string;
    category: { id: number; name: string };
};

type ItemFormData = {
    name: string;
    category_id?: number;
    subcategory_id?: number;
    price?: number;
    unit?: string;
    description?: string;
    current_stock?: number;
    reorder_level?: number;
};

type ItemFormProps = {
    data: ItemFormData;
    setData: <K extends keyof ItemFormData>(key: K, value: ItemFormData[K]) => void;
    categories: Category[];
    mode: 'create' | 'edit';
};

export function ItemForm({ data, setData, categories = [], mode }: ItemFormProps) {
    const selectedCategory = categories.find((c) => c.id === data.category_id);

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
                {/* Name */}
                <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </Field>

                {/* Category */}
                <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                        value={data.category_id?.toString() ?? ''}
                        onValueChange={(v) => {
                            setData('category_id', Number(v));
                            setData('subcategory_id', undefined); // reset subcategory when category changes
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                {/* Subcategory */}
                <Field>
                    <FieldLabel>Subcategory</FieldLabel>
                    <Select
                        value={data.subcategory_id?.toString() ?? ''}
                        onValueChange={(v) => setData('subcategory_id', Number(v))}
                        disabled={!selectedCategory}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {selectedCategory?.subcategories.map((sub) => (
                                    <SelectItem key={sub.id} value={sub.id.toString()}>
                                        {sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                {/* Price */}
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
                {/* Description */}
                <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea value={data.description ?? ''} onChange={(e) => setData('description', e.target.value)} />
                </Field>

                <Button type="submit">{mode === 'edit' ? 'Update Item' : 'Create Item'}</Button>
            </FieldSet>
        </FieldGroup>
    );
}
