import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";
import { AxiosInstance } from "axios";
import { accessTokenKeyName } from "./utils/helpers.js";
import { deleteNotes } from "./utils/deleteNotes.js";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

const resourceRoutes: Record<string, string> = {
  bottles: "bottles",
  notes: "notes",
};

type SortType = {
  name: string;
  direction: string;
};

type BodyType = {
  filter?: object;
  pageIndex?: number;
  pageSize?: number;
  sortColumns?: SortType[];
};

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resourceRoutes[resource]}/search`;
    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};
    const { headers } = meta ?? {};
    const queryFilters = generateFilter(filters);
    const body: BodyType = {};

    if (mode === "server") {
      body.pageIndex = current - 1;
      body.pageSize = pageSize;
    }

    body.filter = queryFilters;

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      body.sortColumns = [
        {
          name: _sort.join(","),
          direction: _order.join(","),
        },
      ];
    } else {
      body.sortColumns = [
        {
          name: "name",
          direction: "asc",
        },
      ];
    }

    const { data } = await httpClient.post(`${url}`, body, {
      headers: {
        ...headers,
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
        "Content-Type": "application/json",
      },
    });

    return {
      data: data.data,
      total: data.total,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resourceRoutes[resource]}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: {
        ...headers,
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
        "Content-Type": "application/json",
      },
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resourceRoutes[resource]}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "put";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: {
        ...headers,
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
        "Content-Type": "application/json",
      },
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resourceRoutes[resource]}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](url, {
      headers: {
        ...headers,
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
        "Content-Type": "application/json",
      },
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resourceRoutes[resource]}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    // if ressource is bottle, delete associate notes before
    if (resource === "bottles") {
      await deleteNotes(apiUrl, id);
    }

    const { data } = await httpClient[requestMethod](url, {
      headers: {
        ...headers,
        accept: "*/*",
        Authorization: `Bearer ${localStorage.getItem(accessTokenKeyName)}`,
        "Content-Type": "application/json",
      },
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },
});
