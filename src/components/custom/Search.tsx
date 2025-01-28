"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export function Search(){
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathName = usePathname();

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        replace(`${pathName}?${params.toString()}`);
    }, 300);

    return (
        <div>
            <Input 
                type="text"
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}