const useCustomFetch = () => {
  const customFetch = async (endpoint: string, options = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(baseURL)
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: "include",  
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const response = await fetch(`${baseURL}${endpoint}`, mergedOptions);

    return response.json();
  };

  return customFetch;
};

export default useCustomFetch