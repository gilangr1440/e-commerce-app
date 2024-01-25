/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { BsTrash3 } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosWithConfig from "../../utils/apis/axiosWithConfig";
import Swal from "sweetalert2";
import { useCart } from "../../utils/contexts/cartContext";
import { formattedAmount } from "../../utils/formattedAmount";

const Cart = () => {
  const { changeCart } = useCart();
  const [cart, setCart] = useState<[] | any>([]);

  function getCart() {
    axiosWithConfig
      .get("/carts")
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCart();
  }, []);

  const handleDecrement = (cart_id: number) => {
    cart.map((item: any) => {
      if (item.id == cart_id) {
        if (item.quantity == 1) {
          const quantity = item.quantity - 0;
          updateCartQuantity(cart_id, quantity);
        } else {
          const quantity = item.quantity - 1;
          updateCartQuantity(cart_id, quantity);
        }
      }
    });
  };

  const handleIncrement = (cart_id: number) => {
    cart.map((item: any) => {
      if (item.id == cart_id) {
        const quantity = item.quantity + 1;
        updateCartQuantity(cart_id, quantity);
      }
    });
  };

  const totalHarga: number[] =
    cart &&
    cart.map((item: any) => {
      return item.Products.price * item.quantity;
    });

  const sumTotal: number =
    totalHarga && totalHarga.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  function updateCartQuantity(id: number, quantity: number) {
    axiosWithConfig
      .put(`/carts/${id}`, {
        quantity: quantity,
      })
      .then((res) => {
        getCart();
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  function deleteCartHandle(id: number) {
    axiosWithConfig
      .delete(`/carts/${id}`)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          preConfirm: () => getCart(),
        });
        changeCart();
      })
      .catch((error) => console.log(error));
  }

  return (
    <Layout>
      <div className="mx-[100px] my-[50px]">
        <h1 className="mb-14">
          <span className="text-slate-300">Home /</span> Cart
        </h1>
        <table className="w-full table-cart mb-5">
          <thead className="h-14 shadow-sm rounded-sm">
            <tr>
              <th colSpan={2}>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          {cart &&
            cart.map((items: any, index: number) => {
              return (
                <tbody key={index}>
                  <tr className="shadow-sm rounded-sm">
                    <td className="w-28 p-3">
                      <img src={`${items.Products.photo_product}`} width={100} height={100} />
                    </td>
                    <td className="w-32">{items.Products.name}</td>
                    <td className="text-center">{formattedAmount(items.Products.price)}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer flex justify-center items-center`}
                          onClick={() => handleDecrement(items.id)}
                        >
                          <FaMinus />
                        </div>
                        <div className="w-8 h-8 flex justify-center items-center">
                          {items.quantity}
                        </div>
                        <div
                          className="w-8 h-8 rounded-full bg-red-500 text-white cursor-pointer flex justify-center items-center"
                          onClick={() => handleIncrement(items.id)}
                        >
                          <FaPlus />
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {formattedAmount(items.Products.price * items.quantity)}
                    </td>
                    <td className="text-center">
                      <button onClick={() => deleteCartHandle(items.id)}>
                        <BsTrash3 />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
        <div className="flex justify-between">
          <Link to={"/"}>
            <button className="py-3 px-8 h-14 border-2 border-slate-400 rounded-sm hover:bg-red-500 hover:text-white">
              Return To Home
            </button>
          </Link>
          <div className="border-2 border-black rounded-sm p-8 w-[470px]">
            <h1 className="text-md font-semibold">Cart Total</h1>
            <hr className="border-slate-400 mb-14" />
            <div className="flex justify-between mb-6">
              <p>Total:</p>
              <p>{formattedAmount(sumTotal || 0)}</p>
            </div>
            {cart && cart.length > 0 ? (
              <Link to={"/orderproducts"}>
                <button className="py-3 px-8 h-14 border-2 border-slate-400 rounded-sm bg-red-500 text-white mx-1/5">
                  Process to Order
                </button>
              </Link>
            ) : (
              <button
                className="py-3 px-8 h-14 border-2 border-slate-400 rounded-sm mx-1/5 bg-gray-400 text-white"
                disabled
              >
                Process to Order
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
