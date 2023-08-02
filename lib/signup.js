import axios from "axios"

export const signUp = async (data) => {
        const req = await axios.post("/api/auth/create-user", data);
        return true;
}