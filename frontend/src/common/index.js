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
    }
}

export default SummaryAPI;
