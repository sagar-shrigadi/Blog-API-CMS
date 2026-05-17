import { getUserInfoFromToken } from "../../Helper/useToken";

export const getUserById = async (token) => {
  const decoded = getUserInfoFromToken(token);
  try {
    const response = await fetch(`http://localhost:3000/me/${decoded.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("user info response using id from decoded token", response);

    if (!response.ok) {
      const status = response.status;
      console.log("response Status when response is not ok", status);

      switch (status) {
        case "403":
          console.log("403 forbidden!");
          break;
        case "404":
          console.log(response.msg);

          break;

        default:
          console.log(response.msg);

          break;
      }
    }
    const data = await response.json();
    console.log(
      "json converted user info from server using decoded token",
      data,
    );
    return data;
  } catch (error) {
    console.log("error getting user data using /me/:userId", error);
  }
};
