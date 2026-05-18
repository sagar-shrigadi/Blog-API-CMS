export const editPublishStatus = async (token, postId, currentStatus) => {
  console.log(
    `current status ${currentStatus} || new status ${!currentStatus}`,
  );

  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ newStatus: !currentStatus }),
    });

    if (!response.ok) {
      console.error("response error", response.status);
      throw Error(`response error ${response.status}`);
    } else {
      const data = await response.json();
      console.log("edited publish status of post", data);
      return data;
    }
  } catch (error) {
    console.error("Post Comment", error);
  }
};
