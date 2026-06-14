import { useSearchStore } from '@/hooks/use-searchstore';
import { useEffect } from 'react';
import { Input } from './ui/input';

export default function FilterSearch() {
    const searchTerm = useSearchStore((state) => state.searchTerm);
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
    const setDebouncedSearch = useSearchStore((state) => state.setDebouncedSearch);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer); // Pulisce il timer se l'utente digita di nuovo
    }, [searchTerm, setDebouncedSearch]);

    return (
        <div>
            <Input
                type="text"
                placeholder="Cerca per modello..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='bg-white border border-black rounded-full'
            />
        </div>
    );
}