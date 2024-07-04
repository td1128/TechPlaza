import SummaryAPI from "../common"

const fetchCategoryWiseProduct=async(category)=>{
    const dataResponse=await fetch(SummaryAPI.categoryWiseProduct.url,{
        method: SummaryAPI.categoryWiseProduct.method,
        headers: {
            "Content-Type":"application/json"
        },
        body : JSON.stringify({
            category : category
        })

    })

    const dataApi= await dataResponse.json();

    return dataApi
}

export default fetchCategoryWiseProduct