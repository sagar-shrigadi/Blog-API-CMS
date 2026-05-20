export const editPostById = async (
  token,
  postId,
  title,
  content,
  isPublished,
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, content, isPublished }),
      },
    );
    if (!response.ok) {
      console.error("edit post error", response.status);
      throw Error(`edit post error ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
