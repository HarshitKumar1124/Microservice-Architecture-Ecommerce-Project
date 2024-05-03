import React, { useState ,useEffect} from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./DisplayList.css"
import { ClearError, DeleteProduct } from '../../Redux_Actions/ProductAction'
import { useAlert } from "react-alert";
import { DELETE_Product_Reset } from "../../Redux_Constants/ProductConstants";

const DisplayList = ({ ToDisplay, item }) => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const Navigate = useNavigate()

//   const{error:DeleteError,isDeleted} = useSelector((state)=>state.delproduct)

  const DeleteProductHandler=(id)=>{
    // dispatch(DeleteProduct(id))
    alert.error("Deleted")
  }

//   useEffect(() => {

//     if(DeleteError)
//     {
//       alert.error(DeleteError)
//       dispatch(ClearError());
//     }

//     if(isDeleted)
//     {
//       alert.success("Product Deleted Successfully !")
//       Navigate('/dash_board')
//       dispatch({type:DELETE_Product_Reset})
//     }
   
//   }, [dispatch,DeleteError,alert,isDeleted])
  


  //For DataGrid = Datagrids are the Advanced Features table with inbuilt functionality to sort or arrange data in terms of every field

  //Enter DataGrid Colums
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      
      
      flex: .7,
    },
    {
        field: "UserID",
        headerName: "User ID",
        minWidth: 100,
        flex: .7,
      },
    {
      field: "Status",
      headerName: "Order Status",
      cellClassName:"StatusColor",
      
      flex: 1,
      type: "number",
    },
    {
      field: "Price",
      headerName: "Price",
      minWidth: 150,
      flex: 0.7,
      type: "number",
    },
    {
      field: "Actions",
      headerName: "Actions",
      
      flex: 0.7,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link tag="a" to={`/products_Update/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=>DeleteProductHandler(params.getValue(params.id,'id'))}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  ToDisplay &&
    ToDisplay.forEach((item) => {
      rows.push({
        id: item._id,
        Price:item.TotalPrice,
        Status:item.OrderStatus,
        UserID:item.user_created,
        
        
      });
    });

   

  return (
    <>
      <div className="DisplayList_Container">
        <div>{item}List </div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          className="OrderListTable"
        />
      </div>
    </>
  );
};

export default DisplayList;
