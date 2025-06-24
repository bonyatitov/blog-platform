import React from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from './pagination.module.css'
import { setPage } from "../../../store/slices/paginationSlice";


const PaginationComponent = () => {
  const dispatch = useDispatch();
  const pagi = useSelector(state => state.pagination);
  const { allPages } = useSelector(state => state.articles);
  console.log(`Пагинация сейчас ${pagi}`);

  const handlePageChange = (page) => {
    dispatch(setPage(page))
  }

  return (
    <div className={styles['pagination-container']}>
      <Pagination onChange={handlePageChange} current={pagi}  total={allPages} />
    </div>
  );
};

export default PaginationComponent;
