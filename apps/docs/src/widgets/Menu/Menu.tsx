"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "react-router-dom";

/** ===== Components ===== */
function Menu({ data, onClick }: MenuProps) {
  const defaultExpandedKeys = data.map((_, i) => String(i));

  return (
    <Accordion
      selectionMode="multiple"
      showDivider={false}
      itemClasses={{
        titleWrapper: "flex-initial",
        indicator: "text-foreground",
      }}
      defaultExpandedKeys={defaultExpandedKeys}
    >
      {data?.map((a, i) => (
        <AccordionItem title={a.label} aria-label={a.label} key={i}>
          <ul className="[&>li>strong]:text-foreground flex list-inside list-disc flex-col gap-2 [&>li>strong]:font-medium">
            {a.items.map((item, k) => (
              <li
                key={`${item.label}__menu-item__${k}`}
                className="text-gray-400 marker:text-gray-400"
                onClick={() => onClick && onClick(item)}
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type MenuProps = {
  /** 메뉴 데이터 */
  data: TMenu;
  /** 링크 클릭 시 */
  onClick?: (item: TMenuItem) => void;
};

export type TMenu = {
  /** 레이블 */
  label: string;
  /** 하위 아이템 */
  items: TMenuItem[];
}[];

export type TMenuItem = { label: string; path: string };

export default Menu;
