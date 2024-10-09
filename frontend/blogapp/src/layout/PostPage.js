import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {FaPen, FaTrash,} from 'react-icons/fa'
import { useUser } from '../context';
import Modal from './modal';
function PostPage() {
  const {modalOpen,setModalOpen} = useUser()
  const [show,setShow] = useState(true)
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id)
      .then((res) => res.json())
      .then((info) => setPostInfo(info));
  }, [id]);

  if (!postInfo) {
    return "";
  }

  return (
    <div className='max-w-5xl  mx-auto my-8 p-4 bg-[#f8f8f9] rounded-lg shadow-lg '>
      <div className='img mb-4'>
        <img
          className='w-full h-64 object-cover rounded-lg'
          src={`http://localhost:4000${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>
      <h1 className='text-3xl font-bold mb-4 w-[88%] break-words'>{postInfo.title}</h1>
      <div className='flex items-center space-x-4 text-gray-600 mb-6'>
        <time className='text-sm'>{new Date(postInfo.createdAt).toDateString()}</time>
        <span className='text-sm'>|</span>
        <span className='text-sm font-bold'>By {postInfo.author.username}</span>
      </div>


      {   
        show? (<>
        <div
        className='prose max-w-none break-words leading-loose the-content font-bold   '
        dangerouslySetInnerHTML={{ __html: (postInfo.content).slice(0,500)}}
        />
        <button className='text-blue-600 underline ' onClick={()=>setShow(false)}>Show More</button>
        </>)
        :
        (<>
        <div
          className='prose max-w-none break-words leading-loose the-content font-bold   '
          dangerouslySetInnerHTML={{ __html: postInfo.content}}
          />
          <button className='text-blue-600 underline ' onClick={()=>setShow(true)}>Show Less</button>
  
        </>)          
        }
      
        
      

      <div className='flex justify-center items-center'>
        <Link to={'/editPost/'+postInfo._id} className='bg-black text-white px-6 py-4 rounded-lg font-semibold my-4  w-fit'><FaPen/></Link>
        <button  className='text-white bg-red-600 px-6 py-4 font-mono uppercase m-4 rounded-lg shadow-lg  transition hover:bg-orange-700'onClick={ ()=> setModalOpen(true)}><FaTrash/></button>
      </div>
      {modalOpen&&<Modal/>}
    </div>
  );
}

export default PostPage;
