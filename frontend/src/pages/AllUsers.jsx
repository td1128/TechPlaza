import React, { useEffect, useState } from 'react'
import SummaryAPI from '../common';
import moment from 'moment';
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';
import { setUserDetails } from '../features/userSlice';


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: ''
  });

  const fetchUsers = async () => {
    const dataResponse = await fetch(SummaryAPI.allUser.url, {
      method: SummaryAPI.allUser.method,
      credentials: "include",
    })
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setAllUsers(dataApi.data);
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
    // console.log("data :",dataApi);
    // setAllUsers(dataApi.data);
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  return (
    <div className='gap-3'>
      <div className='bg-white py-2 px-2 flex justify-center items-center p-2 mb-5'>
            <h2 className='text-slate-700 font-bold text-xl '>All Users</h2>
      </div>
      <div className='bg-white pb-4'>
        <table className='w-full userTable'>
          <thead>
            <tr className='bg-gray-600 text-white'>
              <th>Sl.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=''>
            {
              allUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{moment(user.createdAt).format('ll')}</td>
                  <td>
                    <button className='bg-green-100 p-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={
                        () => {
                          setUpdateUserDetails(user)
                          setOpenUpdateRole(true)
                        }
                      }
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          openUpdateRole && (
            <ChangeUserRole
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              onClose={() => setOpenUpdateRole(false)}
              callFunc={fetchUsers}
            />
          )
        }
      </div>
    </div>
  )
}

export default AllUsers
