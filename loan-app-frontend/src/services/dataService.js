// import creditScore from '../assets/credit_score.json';
// import riskScore from '../assets/risk_rating_score.json';
// import passingScore from '../assets/passing_score.json';

import api from "./api";

const createCreditScore = async (payload) => {
  try {
    var token = api.getToken();

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await api.post(`/creditscore`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const deleteCreditScore = async (id) => {
  try {
      var token = api.getToken();

      const response = await api.delete(`/creditscore/${id}`, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
      });
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : error.message;
  }
};

const getCreditScore = async () => {
  try {
    var token = api.getToken();

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await api.get(`/creditscore`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const createRiskScore = async (payload) => {
  try {
    var token = api.getToken();

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await api.post(`/riskscore`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const deleteRiskScore = async (id) => {
  try {
      var token = api.getToken();

      const response = await api.delete(`/riskscore/${id}`, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
      });
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : error.message;
  }
};

const getRiskScore = async () => {
  try {
    var token = api.getToken();

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await api.get(`/riskscore`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const getApplications = async () => {
  try {
    var token = api.getToken();

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await api.get(`/application`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const createApplication = async (payload) => {
  try {
    var token = api.getToken();

    if (!token) {
      throw new Error("Unauthorized: No token found");
    }

    const response = await api.post(`/application`, payload, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default { createCreditScore, getCreditScore, deleteCreditScore, createRiskScore, getRiskScore, deleteRiskScore, getApplications, createApplication }