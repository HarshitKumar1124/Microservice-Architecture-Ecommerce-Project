import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css"
//  import { Doughnut } from 'react-chartjs-2';
import { useDispatch } from "react-redux";
import { ClearError,GetAdminProductList } from '../../Redux_Actions/ProductAction'
import {GetAdminUserList} from "../../Redux_Actions/UserAction"
import { useSelector } from "react-redux";

const Dashboard = () => {

    const Navigate = useNavigate();

    const dispatch = useDispatch()

    const {loading,error,product} = useSelector((state)=>state.products);

    const {allUser} = useSelector((state)=>state.getUser);
    

    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(ClearError());

        }

        // dispatch(GetAdminProductList());
        dispatch(GetAdminUserList())


    },[dispatch,error,alert])



    const Add_Product=()=>{
        Navigate("/products/new");
    }

    //Doughnut State is basically Representation of the Products Available to Product Out Of Stock

    // const DoughnutState = {
    //     labels:['Out Of Stock','InStock'],
    //     datasets:[{
    //         backgroundColor:["#00A684","#6800B4"],
    //         hoverBackgroundColor:["#4B5000","#35014f"],
    //         data:[2,10],
    //     },
    // ],
    // }



  return (
    <>
      <div className="DashBoard_Container">
        <h1>Admin_DashBoard</h1>
        <button onClick={Add_Product}>ADD PRODUCTS</button>

        <div className="DashBoard_Summary">

            <div className="TotalAmount">
                <p>
                    Welcome To The Admin View
                </p>
            </div>
            <div className="Display_Info">
                <Link  tag="a" to="/admin_view/products" title="ADMIN VIEW | See Total Products In Store">
                    <p>Products</p>
                    <p>{product?product.length:0}</p>
                </Link>

                <Link tag="a"  to="/admin_view/orders"  title="ADMIN VIEW | See Total Orders In Store">
                    <p>Orders</p>
                    <p>20</p>
                </Link>

                <Link  tag="a" to="/admin_view/users" title="ADMIN VIEW | See Total Users In Store">
                    <p>Users</p>
                    
                    {
                        allUser?<p>{allUser.length}</p>:<p>0</p>
                    }
                </Link>

            </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;
