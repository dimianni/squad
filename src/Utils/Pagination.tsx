import Link from "next/link";

interface PaginationProps {
    numOfPages: number
    routeTerm: string
    currentPage: number
}

enum PageItemType {
    Ellipsis = "...",
}

type PageItem = number | PageItemType.Ellipsis;

export default function Pagination({ numOfPages, routeTerm, currentPage }: PaginationProps) {

    const range: number = 2; // number of pages to show before and after current page
    const currentPageIndex: number = currentPage - 1; // subtract 1 to get zero-based index
    const startIndex: number = Math.max(currentPageIndex - range, 0); // start at 0 if we're near the beginning
    const endIndex: number = Math.min(currentPageIndex + range, numOfPages - 1); // end at totalPages-1 if we're near the end
    const pages: PageItem[] = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => i + startIndex + 1);

    if (startIndex > 0) {
        pages.unshift(PageItemType.Ellipsis);
        pages.unshift(1);
    }

    if (endIndex < numOfPages - 1) {
        pages.push(PageItemType.Ellipsis);
        pages.push(numOfPages);
    }

    return (
        <ul className="flex flex-wrap justify-center items-center">
            {
                pages.map((page, i) => {
                    return (
                        <li key={i} className={`mx-1 ${currentPage === page ? "text-blue-500" : ""}`}>
                            <Link href={`/search?term=${routeTerm}&page=${page}`}>{page}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}   