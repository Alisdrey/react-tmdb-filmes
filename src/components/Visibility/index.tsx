import React from 'react';
import { VisibilityProps } from './interface';

export const Visibility: React.FC<VisibilityProps> = (props) => {
  const { visible, children } = props;

  return visible ? <>{children}</> : <></>;
};