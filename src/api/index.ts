import axios, { AxiosInstance } from 'axios';

const apiUrl = "https://localhost:3000/";

class Api {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: apiUrl,
    })
  }
};