import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const API_URL: string =
  Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000";

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem("jobpilot.token");
}

export async function setToken(token: string): Promise<void> {
  await AsyncStorage.setItem("jobpilot.token", token);
}

export async function api<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  summary: string;
  matchScore: number;
  status: string;
};

export type Pack = {
  id: string;
  jobTitle: string;
  company: string;
  fitAssessment: string;
  cvMarkdown: string;
  coverLetter: string;
  createdAt: string;
};
