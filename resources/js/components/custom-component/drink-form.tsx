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

type DrinkFormData = {
    name: string;
    category_id?: number;
    subcategory_id?: number;
    price?: number;
    description?: string;
};

type DrinkFormProps = {
    data: DrinkFormData;
    setData: <K extends keyof DrinkFormData>(key: K, value: DrinkFormData[K]) => void;
    categories: Category[];
    mode: 'create' | 'edit';
};

export function DrinkForm({ data, setData, categories = [], mode }: DrinkFormProps) {
    const drinkCategory = categories.find((c) => c.name === 'Drinks');

    // const selectedCategory = categories.find((c) => c.id === data.category_id);

    const incrementPrice = (amount: number) => {
        setData('price', Number((Number(data.price ?? 0) + amount).toFixed(2)));
    };

    const decrementPrice = (amount: number) => {
        setData('price', Number((Number(data.price ?? 0) - amount).toFixed(2)));
    };
    return (
        <FieldGroup>
            <FieldSet>
                {/* Name */}
                <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </Field>

                {/* Category + Subcategory */}
                {/* 
                <Field>
                    <FieldLabel>Catrgory</FieldLabel>
                    <CategorySubcategorySelect category={categories} value={data.subcategory_id} onChange={(id) => setData('subcategory_id', id)} />
                </Field> */}

                {/* Category */}
                <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select value={drinkCategory?.id?.toString() ?? ''} disabled>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={drinkCategory?.id?.toString() ?? ''}>Drinks</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                {/* <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                        value={data.category_id?.toString() ?? ''}
                        onValueChange={(v) => {
                            setData('category_id', Number(v));
                            setData('subcategory_id', undefined); // reset subcategory
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
                </Field> */}

                {/* Subcategory */}
                <Field>
                    <FieldLabel>Subcategory</FieldLabel>
                    <Select
                        value={data.subcategory_id?.toString() ?? ''}
                        onValueChange={(v) => setData('subcategory_id', Number(v))}
                        disabled={!drinkCategory}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {drinkCategory?.subcategories.map((sub) => (
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

                {/* Description */}
                <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea value={data.description ?? ''} onChange={(e) => setData('description', e.target.value)} />
                </Field>

                <Button type="submit">{mode === 'edit' ? 'Update Drink' : 'Create Drink'}</Button>
            </FieldSet>
        </FieldGroup>
    );
}
