import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { getToken, setToken } from "../lib/api";

export default function SettingsScreen() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getToken().then((t) => t && setValue(t));
  }, []);

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Paste your personal access token from the web app (Settings → Mobile
        app) to sync your account:
      </Text>
      <TextInput
        value={value}
        onChangeText={(t) => {
          setValue(t);
          setSaved(false);
        }}
        placeholder="jp_…"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12 }}
      />
      <Button
        title={saved ? "Saved ✓" : "Save token"}
        onPress={async () => {
          await setToken(value.trim());
          setSaved(true);
        }}
      />
    </View>
  );
}
