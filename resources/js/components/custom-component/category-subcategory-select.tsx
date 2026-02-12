import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Category = {
    id: number;
    name: string;
    subcategories: Subcategory[];
};
type Subcategory = {
    id: number;
    name: string;
    category?: { id: number; name: string };
};
type CategorySubcategorySelectProps = {
    category: Category;
    value?: number;
    onChange: (id: number) => void;
};

export function CategorySubcategorySelect({ category, value, onChange }: CategorySubcategorySelectProps) {
    return (
        <Select value={value?.toString() ?? ''} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subcategory" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {category.subcategories.map((s) => (
                        <SelectItem key={s.id} value={s.id.toString()}>
                            {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
