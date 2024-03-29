/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { CiMobile4 } from "react-icons/ci";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { MdOutlineCamera } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { IoIosLaptop } from "react-icons/io";
import Swipper from "../../components/Swiper";
import CardHome from "../../components/CardHome";
import axiosWithConfig from "../../utils/apis/axiosWithConfig";
import Swal from "sweetalert2";
import { useCart } from "../../utils/contexts/cartContext";
const Home = () => {
  const [products, setProducts] = useState<[]>([]);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { changeCart } = useCart();

  function getProduct(pageProduct: number) {
    axiosWithConfig
      .get(`/products?page=${pageProduct}`)
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function addToCartHandle(id_product: number) {
    axiosWithConfig
      .post(`/carts/${id_product}`)
      .then((res) => {
        console.log(res);
        changeCart();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProduct(page);
  }, [category, page]);

  return (
    <Layout>
      <div className="mx-[100px] my-[50px]">
        <div className="h-[350px] mb-20">
          <Swipper />
        </div>
        <h1 className="text-red-500 font-semibold ps-5 border-s-[15px] border-red-500 text-lg mb-5">
          Categories
        </h1>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold mb-5">Browse By Category</h1>{" "}
          {category == "" ? (
            <></>
          ) : (
            <button
              className="hover:bg-red-500 hover:text-white p-1"
              onClick={() => setCategory("")}>
              Show all product
            </button>
          )}
        </div>
        <div className="flex gap-auto justify-between flex-wrap">
          <div
            onClick={() => setCategory("phone")}
            className={`w-[170px] h-[145px] border-2 rounded-lg ${
              category === "phone" ? "bg-red-500 text-white" : "bg-white"
            } border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5`}>
            <CiMobile4 className="text-5xl" />
            <h1 className="text-center">Phones</h1>
          </div>
          <div
            onClick={() => setCategory("computer")}
            className={`w-[170px] h-[145px] border-2 rounded-lg ${
              category === "computer" ? "bg-red-500 text-white" : "bg-white"
            } border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5`}>
            <HiOutlineComputerDesktop className="text-5xl" />
            <h1 className="text-center">Computers</h1>
          </div>
          <div
            onClick={() => setCategory("camera")}
            className={`w-[170px] h-[145px] border-2 rounded-lg ${
              category === "camera" ? "bg-red-500 text-white" : "bg-white"
            } border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5`}>
            <MdOutlineCamera className="text-5xl" />
            <h1 className="text-center">Cameras</h1>
          </div>
          <div
            onClick={() => setCategory("smartwatch")}
            className={`w-[170px] h-[145px] border-2 rounded-lg ${
              category === "smartwatch" ? "bg-red-500 text-white" : "bg-white"
            } border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5`}>
            <BsSmartwatch className="text-5xl" />
            <h1 className="text-center">Smartwatch</h1>
          </div>
          <div
            onClick={() => setCategory("television")}
            className={`w-[170px] h-[145px] border-2 rounded-lg ${
              category === "television" ? "bg-red-500 text-white" : "bg-white"
            } border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5`}>
            <PiTelevisionSimpleLight className="text-5xl" />
            <h1 className="text-center">Television</h1>
          </div>
          <div
            onClick={() => setCategory("laptop")}
            className={`w-[170px] h-[145px] border-2 rounded-lg ${
              category === "laptop" ? "bg-red-500 text-white" : "bg-white"
            } border-slate-400 hover:bg-red-500 hover:text-white cursor-pointer flex flex-col justify-center items-center gap-5`}>
            <IoIosLaptop className="text-5xl" />
            <h1 className="text-center">Laptop</h1>
          </div>
        </div>
        <div className="grid grid-cols-4 my-5 gap-5">
          {products ? (
            products.map((item: any, index: number) => {
              if (item.category == category) {
                return (
                  <CardHome
                    key={index}
                    photo_product={item.photo_product}
                    name={item.name}
                    price={item.price}
                    id={item.id}
                    addToCart={() => addToCartHandle(item.id)}
                  />
                );
              } else if (category == "") {
                return (
                  <CardHome
                    key={index}
                    photo_product={item.photo_product}
                    name={item.name}
                    price={item.price}
                    id={item.id}
                    addToCart={() => addToCartHandle(item.id)}
                  />
                );
              }
            })
          ) : (
            <button onClick={() => setPage(1)}>Back to page 1</button>
          )}
        </div>
        <div className="flex justify-center">
          {/* <Pagination data={products} /> */}
          <div>
            <ul className="flex gap-2">
              <li
                className="h-[35px] w-[70px] relative rounded-sm hover:bg-red-500 hover:text-white border-2 border-slate-300 cursor-pointer"
                onClick={prePage}>
                <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Back</p>
              </li>
              <li
                className={`h-[35px] w-[35px] relative  rounded-sm hover:bg-red-500 hover:text-white border-2 border-slate-300 cursor-pointer`}>
                <p className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}>
                  {page}
                </p>
              </li>
              <li
                className="h-[35px] w-[70px] relative rounded-sm hover:bg-red-500 hover:text-white border-2 border-slate-300 cursor-pointer"
                onClick={nextPage}>
                <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Next</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );

  function prePage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }
};

export default Home;
