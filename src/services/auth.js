import { useStore } from "../store/appStore.js";
import { useAuthStore } from "../store/authStore.js";
import router from "../router/router.js";

const API_URL =
  import.meta.env.VITE_API_URL_DEV || "http://localhost:3000/api/auth";

export const authServices = {
  handleLogin: async (options) => {
    const store = useStore();
    const authStore = useAuthStore();

    store.setFetchingData(true);

    await fetch(API_URL + "/login", options)
      .then((res) => res.json().then((data) => ({ raw: res, data })))
      .then(({ raw, data }) => {
        // data = parsed JSON body    raw = original response with status, ok, etc.
        if (raw.ok && (raw.status === 200 || raw.status === 201)) {
          authStore.user = data.user;

          router.push("/choose-character");
        } else {
          console.log("error~!!");
          store.setErrorMsg(data.message);
        }
      })
      .catch((err) => {
        console.warn(err);
        throw err.message;
      });
    store.setFetchingData();
  },

  handleMakeNewUser: async (options) => {
    const store = useStore();

    store.setFetchingData(true);
    await fetch(API_URL + "/new-user", options)
      .then((res) => res.json())
      .then((res) => {
        console.log("new user res", res);
        if (res.ok && res.status === 201) {
          store.user = res.data;
          router.push("/choose-character");
        } else {
          store.setErrorMsg(res.errorMsg);
        }
      })
      .catch((err) => console.warn(err));
    store.setFetchingData();
  },

  currentUser: async (options) => {
    const store = useStore();

    store.setFetchingData(true);

    try {
      const response = await fetch(API_URL + "/current-user", options);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      console.log("checking auth", data);
      if (!data.authenticated) {
        return null;
      }

      return data.user;
    } catch {
      return null;
    } finally {
      store.setFetchingData(false);
    }
  },
};
