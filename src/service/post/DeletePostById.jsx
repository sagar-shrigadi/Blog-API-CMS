import { baseUrl } from "../baseUrl";

export const deletePostById = async (token, postId) => {
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error("delete post error", response.status);
      throw Error(`delete post ${response.status}`);
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};
