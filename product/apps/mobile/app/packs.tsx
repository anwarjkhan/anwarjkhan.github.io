import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Share, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { api, type Pack } from "../lib/api";

export default function PacksScreen() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await api<{ packs: Pack[] }>("/api/v1/packs");
      setPacks(data.packs);
    } catch {
      // settings screen handles token errors
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <FlatList
      data={packs}
      keyExtractor={(p) => p.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
      ListEmptyComponent={
        <Text style={{ padding: 24, color: "#666" }}>
          No application packs yet — tailor a job from the Jobs tab.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
          <Text style={{ fontWeight: "700", fontSize: 16 }}>
            {item.jobTitle} — {item.company}
          </Text>
          <Text style={{ color: "#444", marginVertical: 4 }} numberOfLines={2}>
            {item.fitAssessment}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                title: `Application pack — ${item.jobTitle}`,
                message: `${item.coverLetter}\n\n---\n\n${item.cvMarkdown}`,
              })
            }
          >
            <Text style={{ color: "#1a56db", fontWeight: "700" }}>
              Share / copy pack →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
