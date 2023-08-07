import axios from "axios";

export const followUser = async (followerData) => {
    const res = await axios.post("/api/follower", followerData)
    return res.data;
}

export const newReview = async (reviewData) => {
    const res = await axios.post("/api/reviews", reviewData)
    return res.data;
}