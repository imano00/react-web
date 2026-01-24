import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../textarea';
import { Field, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';

type EditFormData = {
    name: string;
    category: string;
    price?: number;
    description?: string;
};

type EditFormProps = {
    data: EditFormData;
    setData: <K extends keyof EditFormData>(key: K, value: EditFormData[K]) => void;
    categories?: string[];
    showDescription?: boolean;
};

export default function EditForm({ data, setData, categories, showDescription }: EditFormProps) {
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
                    <Select value={data.category} onValueChange={(v) => setData('category', v)}>
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
                    <Input
                        id="price"
                        type="number"
                        step="1.00"
                        value={data.price}
                        onChange={(e) => setData('price', Number(e.target.value))}
                        className="w-full rounded-md border p-2"
                    ></Input>
                </Field>

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
