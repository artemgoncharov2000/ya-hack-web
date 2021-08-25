import axios, { AxiosInstance } from 'axios';
import { IEpisode } from '../types';

export const apiUrl = "http://localhost:8080/";

export class Api {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhdXRob3IzIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQVVUSE9SIn1dLCJpYXQiOjE2Mjk4ODc4NDQsImV4cCI6MTYzMTA0ODQwMH0.cTUhxsxVT6khgHWB89IVN-jugpoBHTBzxomUf2hCbv9fjDQBuCOJDCyaaz6iMsno"
      }
    })
  }

  // getImageUrl(file: FormData): Promise<string> {
  //   return this.axios.post(`/i/edit`, file).then((response) => response.data);
  // }

  updateElements(id: string, arr: IEpisode[]): Promise<any> {
    return this.axios.post(`/edit/episodes/${id}/all`, arr).then((response) => response.data);
  }

  getElement(id: string): Promise<any> {
    return this.axios.get(`/edit/episodes/${id}`).then((response) => response.data);
  }

  updateElement(id: string, obj: IEpisode): Promise<any> {
    return this.axios.post(`/edit/episodes/${id}`, obj).then((response) => response.data);
  }

  publishElement(id: string): Promise<any> {
    return this.axios.post(`/edit/episodes/${id}/publish`).then((response) => response.data);
  }


};