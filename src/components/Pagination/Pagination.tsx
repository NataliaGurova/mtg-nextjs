

// "use client";

// import ReactPaginate from "react-paginate";
// import styles from "./Pagination.module.css";

// interface PaginationProps {
//   pageCount: number;
//   forcePage: number; // 0-based
//   onPageChange: (page: number) => void; // 1-based
//   className?: string;
// }

// const Pagination = ({
//   pageCount,
//   forcePage,
//   onPageChange,
//   className,
// }: PaginationProps) => {
//   return (
//     <ReactPaginate
//       pageCount={pageCount}
//       forcePage={forcePage}
//       onPageChange={({ selected }) => onPageChange(selected + 1)}
//       marginPagesDisplayed={1}
//       pageRangeDisplayed={3}
//       previousLabel="<"
//       nextLabel=">"
//       breakLabel="…"
//       containerClassName={className ?? "flex justify-center gap-2"}
//       pageClassName="px-3 py-1 border rounded cursor-pointer"
//       previousClassName="px-3 py-1 border rounded cursor-pointer"
//       nextClassName="px-3 py-1 border rounded cursor-pointer"
//       activeClassName={styles.activePage}
//       disabledClassName="opacity-50 cursor-not-allowed"
//     />
//   );
// };

// export default Pagination;


"use client";

import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  forcePage: number; // 0-based
  onPageChange: (page: number) => void; // 1-based
}

const Pagination = ({ pageCount, forcePage, onPageChange }: PaginationProps) => {
  const currentPage = forcePage + 1;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pageCount;

  return (
    <div className={styles.wrapper}>
      {/* << */}
      <button
        type="button"
        className={styles.arrowBtn}
        disabled={isFirst}
        onClick={() => onPageChange(1)}
        aria-label="First page"
      >
        «
      </button>

      {/* < */}
      <button
        type="button"
        className={styles.arrowBtn}
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {/* numbers */}
      <ReactPaginate
        pageCount={pageCount}
        forcePage={forcePage}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        breakLabel="…"
        previousLabel={null}
        nextLabel={null}
        containerClassName={styles.pages}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        activeClassName={styles.activeItem}
        activeLinkClassName={styles.activeLink}
        breakClassName={styles.breakItem}
        breakLinkClassName={styles.breakLink}
        disabledClassName={styles.disabled}
      />

      {/* > */}
      <button
        type="button"
        className={styles.arrowBtn}
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>

      {/* >> */}
      <button
        type="button"
        className={styles.arrowBtn}
        disabled={isLast}
        onClick={() => onPageChange(pageCount)}
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
