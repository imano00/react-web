import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';
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
    const selectedCategory = categories.find((c) => c.id === data.category_id);

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
                    <FieldLabel>Price (RM)</FieldLabel>
                    <Input type="number" value={data.price ?? ''} onChange={(e) => setData('price', Number(e.target.value))} />
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
