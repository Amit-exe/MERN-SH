import axios from "axios";

const create = async (user) => {
  try {
    const res = await axios.post("/api/users", user);
    return res.data;
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
};

export default create;
