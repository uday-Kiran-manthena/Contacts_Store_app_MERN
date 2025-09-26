import React from "react";

export default function Pagination({ currentPage, totalPages, onChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (
      (i === currentPage - 2 && i > 1) ||
      (i === currentPage + 2 && i < totalPages)
    ) {
      pages.push("...");
    }
  }

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className="pagination-btn"
      >
        Previous
      </button>

      <div className="pagination-pages">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="pagination-dots">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onChange(p)}
              className={`pagination-number ${
                currentPage === p ? "active" : ""
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
}
