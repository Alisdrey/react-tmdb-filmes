import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { LoadingCardProps } from "./interface";

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './styles.module.scss';

export const LoadingCard: React.FC<LoadingCardProps> = ({ qtd }) => {
  function RenderSkeleton() {
    const list = [];

    for (let i = 1; i <= qtd; i++) {
      list.push(
        <SkeletonTheme
          baseColor="#202020" highlightColor="#444"
          key={i}
        >
          <Skeleton height={350} width={200} />
        </SkeletonTheme>
      );
    }
    return list;
  }

  return (
    <div className={styles.container}>
      {RenderSkeleton()}
    </div>
  );
};