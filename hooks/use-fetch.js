import { useState } from "react";

const useFetch=(cb)=>{
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    const fn = async (...args)=>{
        setLoading(true)
        setError(null)

        try{
            const response = await cb(...args)
            setData(response)
            setError(null)
        }catch(error){
            setError(error)
        }finally{
            setLoading(false)
        }   
    };

    return {fn, data, loading, error}
}

export default useFetch;