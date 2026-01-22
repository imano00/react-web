import { Search } from 'lucide-react';

type SearchBarProps = {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
};
export default function SearchBar({ value, onChange, placeholder, className }: SearchBarProps) {
    return (
        <div className={`flex items-center gap-2 rounded-2xl border px-4 py-2 shadow-sm ${className}`}>
            <Search className="opacity-60" />
            <input
                type="text"
                placeholder={placeholder || 'Search...'}
                className="ml-3 w-full bg-transparent outline-none"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </div>
    );
}
