interface StrapiErrorsPops {
    message?: string | null;
    name?: string;
    status?: string | null;
}

export function StrapiErrors( { error }: { readonly error: StrapiErrorsPops | null | undefined }) {
    if (!error?.message) return null;

    return <div className="text-pink-500 text-md italic py-2">{error.message}</div>;
}
