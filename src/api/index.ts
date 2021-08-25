import axios, { AxiosInstance } from 'axios';
import { IEpisode } from '../types';

export const apiUrl = "https://localhost:3000/";

export class Api {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhdXRob3IyIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQVVUSE9SIn1dLCJpYXQiOjE2Mjk3NDM3NzUsImV4cCI6MTYzMDg3NTYwMH0.0BX0UTJcI_TOl5i5s7stkicqjJUreB8k-lpfqcpNpCj2WCBtKFTpKbRvQebe_OAO"
      }
    })
  }

  getImageUrl(file: File): Promise<string> {
    return this.axios.post(`/i/edit`, file).then((response) => response.data);
  }

  updateElements(id: string, arr: IEpisode[]): Promise<any> {
    return this.axios.post(`/edit/episodes/${id}/all`, arr).then((response) => response.data);
  }

  updateElement(id: string, obj: IEpisode): Promise<any> {
    return this.axios.post(`/edit/episodes/${id}`, obj).then((response) => response.data);
  }

  publishElement(id: string): Promise<any> {
    return this.axios.post(`/edit/episodes/${id}/publish`).then((response) => response.data);
  }


};