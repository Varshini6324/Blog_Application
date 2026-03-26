import React, {useEffect,useState} from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { cardClass, headingClass, submitBtn } from '../styles/common'
import {toast} from 'react-hot-toast'
import axios from 'axios'

function UserDashboard() {
  
  //get logout func from auth store
  const logout = useAuth(state => state.logout)
  const currentUser = useAuth(state => state.currentUser)
  const navigate = useNavigate()
  const [articles,setArticles] = useState([])

  //perform logout and make it to navigate to login
  const onLogout = async() =>{
    //logout
    await logout()
    toast.success("Logged out successfully")
    //navigate
    navigate("/Login")
  }

  //read articles of all authors
  const getArticles = async () =>{
    try{
      let res = await axios.get("http://localhost:4000/user-api/articles", {withCredentials:true})
      setArticles(res.data.payload)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getArticles()
  },[])
  
  return (
    <div className="p-5">
      <div className="flex justify-between mb-6">
        <div >
          <h1 className="text-xl lg:text-2xl font-black text-gray-900 drop-shadow-sm">
            WELCOME
          </h1>
          <h2 className="text-lg lg:text-xl font-bold text-slate-800 drop-shadow-sm">
            {currentUser?.firstName || currentUser?.name || 'User'}
          </h2>
          <div className='w-16 h-16'>
            <img 
              src={currentUser?.profileImageUrl || 'https://via.placeholder.com/80x80/6b7280/ffffff?text=👤'} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full shadow-md bg-white"
            />
          </div>
        </div>
        
          

          
  
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {articles.map((article)=>(
        <div key={article._id} className={cardClass}>
        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 text-sm">{article.content?.substring(0,120)}...</p>
        <p className="text-gray-400 text-xs mt-3">Category: {article.category}</p>
        
        </div>
      ))}
    </div>
    <button className={submitBtn} onClick={onLogout}>Logout</button>
    </div>
  )
}

//read articles of all authors
//display them in the form of grid of cardds
//1 card for extra small
//2 cards for small
//3 cards for medium
//4 cards from large screen onwards

export default UserDashboard