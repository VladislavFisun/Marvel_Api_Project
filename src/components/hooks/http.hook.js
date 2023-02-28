import { useState, useCallback } from "react";

export const useHttp=()=>{
  const[error,setError] = useState(null);
  const[loading,setLoading] = useState(false);;
  const request = useCallback(async(url,method='GET',body=null,headers={'Content-Type': 'application/json'})=>{
    setLoading(true)
  try{  const res = await fetch(url,{method, body, headers})
    if(!res.ok){
      throw new Error('error')
    }
   const data = await res.json();
   setLoading(false);
   return data

  }catch(e){
      setLoading(false);
      setError(e.message)
    }
  },[])
const clearError=useCallback(()=>setError(null),[])
return{error,loading,request,clearError}
}