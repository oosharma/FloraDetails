import React, { useEffect, useState } from "react";

export const useAuth = (token) => {
  const [error, setError] = useState({
    msg: null,
    status: null,
    id: null,
  });

  const updateError = (err, id) => {
    if (err.response) {
      let errorUpdate = {
        msg: err.response.data,
        status: err.response.status,
        id: id,
      };
      setError(errorUpdate);
    }
  };

  const tokenConfig = () => {
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
 
    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  const clearErrors = () => {
    let errorUpdate = {
      msg: null,
      status: null,
      id: null,
    };
    setError(errorUpdate);
  };
 
  const resArray = [error, clearErrors, updateError, tokenConfig];
  return React.useMemo(() => resArray, resArray);
};
