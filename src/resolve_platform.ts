import * as esbuild from "esbuild";
import path from "path";
import fs from "fs";
import { handle_import_alias } from "./import_calc";

const js_flow_files = [
  "packages/App/redux/user/reducer.js",
  "packages/shared/redux/account/actions.js",
  "workspaces/components/components-apm-cardcenter/src/components/DetailSection/index.js",
  "workspaces/components/components-payment-selection/src/Components/PaymentMethodRow/PaymentMethodParentRow/WalletParentRow/index.js",
  "workspaces/components/components-payment-selection/src/Components/LinkedBankAccountRow/index.js",
  "workspaces/components/components-payment-selection/src/Components/SPMWalletRow/index.js",
  "packages/App/Components/PageComponent.js",
  "packages/App/Utils/navigateRN.js",
  "packages/shared/api/index.js",
  "packages/App/Wallet/WalletController.js",
  "packages/@shopee/user-redux/src/selectors.js",
  "packages/App/Utils/Sharing/genericSharing.js",
  "packages/root/WalletShopee/PinInput/config.js",
  "packages/SRNPlatform/NativeViews/index.js",
  "packages/App/ShopeeContainer/ConnectPageState.js",
  "packages/App/WalletAirpay/TransactionDetail/WalletWithdrawalDetail/utils.js",

  // TODO:
  "packages/App/WalletAirpay/WalletHome/index.js",
];

/**
 * esbuild support platform resolve plugin about module-resolver ios|android
 * @param platform ios|android
 * @returns
 */
const platform_ResolvePlugin = (platform: string) => {
  return {
    name: "reactnatie-resolve-plugin",
    setup(build: esbuild.PluginBuild) {
      const alias_config = handle_import_alias(
        build.initialOptions.absWorkingDir!
      );
      console.log(alias_config);

      build.onResolve({ filter: /.*/ }, async (arg: esbuild.OnResolveArgs) => {
        if (
          arg.path.endsWith(".gif") ||
          arg.path.endsWith(".png") ||
          arg.path.endsWith(".jpg")
        ) {
          // const p = path.resolve(arg.resolveDir, arg.path);
          return {
            path: arg.path,
            external: true,
          };
        }
        // support png alias
        if (arg.importer.includes("node_modules")) {
          const extname = path.extname(arg.importer);
          const import_extname = path.extname(arg.path);
          if (
            (arg.kind == "import-statement" || arg.kind == "require-call") &&
            import_extname === ""
          ) {
            if (
              extname.includes("js") ||
              extname.includes("jsx") ||
              extname.includes("tsx") ||
              extname.includes("ts")
            ) {
              if (arg.path.startsWith("./") || arg.path.startsWith("../")) {
                if (!ehance_resolve(arg.importer, arg.path)) {
                  const final_filepath = ehance_native_resolve(
                    arg.importer,
                    arg.path,
                    platform
                  );
                  return { path: final_filepath };
                }
              }
            }
          }
        }

        for (const [alias, true_path] of Object.entries(alias_config)) {
          if (
            (arg.path.startsWith(alias) && alias !== "@") ||
            (arg.path.startsWith(`${alias}/`) && alias === "@")
          ) {
            const newpath = arg.path.replace(alias, true_path);
            const final_filepath = ehance_resolve("/", newpath);
            if (final_filepath) {
              let external = false;
              for (const filepath of js_flow_files) {
                if (final_filepath.includes(filepath)) {
                  external = true;
                  break;
                }
              }
              return {
                path: final_filepath,
                external,
              };
            }
            break;
          }
        }

        const final_filepath = ehance_resolve(arg.importer, arg.path);
        if (final_filepath) {
          let external = false;
          for (const filepath of js_flow_files) {
            if (final_filepath.includes(filepath)) {
              external = true;
              break;
            }
          }
          return {
            path: final_filepath,
            external,
          };
        }
        return undefined;
      });
    },
  };
};

function ehance_resolve(
  basepath: string,
  filepath: string
): string | undefined {
  const joinpath = path.resolve(path.dirname(basepath), filepath);

  if (fs.existsSync(joinpath) && fs.statSync(joinpath).isFile()) {
    return joinpath;
  }

  const extensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".android.ts",
    ".ios.ts",
    ".android.tsx",
    ".ios.tsx",
    "/index.js",
    "/index.jsx",
    "/index.ts",
    "/index.tsx",
    "/src/index.js",
    "/src/index.jsx",
    "/src/index.ts",
    "/src/index.tsx",
    "/index.android.ts",
    "/index.ios.ts",
    "/index.android.tsx",
    "/index.ios.tsx",
  ];
  for (const ext of extensions) {
    const file_path = `${joinpath}${ext}`;
    if (fs.existsSync(file_path)) {
      return file_path;
    }
  }
  // console.log("rifa unknown path:", joinpath);
  return undefined;
}

function ehance_native_resolve(
  basepath: string,
  filepath: string,
  platform: string
): string {
  let existpath = "";
  const joinpath = path.resolve(path.dirname(basepath), filepath);
  const trypath = [
    joinpath + "." + platform + ".js",
    joinpath + "." + platform + ".jsx",
    joinpath + "." + platform + ".ts",
    joinpath + "." + platform + ".tsx",
    joinpath + "." + platform + "/index.js",
    joinpath + "." + platform + "/index.jsx",
    joinpath + "." + platform + "/index.ts",
    joinpath + "." + platform + "/index.tsx",
  ];
  for (let p of trypath) {
    if (fs.existsSync(p)) {
      existpath = p;
      break;
    }
  }
  if (existpath === "") {
    throw new Error(
      `"can't find ${basepath} and ${filepath} to platform ${platform} file exist file system!"` +
        "\n"
    );
  }
  return existpath;
}

export { platform_ResolvePlugin };
