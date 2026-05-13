import api from "./api";

const registerUser = async (payload) => {
    try {
        const response = await api.post(`/register`, payload, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const loginUser = async (payload) => {
    try {
        const response = await api.post(`/login`, payload, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const forgotPassword = async (payload) => {
    try {
        const response = await api.post(`/email/resetpassword`, payload, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const changePassword = async (payload) => {
    try {
        var token = getQueryParam("tkn");
        var userId = getQueryParam("id");

        if (!token) {
            throw new Error("Unauthorized: No token found");
        }

        const response = await api.post(`/user/changepassword/${userId}`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const changeUserPassword = async (id, payload) => {
    try {
        var token = api.getToken();

        if (!token) {
            throw new Error("Unauthorized: No token found");
        }

        const response = await api.post(`/user/changepassword/${id}`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const getUsers = async () => {
    try {
        var token = api.getToken();
        
        if (!token) {
            throw new Error("Unauthorized: No token found");
        }

        const response = await api.get(`/user`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const updateUser = async (id, payload) => {
    try {
        var token = api.getToken();

        const response = await api.put(`/user/${id}`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

const deleteUser = async (id) => {
    try {
        var token = api.getToken();

        const response = await api.delete(`/user/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        throw error.data?.error?.length ? error.data.error[0] : error.message;
    }
};

export default { registerUser, loginUser, forgotPassword, changePassword, changeUserPassword, getUsers: getUsers, updateUser, deleteUser };
