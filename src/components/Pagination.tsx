import { useState } from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
}

function Pagination({ page, setPage, maxPage }: PaginationProps) {
  const [pageText, setPageText] = useState(String(page + 1));

  return (
    <div
      style={{
        marginBlock: "2rem",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
      }}
    >
      <span>
        Page {page + 1} / {maxPage}
      </span>

      <input
        type="number"
        value={pageText}
        onChange={(ev) => setPageText(ev.target.value)}
        min={0}
        max={maxPage}
      />

      <button
        onClick={() => setPage(Number(pageText) - 1)}
        disabled={Number(pageText) < 1 || Number(pageText) > maxPage}
      >
        Jump to page {pageText}
      </button>
    </div>
  );
}

export default Pagination;
