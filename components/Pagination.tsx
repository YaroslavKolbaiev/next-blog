import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  totalItems: number;
};

function Pagination({ totalItems }: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / 2); i += 1) {
    pageNumbers.push(i);
  }
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const page = searchParams.get('page') || '1';

  const prevPage = (+page - (+page > 1 ? 1 : 0)).toString();
  const nextPage = (+page + (+page < pageNumbers.length ? 1 : 0)).toString();

  const prevDisabled = +page === 1;
  const nextDisabled = +page === pageNumbers.length;
  return (
    <nav aria-label="Page navigation" className="flex justify-center mt-5">
      <ul className="inline-flex -space-x-px">
        {!prevDisabled && (
        <li
          className="
            text-center
            w-24
            px-3
            py-2
            ml-0
            leading-tight
            text-gray-500
            bg-white border
            border-gray-300
            rounded-l-lg
            hover:bg-gray-100
            hover:text-gray-700
            dark:bg-gray-800
            dark:border-gray-700
            dark:text-gray-400
            dark:hover:bg-gray-700
            dark:hover:text-white
          "
        >
          <Link
            href={{
              pathname: pathName,
              query: {
                page: prevPage,
              },
            }}
          >
            Previous
          </Link>
        </li>
        )}
        {pageNumbers.map((pageNumber) => (
          <li
            className="
              px-3
              py-2
              leading-tight
              text-gray-500
              bg-white border
              border-gray-300
              hover:bg-gray-100
              hover:text-gray-700
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-gray-400
              dark:hover:bg-gray-700
              dark:hover:text-white
            "
            key={pageNumber}
          >
            <Link
              href={{
                pathname: pathName,
                query: {
                  page: pageNumber.toString(),
                },
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        {!nextDisabled && (
        <li
          className="
            text-center
            w-24
            px-3
            py-2
            leading-tight
            text-gray-500
            bg-white
            border
            border-gray-300
            rounded-r-lg
            hover:bg-gray-100
            hover:text-gray-700
            dark:bg-gray-800
            dark:border-gray-700
            dark:text-gray-400
            dark:hover:bg-gray-700
            dark:hover:text-white
          "
        >
          <Link
            href={{
              pathname: pathName,
              query: {
                page: nextPage,
              },
            }}
          >
            Next
          </Link>
        </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
