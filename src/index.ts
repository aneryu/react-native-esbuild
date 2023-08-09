import { makebundle } from './metro_esbuild';
import path from 'node:path';
import { FlowExternalPlugin, FlowRemoveTypesPlugin } from './external_flow';

const js_flow_files = [
  'packages/App/redux/user/reducer.js',
  'packages/shared/redux/account/actions.js',
  'workspaces/components/components-apm-cardcenter/src/components/DetailSection/index.js',
  'workspaces/components/components-payment-selection/src/Components/PaymentMethodRow/PaymentMethodParentRow/WalletParentRow/index.js',
  'workspaces/components/components-payment-selection/src/Components/LinkedBankAccountRow/index.js',
  'workspaces/components/components-payment-selection/src/Components/SPMWalletRow/index.js',
  'packages/App/Components/PageComponent.js',
  'packages/App/Utils/navigateRN.js',
  'packages/shared/api/index.js',
  'packages/App/Wallet/WalletController.js',
  'packages/@shopee/user-redux/src/selectors.js',
  'packages/App/Utils/Sharing/genericSharing.js',
  'packages/root/WalletShopee/PinInput/config.js',
  'packages/SRNPlatform/NativeViews/index.js',
  'packages/App/ShopeeContainer/ConnectPageState.js',
  'packages/App/WalletAirpay/TransactionDetail/WalletWithdrawalDetail/utils.js',
  'packages/App/WalletAirpay/WalletHome/index.js',
];

const workdir = process.env.BUILD_PACKAGE_PATH as string;
const pkg: any = {};
try {
  Object.assign(
    pkg,
    require((process.env.BUILD_PACKAGE_PATH as string) + '/package.json')
  );
} catch (error) {
  console.log('no package.json found in workdir[' + workdir + ']');
  process.exit(1);
}

const platform = process.argv[2] as 'ios' | 'android';
if (!['ios', 'android'].includes(platform)) {
  console.log('platform must be ios or android');
  process.exit(1);
}

const entryPoints = [path.resolve(workdir, pkg.main)];
const outputfile = path.resolve(workdir, `./${platform}/index.js`);

let user_plugin: any[] = [
  FlowExternalPlugin(js_flow_files),
  FlowRemoveTypesPlugin,
];
let extra_externals: string[] = [
  '@shopee-rn/recommendation-item-sdk',
  '@shopee/rn-recommendation-ftss',
  '@shopee/product-price',
  '@shopee/item-card-types',
];
// 打印 依赖图 的日志
process.env.WRITE_LOG_INFO = 'true';
// 忽略剩余 含有未定义的变量
process.env.IGNORE_CHECK_VARS = 'true';

const IF_BUNDLE = (process.env.NodeBundle ?? 'false') === 'true';
makebundle(
  entryPoints,
  outputfile,
  workdir,
  platform,
  true,
  user_plugin,
  extra_externals
)
  .then(res => {
    // res.outputFiles.map(file => { console.log(file.text.toString()) });
    console.log(`\n build success!`);
  })
  .catch(err => {
    console.log(`err--->\n ${err}`);
  });
