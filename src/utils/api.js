const api = (() => {
  const BASE_URL = "https://public-api.delcom.org/api/v1";

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  // API Auth
  async function postAuthRegister({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to register user");
    }
    return responseJson.message;
  }

  async function postAuthLogin({ email, password }) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to log in");
    }
    return responseJson.data.token;
  }

  // API Users
  async function getMe() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to fetch user data");
    }
    return responseJson.data.user;
  }

  async function postChangePhotoProfile({ photoFile }) {
    const formData = new FormData();
    formData.append("photo", photoFile);
    const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to change photo profile");
    }
    return responseJson.message;
  }

  // API Auctions
  async function postAddAuction({
    title,
    description,
    start_bid,
    closed_at,
    cover,
  }) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("start_bid", start_bid);
    formData.append("closed_at", closed_at);
    formData.append("cover", cover);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value); // Optional logging for debugging
    });

    const response = await _fetchWithAuth(`${BASE_URL}/aucations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: formData,
    });

    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to create auction");
    }

    return responseJson.data.auction_id;
  }

  async function getAllAuctions() {
    const response = await _fetchWithAuth(`${BASE_URL}/aucations`);
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to fetch auctions");
    }
    return responseJson.data && responseJson.data.aucations
      ? responseJson.data.aucations
      : [];
  }

  // API Todos
  async function postAddTodo({ title, description }) {
    const response = await _fetchWithAuth(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to add todo");
    }
    return responseJson.data.todo_id;
  }

  async function postChangeCoverTodo({ id, cover }) {
    const formData = new FormData();
    formData.append("cover", cover);
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}/cover`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to change cover");
    }
    return responseJson.message;
  }

  async function putUpdateTodo({ id, title, description, is_finished }) {
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        is_finished,
      }),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to update todo");
    }
    return responseJson.data.todo_id;
  }

  async function deleteTodo(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to delete todo");
    }
    return responseJson.message;
  }

  async function getAllTodos(is_finished) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/todos?is_finished=${is_finished}`
    );
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to fetch todos");
    }
    return responseJson.data.todos;
  }

  async function getDetailTodo(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/todos/${id}`);
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.message || "Failed to fetch todo detail");
    }
    return responseJson.data.todo;
  }

  return {
    putAccessToken,
    getAccessToken,
    postAuthRegister,
    postAuthLogin,
    getMe,
    postAddAuction,
    getAllAuctions,
    postChangePhotoProfile,
    postAddTodo,
    postChangeCoverTodo,
    putUpdateTodo,
    deleteTodo,
    getAllTodos,
    getDetailTodo,
  };
})();

export default api;
