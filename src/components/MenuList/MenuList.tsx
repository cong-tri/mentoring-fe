import { Menu } from "../../types";

const MenuItem: React.FC<{ menu: Menu }> = ({ menu }) => {
  return (
    <li>
      <a href={menu.url}>{menu.title}</a>
      {menu.children && menu.children.length > 0 && (
        <ul>
          {menu.children.map((child) => (
            <MenuItem key={child.meN_ID} menu={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const MenuList = ({ menus }: { menus: Menu[] }) => {
  return (
    <ul>
      {menus.map((menu) => (
        <MenuItem key={menu.meN_ID} menu={menu} />
      ))}
    </ul>
  );
};

export default MenuList;
