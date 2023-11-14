import React from 'react';
import Button from 'react-bootstrap/Button';
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const renderPageNumbers = () => {
        if (totalPages <= 3) {
            return pageNumbers.map((page) => (
                <Button
                    key={page}
                    variant="secondary"
                    onClick={() => onPageChange(page - 1)}
                    className={currentPage === page - 1 ? 'active' : ''}
                >
                    {page}
                </Button>
            ));
        } else {
            const visiblePages = 3;
            const halfVisiblePages = Math.floor(visiblePages / 2);

            let renderedPages = [];

            if (currentPage <= halfVisiblePages) {
                console.log("First condition");
                renderedPages = [...pageNumbers.slice(0, visiblePages), '...', totalPages];
            } else if (currentPage >= totalPages - halfVisiblePages - 1) {
                console.log("Second condition");
                renderedPages = [1, '...', ...pageNumbers.slice(totalPages - visiblePages)];
            } else {
                console.log("Third condition");
                renderedPages = [
                    1,
                    '...',
                    ...pageNumbers.slice(currentPage - halfVisiblePages, currentPage + halfVisiblePages + 1),
                    '...',
                    totalPages,
                ];
            }

            const result = renderedPages.map((page, index) => (
                <Button
                    key={index}
                    variant="secondary"
                    onClick={() => onPageChange(typeof page === 'number' ? page - 1 : currentPage)}
                    className={currentPage === page - 1 ? 'active' : ''}
                >
                    {page}
                </Button>
            ));

            console.log("Rendered Pages:", result);

            return result;
        }
    };

    return (
        <div className="pagination">
            <Button
                variant="secondary"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Poprzednia
            </Button>
            {renderPageNumbers()}
            <Button
                variant="secondary"
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Następna
            </Button>
        </div>
    );
};

export default Pagination;
