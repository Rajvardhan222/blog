"use client"; // Ensure this component is client-side

import axiosInstance from '@/axios-api/config';
import Blog from '@/components/Blog';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogsPage = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  let [response,setResponse]  = useState(null)

  useEffect(() => {
    const id = searchParams.get('id');
    setId(id);
  }, [searchParams]);

  let getData =async () =>{
    if(id){
        let data =await axiosInstance.get(`/blogs/getBlog?id=${id}`)
        setResponse(data.data)
        console.log(data);
        
     }
  }
  useEffect(() => {
        getData()
  }, [id])
  
console.log(response);

  return (
   response && <div className='flex flex-col h-screen  m-auto mt-24 '>
        <div className='mx-auto'>
            <Image
            src={response?.blog?.image}
            alt={'title image'}
            width={400}
            height={400}
            />
        </div>
        <h2 className='text-4xl ml-16 mt-24' >{response?.blog?.title}</h2>
        <p   className='text-2xl mt-28 ml-16'>{response?.blog?.content}</p>
     
    </div>
  );
};

export default BlogsPage;
