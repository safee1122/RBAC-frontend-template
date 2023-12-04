import NetworkCall from "~/network/networkCall";
import Request from "~/network/request";
import {
  addProduct,
  deleteProduct,
  saveAllProducts,
  updateProduct,
} from "~/redux/product/productsSlice";
import K from "~/utilities/constants";

export default class Product {
  static async getAll() {
    const request = new Request(
      K.Network.URL.Products.GetAll,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      false,
    );
    return async (dispatch) => {
      const response = await NetworkCall.fetch(request, true);
      dispatch(saveAllProducts(response?.products));
      return response;
    };
  }

  //get product by id
  static async getById(id) {
    const request = new Request(
      K.Network.URL.Products.GetProductsById + `/${id}`,
      K.Network.Method.GET,
      K.Network.Header.Type.Json,
      {},
      false,
    );
    return await NetworkCall.fetch(request, true);
  }

  // Create Product
  static async create(body) {
    const request = new Request(
      K.Network.URL.Products.CreateProducts,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false,
    );
    return async (dispatch) => {
      try {
        const response = await NetworkCall.fetch(request, true);
        dispatch(addProduct(response.data));
      } catch (error) {
        console.log("error", error);
      }
    };
  }

  static async update(body) {
    const request = new Request(
      K.Network.URL.Products.UpdateProducts,
      K.Network.Method.POST,
      body,
      null,
      K.Network.Header.Type.Json,
      false,
    );
    return async (dispatch) => {
      try {
        await NetworkCall.fetch(request, true);
        dispatch(updateProduct(body));
      } catch (error) {
        console.log("error", error);
      }
    };
  }

  static async delete(id) {
    const params = `${K.Network.URL.Products.DeleteProducts}/${id}`;
    const request = new Request(
      params,
      K.Network.Method.DELETE,
      null,
      null,
      K.Network.Header.Type.Json,
      false,
    );
    return async (dispatch) => {
      try {
        const response = await NetworkCall.fetch(request, true);
        dispatch(deleteProduct(response.product._id));
      } catch (error) {
        console.log("error", error);
      }
    };
  }

  // Export Csv File
  static async exportCsvFile(body) {
    const request = new Request(
      K.Network.URL.Csv.ExportCsvFile,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.File,
      {},
      false,
    );
    return await NetworkCall.fetch(request, true);
  }

  // Import Csv File
  static async importCsvFile(body) {
    const request = new Request(
      K.Network.URL.Csv.ImportCsvFile,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.File,
      {},
      false,
    );
    return NetworkCall.fetch(request, true);
  }
}
