import { parse } from '@babel/parser';
import generate from '@babel/generator';

function replace_space(code: string) {
  return code.replace(/[\r\n]/g, '').replace(/\ +/g, '');
}

function print_import_code(code: string) {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'flow'] });
  const res = generate(ast, { compact: false, comments: true }, code);
  if (replace_space(res.code) === replace_space(code)) {
    console.log('same code !');
  }
}

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

if (process.env.TESTCASE === 'true') {
  print_import_code(test_code);
  // export_calc(import_test_code);
}
