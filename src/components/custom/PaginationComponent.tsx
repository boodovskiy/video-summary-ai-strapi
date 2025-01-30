"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Button } from "../ui/button";
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination";


interface PaginationProps {
    pageCount: number;
}

interface PaginationArrowProps {
    direction: "left" | "right";
    href: string;
    isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps>= ({
    direction,
    href,
    isDisabled
}) => {
    const router = useRouter();
    const isLeft = direction === "left";
    const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <Button
            onClick={() => router.push(href)}
            className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
            aria-disabled={isDisabled}
            disabled={isDisabled}
        >
            {isLeft ? "«" : "»"}
        </Button>
    )
}

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationArrow
                        direction="left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />
                </PaginationItem>
                <PaginationItem>
                    <span className="p-2 font-semibold text-gray-500">
                        Page {currentPage}
                    </span>
                </PaginationItem>
                <PaginationItem>
                    <PaginationArrow 
                        direction="right"
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= pageCount}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}