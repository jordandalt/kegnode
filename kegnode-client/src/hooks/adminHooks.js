import { useEffect, useState } from "react";
import axios from "axios";

export const useAdminTaps = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTaps = async () => {
    try {
      const response = await axios.get("/api/taps");
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaps();
  }, []);

  return [getTaps, { response, loading, error }];
};

export const useAdminKegs = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getKegs = async () => {
    try {
      const response = await axios.get("/api/kegs");
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKegs();
  }, []);

  return [getKegs, { response, loading, error }];
};

export const useUpsertKeg = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createOrUpdateKeg = async (kegData) => {
    try {
      let response = null;
      if (Object.keys(kegData).includes("identity")) {
        // Update keg
        console.log(kegData);
        response = await axios.put(`/api/kegs/${kegData.identity}`, kegData);
      } else {
        // Create new keg
        delete kegData.identity;
        response = await axios.post("/api/kegs", kegData);
      }
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [createOrUpdateKeg, { response, loading, error }];
};

export const useDeleteKeg = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteKeg = async (kegIdentity) => {
    try {
      const response = await axios.delete(`/api/kegs/${kegIdentity}`);
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [deleteKeg, { response, loading, error }];
};
