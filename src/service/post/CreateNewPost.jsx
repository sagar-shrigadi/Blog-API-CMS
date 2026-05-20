export const CreateNewPost = async (token, title, content, isPublished) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, content, isPublished }),
    });
    console.log("new post, response from server", response);

    if (!response.ok) {
      console.error("new post error", response.status);
      throw Error(`new post error ${response.status}`);
    } else {
      const data = await response.json();
      console.log("new post after converting to json", data);
      return data;
    }
  } catch (error) {
    console.error("catch block new post", error);
  }
};
