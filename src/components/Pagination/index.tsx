

import { PaginationItem } from './PaginationItem';
import { Visibility } from '../Visibility';

import { PaginationProps } from './interface';

import styles from './styles.module.scss';

const siblingsCount = 1;

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0);
};

export const Pagination: React.FC<PaginationProps> = (props) => {

  const {
    totalCountOfRegisters,
    registerPerPage = 10,
    currentPage = 1,
    onPageChange
  } = props;

  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.contentPagination}>

        <Visibility visible={currentPage > (1 + siblingsCount)}>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > (2 + siblingsCount) && (
            <p>...</p>
          )}
        </Visibility>

        <Visibility visible={previousPages.length > 0}>
          {previousPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}
        </Visibility>

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        <Visibility visible={nextPages.length > 0}>
          {nextPages.map(page => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={page}
                number={page}
              />
            );
          })}
        </Visibility>

        <Visibility visible={(currentPage + siblingsCount) < lastPage}>
          {(currentPage + 1 + siblingsCount) < lastPage && (
            <p>...</p>
          )}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </Visibility>

      </div>
    </div >
  );
};