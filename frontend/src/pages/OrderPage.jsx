import React, { useEffect, useState } from 'react'
import SummaryAPI from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
  const [data,setData] =useState([])

  const fetchOrderDetails=async()=>{
    const response =await fetch(SummaryAPI.getOrder.url,{
      method:SummaryAPI.getOrder.method,
      credentials:"include",
    })

    const dataApi = await response.json();
    setData(dataApi.data)

    console.log("order details",dataApi);
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-2 flex justify-center items-center m-3'>
         <h2 className='text-slate-700 font-bold text-xl '>My Orders</h2>
      </div>
      {
        !data[0] && (
          <p>No Order available</p>
        )
      }

      <div className='p-4 w-full max-w-4xl mx-auto'>
        {
          data.map((item, index) => {
            return (
              <div key={index} className='p-2' >
                <p className='font-medium text-lg '>{moment(item?.createdAt).format('LL')}</p>
                <div className='border rounded'>
                  <div className='grid gap-2 p-2'>
                    {
                      item?.productDetails.map((product, index) =>{
                        return (
                          <div key={product.productId+index} className='flex gap-3 bg-slate-100 items-center'>
                            <img src={product.productImage} className='w-28 h-28 bg-slate-200 object-scale-down mix-blend-multiply p-2 '/>
                            <div>
                              <div className='font-medium text-lg text-ellipsis line-clamp-1 text-slate-700'>{ product.productName }</div>
                              <div className='flex items-center gap-10 mt-1'>
                                <div className='text-lg text-red-500'>{ displayINRCurrency(product.price) }</div>
                                <p className='text-slate-600'>Quantity : {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }

                  </div>
                  <div className='flex flex-col lg:flex-row gap-4 p-2 justify-between '>
                    <div className='p-3'>
                      <div className='text-lg font-medium text-blue-600'>Payment Details :</div>
                      <p className='font-medium text-slate-600'>Payment Method : { item.paymentDetails.payment_method_type[0] }</p>
                      <p className='font-medium text-slate-600 '>Payment Status : { item.paymentDetails.payment_status }</p>
                    </div>
                    <div>
                      <div className='text-lg font-medium text-blue-600 p-3'>Shipping Details : </div>
                      {
                        item.shipping_options.map((shipping,index)=>{
                          return (
                            <div key={shipping.shipping_rate} className='px-3'>
                              <p className='font-medium text-slate-600'>Shipping Amount : { displayINRCurrency(shipping.shipping_amount/100) }</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>

                  <div className='font-bold text-lg p-3 text-red-500'>
                    Total Amount : { displayINRCurrency(item.tatalAmount) }
                  </div>
                </div>


              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default OrderPage
