import React, { ReactNode } from "react";

/** 자식 컴포넌트를 이름으로 분리 */
export const useChildren = ({ children }: { children: ReactNode }) => {
  const components =
    React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return child;
    })
      ?.filter((a) => {
        const newType = a.type as ReactElementType;
        if (!newType.name && !newType.render?.name && !newType.displayName) {
          return false;
        }
        return true;
      })
      .reduce<Record<string, ReactNode>>((acc, cur) => {
        const newType = cur.type as ReactElementType;
        const name =
          newType?.prototype?.displayName ??
          newType.displayName ??
          newType?.name ??
          (newType.render!.name as string);

        return {
          ...acc,
          [name]: React.cloneElement(cur),
        };
      }, {}) ?? {};

  return components;
};

type ReactElementType = {
  name?: string;
  displayName?: string;
  render?: {
    name?: string;
  };
  // # 일반 함수로 정의 시 `prototype.displayName` 형태로 이름 정의
  prototype?: {
    displayName?: string;
  };
};
