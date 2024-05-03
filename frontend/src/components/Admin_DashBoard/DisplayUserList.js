import React ,{useEffect}from 'react'
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import{Button} from "@material-ui/core"
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./DisplayUserList.css"

import {DeleteUser,ClearError} from "../../Redux_Actions/UserAction"
import { Delete_User_Reset } from '../../Redux_Constants/UserConstants';
import { Link } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';

const DisplayUserList = ({ToDisplay,item}) => {

    const dispatch = useDispatch();

  const alert = useAlert();

  const Navigate = useNavigate()

  const{error:DeleteError,isDeleted} = useSelector((state)=>state.delUser)

  const DeleteUserHandler=(id)=>{

     dispatch(DeleteUser(id))
  }

  useEffect(() => {

    if(DeleteError)
    {
      alert.error(DeleteError)
      dispatch(ClearError());
    }

    if(isDeleted)
    {
      alert.success("User Deleted Successfully !")
      Navigate('/dash_board')
      dispatch({type:Delete_User_Reset})
    }
   
  }, [dispatch,DeleteError,alert,isDeleted])
  

  //For DataGrid = Datagrids are the Advanced Features table with inbuilt functionality to sort or arrange data in terms of every field

  //Enter DataGrid Colums
  const columns = [
    {
      field:"viewInfo",
      headerName:"View User Info",
      flex:0.39,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={()=>Navigate(`/Admin_view/UserInfo/${params.id}`)}>
              <LaunchIcon />
            </Button>
          </>
        );
      },


    },
    {
      field: "id",
      headerName: "User ID",  
      flex: 0.5,
      
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: .5,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 0.7,
       
      },
    {
      field: "UserType",
      headerName: "UserType",
      minWidth: 150,
      flex: 0.5,
      editable: true,
      type: "singleSelect",
      valueOptions: ["admin", "user"],
      onClick:()=>{
        console.log("HIiis")
      }
      
     
    },
    {
      field: "Action",
      headerName: "Action",
      
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={()=>DeleteUserHandler(params.getValue(params.id,'id'))}>
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
        UserType: item.userType,
        email: item.email,
        name: item.name,
      });
    });



  return (
    <div className="DisplayList_Container">
    <div>{item}List</div>
    <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          className="UserListTable"
          
          
        />
    </div>
  )
}

export default DisplayUserList