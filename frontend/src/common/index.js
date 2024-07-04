const backendDomain="http://localhost:8080"

const SummaryAPI = {
    signUp:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    login:{
        url:`${backendDomain}/api/login`,
        method:"post"
    },
    userDetails:{
        url:`${backendDomain}/api/user-details`,
        method:"get"
    },
    logout:{
        url:`${backendDomain}/api/logout`,
        method:"get"
    },
    allUser:{
        url:`${backendDomain}/api/all-user`,
        method:"get"
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method:"post"
    },
    uploadProduct:{
        url:`${backendDomain}/api/upload-product`,
        method:"post"
    },
    allProduct:{
        url:`${backendDomain}/api/get-product`,
        method:"get"
    },
    updateProduct:{
        url:`${backendDomain}/api/update-product`,
        method:"post"
    },
    getCategoryProduct:{
        url:`${backendDomain}/api/get-category`,
        method:"get"
    },
    categoryWiseProduct:{
        url:`${backendDomain}/api/category-product`,
        method:"post"
    },
    productDetails:{
        url:`${backendDomain}/api/product-details`,
        method:"post"
    }
}

export default SummaryAPI;
