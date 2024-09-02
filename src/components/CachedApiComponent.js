import { wait } from '@testing-library/react';
import React, { useState,useEffect,useMemo  } from 'react'

const CachedApiComponent = () => {
    const[post ,setPost] = useState();
    const[loading,setLoading] = useState(true);
    const[input,setInput] = useState("");

    useEffect(() => {
        const fetchData =async () => {
            setLoading(true);
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const  data = await  response.json()
                setPost(data)
            }catch(err){
                console.log("Error fetching data:", err);
            }finally{
                setLoading(false);
            }
        }
        fetchData(); 
    }, [input]);

    const memoizedPosts = useMemo(() => {
        return post; // Return memoized posts data
      }, [post]);
  return (
    <div>
        <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
          placeholder="Enter input to refetch data"
        />
      </div>
      {loading ? (
        <p>Loading data...</p> // Show loading message when fetching
      ) : (
        <ul>
          {/* Render memoized posts data */}
          {memoizedPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CachedApiComponent