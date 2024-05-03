import axios from "axios"
import { All_Product_Request,
    Product_Details_Request,
    Product_Details_fail,
    Product_Details_success,
    All_Product_fail,
    All_Product_success ,
    Clear_errors,
    Add_Product_Request,
    Add_Product_fail,
    Add_Product_success,
    Add_Product_Reset,
    ADMIN_All_Product_Request,
    ADMIN_All_Product_success,
    ADMIN_All_Product_fail,
    DELETE_Product_Request,
    DELETE_Product_success,
    DELETE_Product_fail,
DELETE_Product_Reset,


NEW_REVIEW_REQUEST,
NEW_REVIEW_SUCCESS,
NEW_REVIEW_FAIL,
NEW_REVIEW_RESET,
UPDATE_REQUEST,
UPDATE_SUCCESS,
UPDATE_FAIL

} from "../Redux_Constants/ProductConstants";


export const getProduct = (keyword="",currentpage=1,price=[0,15000],Category)=>async(dispatch)=>{

    try{
        // console.log("hiiiiiiiiiis")
        dispatch({
            type:All_Product_Request
        })

        console.log("ssssss")

        let link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

        if(Category)
        link=`/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${Category}`

        const {data}= await axios.get(link)
    
        // console.log(ProductsDB )
        //  console.log(ProductsDB.data)
        // console.log(data)
        // console.log(ProductsDB.data.Allproducts)

       

        dispatch({
            type:All_Product_success,
            payload: data
        })

    }catch(error)
    {

    //    console.log("err",error)

        dispatch({
            type:All_Product_fail,
            payload: error.response.data.message,

            
        })
    }
}


export const ClearError=()=>async(dispatch)=>{

    dispatch({
        type:Clear_errors
    })
}




export const getProductDetails = (id)=> async(dispatch)=>{

// console.log("Get details")

    try{

        dispatch({
            type:Product_Details_Request
        })

        // console.log("ssssss_details")
        const {data}= await axios.get(`/api/v1/products/${id}`)
    
        // console.log(ProductsDB )
        //  console.log(ProductsDB.data)
        // console.log(data)
        // console.log(ProductsDB.data.Allproducts)

       

        dispatch({
            type:Product_Details_success,
            payload: data.product,
        })

    }catch(error)
    {

    //    console.log("err",error)

        dispatch({
            type:Product_Details_fail,
            payload: error.response.data.message,

            
        })
    }
}


export const CreateProduct = (ProductData)=>async(dispatch)=>{

    try{
        dispatch({type: Add_Product_Request});
        console.log("Add_Product_Request post")
  
        const {data} =await axios.post(`/api/v1/products/new`,ProductData);

        console.log(data)
       
        dispatch({
            type:Add_Product_success,
            payload:data
        })

    }catch(error)
    {

    //    console.log("err",error)

        dispatch({
            type:Add_Product_fail,
            payload: error.response.data.message,

            
        })
    }
}

//Get All Products For Admin

export const GetAdminProductList=()=>async(dispatch)=>{

    try{
        dispatch({
            type:ADMIN_All_Product_Request
        })

        const {data}= await axios.get("/api/v1/admin_view/products")


        dispatch({
            type:ADMIN_All_Product_success,
            payload: data
        })

    }
    catch(error)
    {
        dispatch({
            type:ADMIN_All_Product_fail,
            payload: error.response.data.message,

            
        })
    }

}

//Admin Delete Product
export const DeleteProduct = (id)=>async(dispatch)=>{

    try{
        dispatch({type: DELETE_Product_Request});
        // console.log("Add_Product_Request post")
  
        const {data} =await axios.delete(`/api/v1/products/${id}`);
       
        dispatch({
            type:DELETE_Product_success,
            payload:data.success
        })

    }catch(error)
    {

    //    console.log("err",error)

        dispatch({
            type:DELETE_Product_fail,
            payload: error.response.data.message,

            
        })
    }
}





//For Review Addition

export const newReview = (reviewData)=> async (dispatch)=>{


    // console.log("review submit aaya to",reviewData)


    try{
        dispatch({type:NEW_REVIEW_REQUEST})

        const {data} = await axios.put(`/api/v1/review`,reviewData);

        // console.log(data)

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success,
        })
    }catch(error)
    {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message,
        })
    }
}



//Update Product

export const UpdateProduct=(id,productNewData)=>async(dispatch)=>{


    try{
    dispatch({type:UPDATE_REQUEST})

    console.log("Update K Liye A a gaya")

    const {data} = await axios.put(`/api/v1/products_Update/${id}`,productNewData)


     console.log(data)

    
    dispatch({
        type:UPDATE_SUCCESS,
        payload:data.success,
    })
   }
   catch(error)
   {
    dispatch({
        type:UPDATE_FAIL,
        payload:error.response.data.message
    })

    console.log("roor")
   }

}