import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

/**
 *
 * @param code
 * @param external_packages
 * @returns
 */
function export_calc(
  code: string,
  file_index: number
): { code: string; specifiers: string[] } {
  let export_specifiers: string[] = [];
  let ast: any = undefined;
  try {
    ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "flow"],
    });
  } catch (ex) {
    throw new Error(
      `parse error ----> \n index: ${file_index} \n ${code} \n ex: \n ${ex}`
    );
  }
  traverse(ast!, {
    enter(path) {
      if (path.isVariableDeclaration(path.node)) {
        if (path.node.kind === "var" && path.parent.type === "Program") {
          const info: any = path.node.declarations[0];
          if (info) {
            if (info.id.name) {
              // example var obj = {a: 1, b: 2};
              export_specifiers.push(info.id.name);
            } else if (info.id.properties.length > 0) {
              // example var {a, b} = {a: 1, b: 2};
              info.id.properties.forEach((p: any) => {
                export_specifiers.push(p.value.name);
              });
            }
          }
        }
      } else if (
        path.isImportDeclaration(path.node) &&
        path.parent.type === "Program"
      ) {
        // 调试 内存复制 ast 信息
        // memorycopy(JSON.stringify(path.node, null, 2));
        const specifiers_names: string[] = [];
        path.node.specifiers.forEach((sp) => {
          specifiers_names.push(sp.local.name);
        });
        // 查看所有的 spec
        // console.log('----->', specifiers_names);
        const none_reference_specifiers = specifiers_names.filter((sp) => {
          const binding = path.scope.getBinding(sp);
          return !binding?.referenced;
        });
        export_specifiers = export_specifiers.concat(none_reference_specifiers);
      }
    },
  });

  if (export_specifiers.length > 0) {
    const final_code = `
  ${code}
   
export { ${export_specifiers.join(", ")} };
  `;
    return { code: final_code, specifiers: export_specifiers };
  }
  return { code, specifiers: [] };
}

export { export_calc };

const test_code = `
// App.tsx
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
function Section({ children, title }) {
  const isDarkMode = useColorScheme() === "dark";
  return <View style={styles.sectionContainer}>
    <Text
      style={[
        styles.sectionTitle,
        {
          color: isDarkMode ? Colors.white : Colors.black
        }
      ]}
    >{title}</Text>
    <Text
      style={[
        styles.sectionDescription,
        {
          color: isDarkMode ? Colors.light : Colors.dark
        }
      ]}
    >{children}</Text>
  </View>;
}
function App() {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };
  return <SafeAreaView style={backgroundStyle}>
    <StatusBar
      barStyle={isDarkMode ? "light-content" : "dark-content"}
      backgroundColor={backgroundStyle.backgroundColor}
    />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
    >
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white
        }}
      >
        <Section title="Step One">
          {"Edit "}
          <Text style={styles.highlight}>App.tsx</Text>
          {" to change this screen and then come back to see your edits."}
        </Section>
        <Section title="See Your Changes"><ReloadInstructions /></Section>
        <Section title="Debug"><DebugInstructions /></Section>
        <Section title="Learn More">Read the docs to discover what to do next:</Section>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  </SafeAreaView>;
}
var styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});
var App_default = App;
`;

// const import_test_code = `
// import { AppRegistry as app } from "react-native";
// import * as rn from "react-native";
// import reactnative from "react-native";
// import { AppRegistry } from "react-native";
// `;

if (process.env.TESTCASE === "true") {
  export_calc(test_code, 0);
  // export_calc(import_test_code);
}
