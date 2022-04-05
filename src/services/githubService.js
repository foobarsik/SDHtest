import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

const baseUrl = "https://api.github.com";
const repo = "facebook/react-native";
const rerPage = 20;

export const GetIssues = createAsyncThunk(
    "issues/getIssues",
    async (page = 1) => (await axios.get(`${baseUrl}/repos/${repo}/issues?page=${page}&per_page=${rerPage}`)).data
);

export const GetIssue = createAsyncThunk(
    "issues/getIssue",
    async (id) => (await axios.get(`${baseUrl}/repos/${repo}/issues/${id}`)).data
);
