import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Update_Page.css"
import {ClearError, getProductDetails, UpdateProduct} from "../../Redux_Actions/ProductAction.js"
import MetaData from '../Layout/MetaData'
import {  useNavigate,Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import {  UPDATE_RESET } from '../../Redux_Constants/ProductConstants'
import { useParams } from 'react-router-dom'



const UpDate_ProductPage = () => {

    
    const dispatch = useDispatch();

    const alert = useAlert();

    const Navigate = useNavigate()

    const fetchParams = useParams();




    const ProductID = fetchParams.id;


    // const {loading,error:UpdateError,isUpdated} = useSelector((state)=>state.UpdateProduct)

    // console.log(loading,UpdateError,isUpdated);


    // const {loading,error:UpdateError,isUpdated} = useSelector((state)=>state.UpdateProduct)

    const {productDetail:TargetproductDetail} = useSelector((state)=> state.productDetails)

    console.log(TargetproductDetail)




    const [Product_Detail,setProduct_Detail] = useState({
      name:"",
      description:"",
      price:0,
      category:"",
      stock:1
  })

   

  
  useEffect(()=>{

    
    dispatch(getProductDetails(ProductID))

    if(TargetproductDetail)
    {
        const obj = {name:TargetproductDetail.name,description:TargetproductDetail.description,price:TargetproductDetail.price,category:TargetproductDetail.category,stock:TargetproductDetail.stock}
      setProduct_Detail(obj)
    }
    
      
        // if(UpdateError)
        // {
        //     alert.error(UpdateError);
        //     dispatch(ClearError());
        // }

        // if(isUpdated)
        // {
        //     alert.success("Product Updated Successfully !")
        //     dispatch({type:UPDATE_RESET})
        //     Navigate("/dash_board")
        // }

        // dispatch,alert,UpdateError,isUpdated,Navigate
    },[])







    const InputDetail=(e)=>{
     
        setProduct_Detail({...Product_Detail,[e.target.name]:[e.target.value]})
    }
 
    const SubmitDetails=(e)=>{


        e.preventDefault();

        const productInfo ={
            "name":Product_Detail.name.toString(),
            "description":Product_Detail.description.toString(),
            "price":Product_Detail.price.toString(),
            "category":Product_Detail.category.toString(),
            "stock":Product_Detail.stock.toString(),
        }

        // console.log(productInfo)

        dispatch(UpdateProduct(ProductID,productInfo));

        setProduct_Detail({name:"",
        description:"",
        price:0,
        category:"",
        stock:1})

        alert.success("Product Updated !")

        Navigate("/admin_view/products")

        
    }

      





  return (


    
    <>
    <MetaData title="Update Product"/>
    
    <div className='Update_Detail'>

        <div className='Update_Details'>
 
           <label for="product_name" >
            Product Name<br/>
           <input type="text" placeholder="Enter Product Name" id="product_name" onChange={InputDetail} name="name" value={Product_Detail.name}/>
           </label>

           <label for="product_description" >
           Description<br/>
           <input type="textarea" placeholder='Write Some Description !' id="product_description"  onChange={InputDetail} value={Product_Detail.description} name="description"/>
           </label>

          <label for="product_price">
           Price<br/>
           <input type="number" placeholder='000' onChange={InputDetail} value={Product_Detail.price} name="price"/>
           </label>
           
           <label for="product_category">
           Category<br/>
           
           <select id="product_category" placeholder='Choose Category'  onChange={InputDetail} value={Product_Detail.category} name="category">
            <option value="Books">Books</option>
            <option value="Footwears">Footwears</option>
            <option value="Laptops">Laptops</option>
            <option value="Bags">Bags</option>
            <option value="Electronics">Electronics</option>
            <option value="Toy">Toy</option>
            <option value="Camera">Camera</option>
            <option value="Smartphones">Smartphones</option>
          
           </select>
           </label>

           <label for="product_stock">
           Current Stock<br/>
           <input type="number" placeholder='00' id="product_stock"  onChange={InputDetail} value={Product_Detail.stock} name="stock"/>
           </label>

           <input type="submit" onClick={SubmitDetails}/>
      


        </div>

    </div>
    </>
  )
}

export default UpDate_ProductPage