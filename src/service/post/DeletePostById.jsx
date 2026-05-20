export const deletePostById = async (token, postId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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
