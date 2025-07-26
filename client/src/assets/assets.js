import logo from "./logo.png";
import search_icon from "./search.svg";
import cart_icon from "./cart.svg";
import header_img from "./header.png";
import home from "./Home.jpg";
import office from "./Office.jpg";
import restaurant from "./Restaurant.jpg";
import library from "./Library.jpg";
import hospital from "./Hospital.jpg";
import home_chair from "./H_Chair.jpg";
import D_table from "./H_D_Table.jpg";
import add_icon_white from "./add_icon_white.svg";
import add_icon_green from "./add_icon_green.svg";
import remove_icon_red from "./remove_icon_red.svg";
import close_icon from "./close_icon.svg";
import profile_icon from "./profile_image.svg";
import logout_icon from "./logout_icon.svg";
import order_icon from "./order_icon.png";
import package_icon from "./package_icon.svg";
import dropdown_icon from "./arrow_drop_down.svg";

export const assets = {
  logo,
  search_icon,
  cart_icon,
  header_img,
  add_icon_white,
  remove_icon_red,
  add_icon_green,
  close_icon,
  profile_icon,
  logout_icon,
  order_icon,
  package_icon,
  dropdown_icon,
};

export const category_list = [
  {
    category_name: "Home",
    category_img: home,
  },
  {
    category_name: "Office",
    category_img: office,
  },
  {
    category_name: "Restaurant",
    category_img: restaurant,
  },
  {
    category_name: "Library",
    category_img: library,
  },
  {
    category_name: "Hospital",
    category_img: hospital,
  },
];

export const product_list = [
  {
    _id: "1",
    name: "Chair",
    image: home_chair,
    price: 2500,
    description:
      "Morden plastic sofa chair For living room chair with best quality",
    category: "Home",
  },
  {
    _id: "2",
    name: "Dining Table",
    image: D_table,
    price: 5000,
    description:
      "design Modern dining table with 4 stable legs Unique and Made by hand Each article is unique Because it is handmade and a natural product.",
    category: "Restaurant",
  },

  // {
  //   _id: "3",
  //   name: "",
  //   image: "",
  //   price: "",
  //   description: "",
  //   category: "",
  // },
];
