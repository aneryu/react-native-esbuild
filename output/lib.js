// src/index.ts
import { ComponentManager } from "@shopee/react-native-sdk";

// src/pages/Home/index.tsx
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Linking
} from "react-native";

// src/core/index.ts
import {
  createI18n,
  createPageContainer,
  createPluginInit,
  createReduxStore
} from "@shopee/react-native-sdk";

// src/core/constants.ts
var PACKAGE_NAME = "@shopee-rn/my-plugin";
var __DEV_PACKAGE__ = "@@DEV_PACKAGE";

// src/redux/reducers.ts
var reducers_default = {
  helloWorld: () => {
    return null;
  }
};

// src/core/customInit.ts
var customInit = null;
var customInit_default = customInit;

// src/core/index.ts
var i18n = createI18n(PACKAGE_NAME);
var store = createReduxStore(
  reducers_default,
  PACKAGE_NAME,
  __DEV_PACKAGE__
);
var PluginInit = createPluginInit([i18n.init, customInit_default]);
var PageContainer = createPageContainer(
  PACKAGE_NAME,
  store,
  PluginInit,
  void 0,
  false,
  { trackingScoping: true }
);
var PageContainerWithConnectHoc = createPageContainer(
  PACKAGE_NAME,
  store,
  PluginInit,
  void 0,
  true,
  { trackingScoping: true }
);

// src/pages/Home/index.tsx
import { PageComponent } from "@shopee/react-native-sdk";

// src/Constants.ts
var MODULES = {
  HOME_PAGE: "HOME"
};

// src/pages/Home/index.tsx
import { Button, ActionBar } from "@shopee-rn/ui-common";
function openURLInBrowser(url) {
  if (!__DEV__) {
    Linking.openURL(url);
  }
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const scriptHostname = (scriptURL == null ? void 0 : scriptURL.search(/^https?:\/\//)) >= 0 ? scriptURL.split("://")[1].split(":")[0] : "localhost";
  fetch(`http://${scriptHostname}:8081/open-url`, {
    method: "POST",
    body: JSON.stringify({ url })
  }).catch(() => {
    Linking.openURL(url);
  });
}
var HomePage = class extends PageComponent {
  render() {
    return <>
      <ActionBar title="Welcome to your new plugin!" />
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to Shopee React Native!</Text>
        <Text style={styles.instructions}>
          {"To get started, edit"}
          {" "}
          <Text style={styles.code}>src/pages/Home/index.tsx</Text>
        </Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.heading}>More resources</Text>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Button
            onPress={() => openURLInBrowser("https://confluence.shopee.io/x/vG1mS")}
            text="React Native Platform Docs"
          />
          <Button
            style={{ marginLeft: 10 }}
            variant="outline"
            onPress={() => openURLInBrowser(
              "https://shopee.git-pages.garena.com/app-fe/rn-ui-common/"
            )}
            text="Shopee UI Library"
          />
        </View>
      </View>
    </>;
  }
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.05)"
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginTop: 15
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  link: {
    fontWeight: "400",
    color: "#7a3636"
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#ccc",
    padding: 5,
    lineHeight: 1.2
  },
  bold: {
    fontWeight: "bold"
  }
});
var instructions = Platform.select({
  ios: <Text>
    {"Press "}
    <Text style={styles.bold}>Cmd+R</Text>
    {" to reload,"}
    {" "}
    <Text style={styles.bold}>Cmd+D</Text>
    {" or shake for dev menu"}
  </Text>,
  android: <Text>
    <Text style={styles.bold}>Double tap R</Text>
    {" on your keyboard to reload, Shake or press menu button for dev menu."}
  </Text>
});
PageContainer(MODULES.HOME_PAGE, HomePage);

// src/index.ts
var INTERNAL_NAVIGATORS = [
  {
    displayName: "@shopee-rn/my-plugin",
    children: [
      {
        name: "@shopee-rn/my-plugin/HOME",
        displayName: "Home page"
      }
    ]
  }
];
ComponentManager.registerComponent(
  "@shopee-rn/my-plugin",
  // Your plugin name
  "internalNavigators",
  // MUST BE "internalNavigators"
  INTERNAL_NAVIGATORS
);
//# sourceMappingURL=lib.js.map
