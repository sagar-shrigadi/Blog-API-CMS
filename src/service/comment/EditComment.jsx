export const editComment = async (token, commentId, message) => {
  try {
    const response = await fetch(
      `http://localhost:3000/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      },
    );
    console.log("response from server", response);

    if (!response.ok) {
      console.error("response error", response.status);
      throw Error(`response error ${response.status}`);
    } else {
      const data = await response.json();
      console.log("response after converting to json", data);
      return data;
    }
  } catch (error) {
    console.error("Post Comment", error);
  }
};
