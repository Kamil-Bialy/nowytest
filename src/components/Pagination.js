import cx from 'classnames';
import { Link } from 'react-router-dom';
import '../css/Pagination.css';

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages || currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  let shouldAddDots = true;

  return (
    <nav>
      <ul className='pagination'>
        <li className='pageItem'>
          <Link className='pageLink' onClick={prevPage} to='#'>
            &#60;
          </Link>
        </li>
        {pageNumbers.map(pgNumber => {
          if (
            pgNumber <= 3 ||
            pgNumber >= nPages - 2 ||
            (pgNumber >= currentPage - 1 && pgNumber <= currentPage + 1)
          ) {
            shouldAddDots = true;
            return (
              <li
                key={pgNumber}
                className={cx('pageItem', { pageItemActive: currentPage === pgNumber })}
              >
                <Link
                  onClick={() => setCurrentPage(pgNumber)}
                  className={cx('pageLink', { pageLinkActive: currentPage === pgNumber })}
                  to='#'
                >
                  {pgNumber}
                </Link>
              </li>
            );
          } else if (shouldAddDots) {
            shouldAddDots = false;
            return (
              <li key={pgNumber} className='pageItem'>
                <Link className='pageLink' to='#'>
                  ...
                </Link>
              </li>
            );
          }
        })}
        <li className='pageItem'>
          <Link className='pageLink' onClick={nextPage} to='#'>
            &#62;
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
