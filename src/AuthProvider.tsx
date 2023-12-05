import { AuthBindings } from "@refinedev/core";
import axios from "axios";
import {
  accessTokenKeyName,
  loginEndpoint,
} from "./rest-data-provider/utils/helpers.js";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const username = email.substring(0, email.indexOf("@"));
    const response = await axios.post(loginEndpoint(), {
      username,
      password,
    });

    if (response.status === 201) {
      localStorage.setItem(accessTokenKeyName, response.data.accessToken);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: `Invalid username or password: ${response.statusText}`,
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    // automatic connection

    const response = await axios.post(loginEndpoint(), {
      username: "jack",
      password: "sparrow",
    });

    if (response.status === 201) {
      localStorage.setItem(accessTokenKeyName, response.data.accessToken);
      return {
        success: true,
        authenticated: true,
      };
    }

    return {
      success: false,
      authenticated: false,
      error: {
        name: "LoginError",
        message: `Authentification error: ${response.statusText}`,
      },
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    // to refresh the token
    // localStorage.removeItem(TOKEN_KEY);
    return {
      error,
    };
  },
};
