import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

export const useAuthAxios = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [axiosInstance] = useState(() =>
    axios.create({ baseURL: "api" })
  );

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    return token ?? "";
  };

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${(await getToken()) ?? ""}`;
        return config;
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { axiosInstance, getToken };
};
