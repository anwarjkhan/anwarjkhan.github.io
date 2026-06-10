import { useCallback, useState } from "react";
import {
  FlatList, Linking, RefreshControl, Text, TouchableOpacity, View, Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { api, type Job } from "../lib/api";

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await api<{ jobs: Job[] }>("/api/v1/jobs");
      setJobs(data.jobs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  async function tailor(job: Job) {
    Alert.alert("Tailoring started", "Your pack will appear in the Packs tab in 1–3 minutes.");
    try {
      await api("/api/tailor", {
        method: "POST",
        body: JSON.stringify({ jobId: job.id }),
      });
    } catch (err) {
      Alert.alert("Tailoring failed", err instanceof Error ? err.message : "");
    }
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(j) => j.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
      ListEmptyComponent={
        <Text style={{ padding: 24, color: "#666" }}>
          {error ? `⚠️ ${error} — set your token in Settings.` : "No job matches yet."}
        </Text>
      }
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>
            {item.title} · {item.matchScore}%
          </Text>
          <Text style={{ color: "#444", marginVertical: 4 }}>
            {item.company} · {item.location} · {item.salary}
          </Text>
          <Text numberOfLines={3}>{item.summary}</Text>
          <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={{ color: "#1a56db" }}>View posting →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tailor(item)}>
              <Text style={{ color: "#1a56db", fontWeight: "700" }}>
                ✨ Tailor
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
