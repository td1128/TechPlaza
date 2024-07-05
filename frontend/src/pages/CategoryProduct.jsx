import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import productCategory from '../helpers/productCategory'
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import VerticalCard from '../components/VerticalCard'
import SummaryAPI from '../common'

const CategoryProduct = () => {
    const params=useParams()
    const location=useLocation()
    const navigate=useNavigate()
    // console.log(location)

    const urlSearch=new URLSearchParams(location.search)
    const urlCategoryListinArray=urlSearch.getAll("category")

    // console.log(urlCategoryListinArray)

    const urlCategoryObject={}
    urlCategoryListinArray.forEach(el=>{
      urlCategoryObject[el]=true
    })   

    // console.log(urlCategoryObject)

    // console.log(params.category_name)
    /* {params.category_name} */
    const [data,setData]=useState([])
    const [loading,setloading]=useState(false)

    const [selectCategory,setSelectCategory]=useState(urlCategoryObject)
    const [filterCategoryList,setFilterCategoryList]=useState([])

    const [sortBy,setSortBy]=useState("")

    // console.log(sortBy)

    const fetchData=async () => {

      const response=await fetch(SummaryAPI.filterProduct.url,{
        method:SummaryAPI.filterProduct.method,
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          category:filterCategoryList
        })
      })

      const dataResponse=await response.json()
      console.log("filter product",dataResponse)

      setData(dataResponse?.data || [])
    }

    const handleSelectCategory=(e)=>{
      const {name,value,checked}=e.target
      setSelectCategory((prev)=>{
        return {
          ...prev,
          [value]:checked
        }
      })
    }
    
    // console.log("selected category",selectCategory )

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory=Object.keys(selectCategory).map(categoryKeyName=>{
        // console.log(categoryKeyName)
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el=>el)

      setFilterCategoryList(arrayOfCategory)

      // console.log(arrayOfCategory)

      //format for url change on checkbox change
      const urlFormat=arrayOfCategory.map((el,index)=> {
        if((arrayOfCategory.length-1)===index){
          return `category=${el}`
        }

        return `category=${el}&&`
      })
      // console.log("url format",urlFormat.join(""))
      navigate("/product-category?"+urlFormat.join(""))

    },[selectCategory])

    const handleOnChangeSortBy= (e)=>{
      const { value } = e.target
      setSortBy(value)
      if(value === 'asc'){
        setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      if(value === 'dsc'){
        setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className='container mx-auto p-4'>

      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll '>
          {/* sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortBy' value={"asc"} checked={sortBy==='asc'} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortBy' value={"dsc"} checked={sortBy==='dsc'} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName,index)=>{
                  return(
                    <div className='flex items-center gap-3'>
                      <input type="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>
        {/* Right side (product)*/}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2 '>Search Results : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)]'>
            {
              data.length!==0 && (
                <VerticalCard data={data} loading={loading}/>
              )
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default CategoryProduct
