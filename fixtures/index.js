import { faqUrlByLocale_default, init_faqUrlByLocale } from './shopee113.js';
import { init_promoVoucher } from './shopee112.js';
import { init_merchant_withdrawal_constants } from './shopee111.js';
import { init_src8 } from './shopee109.js';
import { init_constants3 } from './shopee106.js';
import { require_crypto_js } from './shopee99.js';
import { __spreadValues, __esm, __toESM } from './shopee0.js';
// workspaces/modules/constants/src/constants.ts
import { LOCALE as LOCALE6, ENV as ENV3, LANGUAGE as LANGUAGE4, ROOT_DOMAIN as SHOPEE_ROOT_DOMAIN } from "@shopee-rn/app-env";
import { Application as Application6, AppType } from "@shopee/react-native-sdk";
var import_crypto_js, SHOPEEPAY_COUNTRIES, AIRPAY_COUNTRIES, IS_SG, IS_SHOPEEPAY_COUNTRY, IS_AIRPAY_COUNTRY, SHOPEEPAY_PRE_LIVE, IS_MY, IS_ID, PRETOPUP_COUNTRIES, IS_PRETOPUP_COUNTRY, SEABANK_COUNTRIES, IS_SUPPORT_SEABANK_COUNTRY, PACKAGE_NAME2, BUNDLE_NAME2, WalletError, ShopeeWSAError, MERCHANT_TERMS_URL_BY_LOCALE, MERCHANT_TERMS_URL, MERCHANT_PRIVACY_POLICY_BY_LOCALE, MERCHANT_PRIVACY_POLICY_URL, MERCHANT_SHOPEE_HELP_CENTER_BY_LOCALE, MERCHANT_SHOPEE_HELP_CENTER_URL, MERCHANT_SIGNUP_URL_BY_LOCALE, MERCHANT_SIGNUP_URL, LEARN_MORE_URL_BY_LOCALE, LEARN_MORE_URL, TERMS_URL_BY_LOCALE2, TERMS_URL2, FAQ_URL2, AUTO_TOPUP_TERMS_URL_BY_LOCALE, AUTO_TOPUP_TERMS_URL, MERCHANT_HELP_CENTER_URL_BY_LOCALE, MERCHANT_HELP_CENTER_URL, NEW_MERCHANT_HELP_CENTER_URL_BY_LOCALE, NEW_MERCHANT_HELP_CENTER_URL, NON_KYC_BALANCE_BY_LOCALE, NON_KYC_BALANCE, NON_KYC_BALANCE_WARNING_BY_LOCALE, NON_KYC_BALANCE_WARNING, KYC_BALANCE_BY_LOCALE, KYC_BALANCE, TOPUP_THRESHOLD_BALANCE_BY_LOCALE, TOPUP_THRESHOLD_BALANCE, AutoTopupLimit, AUTO_TOPUP_LIMIT, EntranceByCountry, SHOPEEPAY_HOME_MODULE, PostLoginByCountry, MODULES2, MAIN_BUNDLE_NAME, AdvancedKYCByCountry, ADVANCED_KYC_MODULE, MergedAdvancedKYCByCountry, TopupByCountry, TOPUP_MODULE, CURRENT_TERMS_VERSION, MergeDepositAndRefundEnabledByCountry, MERGE_DEPOSIT_AND_REFUND_ENABLED, CrossBorderTransactionCountriesByLocale, CROSS_BORDER_TRANSACTION_COUNTRIES, transactionCurrencyByCountry, TransactionType, TransactionListType, TransferInitVia, TransferTrackingTypeByInitVia, KYCRecordStatus, KYCType, TRANSFER_NEED_KYC_BY_LOCALE, TRANSFER_NEED_KYC, UserStatus, FullScreenDialogTypeByUserStatus, WITHDRAW_ONLY_FROM_REFUND, DISABLE_DECIMAL_INPUT, OTPForceChannel, OTPAction, ANGBAO_BUNDLE, ANGBAO_MODULES, CAMERA_PAGE_TYPE, CAMERA_PAGE_FEATURE, CHANNEL_ITEM_TYPE, RPP_DIRECT_DEBIT_CHANNEL_ID, UNION_BANK_CHANNEL_ID, MerchantWhitelisting, UIPromotionTypeByVoucherType, UIPromotionTypeByCashbackType, PromotionStatus, BANK_VERIFICATION, MYINFO_AUTH_API_URL_ENV, MYINFO_CONFIG, MYINFO_LEARN_MORE_URL, WalletType, EVENT_TOPUP_FLOW, MitraEnvToValueMapping, SHOPEE_FOOD_ENV_ID_MAP, ShopeeMerchants, CROSS_BORDER_EXCHANGE_RATE_VALIDITY_DURATION_SECONDS, KYCMessageByCountry, REMITTANCE_CENTER_ENABLED, WITHDRAWAL_NEED_KYC_BY_LOCALE, WITHDRAWAL_NEED_KYC, VIRTUAL_CARD_ASPECT_RATIO, VIRTUAL_CARD_RADIUS_MULTIPLIER, countryByTransactionCurrency, TopupMergeByCountry, TOPUP_MERGE_MODULE, AIR_PAY_AUTH_DOMAIN, SEABANK_CHANNEL_ITEM_ID, SEABANK_DD_TOPUP_CHANNEL_CONFIG, SEABANK_DD_TOPUP_CHANNEL_ID, phoneMap, csWebFormMap, customerServicePhoneNumber, customerServiceWebForm;
var init_constants5 = __esm({
  "workspaces/modules/constants/src/constants.ts"() {
    import_crypto_js = __toESM(require_crypto_js());
    init_src12();
    init_constants3();
    init_src8();
    init_merchant_withdrawal_constants();
    init_promoVoucher();
    init_faqUrlByLocale();
    SHOPEEPAY_COUNTRIES = /* @__PURE__ */new Set(["ID", "MY", "PH", "SG", "TW", "BR"]);
    AIRPAY_COUNTRIES = /* @__PURE__ */new Set(["TH", "VN"]);
    IS_SG = LOCALE6 === "SG";
    IS_SHOPEEPAY_COUNTRY = SHOPEEPAY_COUNTRIES.has(LOCALE6);
    IS_AIRPAY_COUNTRY = AIRPAY_COUNTRIES.has(LOCALE6);
    SHOPEEPAY_PRE_LIVE = LOCALE6 === "TW" || LOCALE6 === "BR";
    IS_MY = LOCALE6 === "MY";
    IS_ID = LOCALE6 === "ID";
    PRETOPUP_COUNTRIES = /* @__PURE__ */new Set(["ID", "PH", "BR"]);
    IS_PRETOPUP_COUNTRY = PRETOPUP_COUNTRIES.has(LOCALE6);
    SEABANK_COUNTRIES = /* @__PURE__ */new Set(["ID", "PH"]);
    IS_SUPPORT_SEABANK_COUNTRY = SEABANK_COUNTRIES.has(LOCALE6);
    PACKAGE_NAME2 = "@shopee-rn/shopeepay";
    BUNDLE_NAME2 = "shopee";
    WalletError = __spreadValues({
      REQUEST_TIMEOUT: -99,
      TRAFFIC_JAM: -100,
      OFFLINE: -101,
      FINGERPRINT: -102,
      CSRFTOKEN: -103,
      UNHANDLED: -111,
      INTERNET: -101,
      // Pass through WWSA error as WS error, as we only have WS error
      // to check in a lot of places
      VERSION: -43,
      // WS may return error code -1, but RN need to distinguish the case
      // where WS doesn't return any error.
      NO_WALLET_ERROR: -42,
      // The API response data is rejected by FE, even though the call itself technically did not fail.
      REJECTED_BY_FE: -2,
      UNKNOWN: -1,
      OK: 0,
      PARAM: 1,
      PERM: 2,
      LIMIT: 3,
      NOTFOUND: 4,
      ACK: 5,
      EXPIRE: 7,
      AMOUNT_TOO_SMALL: 8,
      BANNED: 9,
      DUPLICATE: 11,
      NOT_AUTHENTICATED: 12,
      DELETED: 14,
      AMOUNT_OVERFLOW: 15,
      NOT_LOGIN: 19,
      USER_FROZEN: 24,
      ROOT_JAIL_BROKEN: 25,
      USER_ACCOUNT_NOT_ACTIVATED: 27,
      NOT_ENOUGH_BALANCE: 42,
      NOT_ENOUGH_BALANCE_CASHBACK_DISABLED: 43,
      BALANCE_LIMIT_KYC: 101,
      INFLOW_LIMIT: 102,
      DAILY_PAYMENT_LIMIT: 103,
      BALANCE_LIMIT_NON_KYC: 104,
      WRONG_OTP: 105,
      INVALID_DATA: 107,
      BANK_ACCOUNT_NUM_LIMIT: 110,
      BANK_ACCOUNT_DUPLICATE: 111,
      BANK_ACCOUNT_BANNED: 112,
      BANK_ACCOUNT_NAME_INVALID: 113,
      ANTI_FRAUD_COOLDOWN: 120,
      DEVICE_FINGERPRINT_MISMATCH: 122,
      OTP_CHANNEL_CONFIRMATION_NEEDED: 123,
      DEVICE_AND_CARD_UNTRUSTED: 124,
      APM_INIT_TRANSACTION_FRAUD_CHECK_ERROR: 125,
      EXCEED_VELOCITY_LIMIT: 126,
      ANTI_FRAUD_COOLDOWN_CHANGE_PIN_AFTER_NEW_DEVICE_LOGIN: 127,
      REMITTANCECENTER_ACCOUNT_NUM_LIMIT: 130,
      REMITTANCECENTER_ACCOUNT_DUPLICATE: 131,
      REMITTANCECENTER_ACCOUNT_BANNED: 132,
      THROUGHPUT_LIMIT_EXCEEDED: 140,
      ACCOUNT_LINKING_ALREADY_EXIST: 150,
      ACCOUNT_LINKING_DIFFERENT_ACCOUNT_DETECTED: 151,
      ACCOUNT_LINKING_ONGOING_AUTH: 152,
      TRANSFER_RECIPIENT_BANNED: 201,
      TRANSFER_RECIPIENT_FROZEN: 202,
      TRANSFER_AMOUNT_TOO_SMALL: 203,
      TRANSFER_AMOUNT_TOO_BIG: 204,
      TRANSFER_RECIPIENT_NOT_ACTIVATED: 205,
      TRANSFER_DUPLICATE_USERNAME: 206,
      TRANSFER_DUPLICATE_PHONE: 207,
      TRANSFER_SELF_ACCOUNT: 208,
      TRANSFER_RECIPIENT_DELETED: 209,
      TRANSFER_RECIPIENT_PHONE_INVALID: 210,
      TRANSFER_EXPIRED: 211,
      TRANSFER_RECIPIENT_USER_ID_INVALID: 212,
      TRANSFER_LOCATION_INVALID: 213,
      TRANSFER_RECEPIENT_BLACKLISTED: 214,
      INVALID_QRCODE: 301,
      SELF_PAYMENT: 303,
      MERCHANT_PAYMENT_EXPIRED: 304,
      INVALID_MERCHANT: 305,
      CANNOT_REFUND_VOUCHER: 308,
      MDR_BALANCE_NOT_ENOUGH_FOR_REFUND: 309,
      INVALID_MERCHANT_NAME: 310,
      KYC_INCOMPLETE: 311,
      INVALID_QRCODE_CATEGORY: 312,
      EXCHANGE_RATE_EXPIRED: 314,
      REFUND_AMOUNT_TOO_BIG: 401,
      RATE_LIMITER_ERROR: 429,
      MERCHANT_PAYMENT_TOKEN_INVALIDATED: 457,
      INVALID_PAYMENT_CHANNEL: 603,
      BSC_INVALID_VOUCHER: 604,
      BSC_INVALID_PAYMENT_CHANNEL_AND_VOUCHER: 605,
      THIRD_PARTY_TIMEOUT: 607,
      MERCHANT_OFFLINE: 608,
      LUCKY_DRAW_NOT_ALLOWED: 621,
      LUCKY_DRAW_DAILY_CHANCES_LEFT: 622,
      LUCKY_DRAW_WEEKLY_CHANCES_LEFT: 623,
      LUCKY_DRAW_USER_USER_CHANCES_LEFT: 624,
      PAYMENT_MODE_NOT_SUPPORT: 628,
      VALIDATE_ERROR_PUBLISHER_ID_NOT_MATCH: 629,
      // publisher not match
      VALIDATE_ERROR_SKU_ID_NOT_MATCH: 630,
      // sku not match
      NETS_NOT_HEALTH: 631,
      COIN_NOT_ENOUGH_BALANCE: 700,
      COIN_SPENDING_LIMIT: 701,
      COIN_MERCHANT_NOT_SUPPORTED: 702,
      COIN_REDEMPTION_ERROR: 703,
      COIN_AMOUNT_MISMATCH: 704,
      COIN_INVALID_STATUS: 706,
      CANNOT_CANCEL_TOPUP_PAYMENT_COMPLETE: 721,
      CANNOT_CANCEL_TOPUP_3RD_PARTY: 722,
      KYC_NOT_VERIFIED: 907,
      KYC_DUKCAPIL_FAIL: 913,
      USER_BLACKLISTED_TRANSACTION_TYPE: 1001,
      TRANSACTION_TYPE_MAINTENANCE: 1002,
      ERROR_ANTI_FRAUD_REJECT_TRANSACTION: 2001,
      CENTREPARK_INVALID_TICKET: 300001,
      AUTH_TOKEN_EXPIRED: 300002,
      INVALID_LOCATION: 300003,
      COIN_UNAVAILABLE_STATUS: 300004,
      COIN_NOT_ENOUGH_BALANCE_NEW: 300009,
      MERCHANT_STATUS_NOT_ACTIVE: 399994,
      TICKET_LINKING_GENERIC_ERROR: 99701,
      TICKET_LINKING_GENERIC_SERVER_ERROR: 99703,
      NOT_INCLUDE_TICKET_LINKING: 300012,
      SHOPEEPAY_BANNED: 300013,
      SHOPEEPAY_DELETED: 300014,
      SHOPEEPAY_LOCKED: 300015,
      COINS_NOT_SUPPORTED_BY_MERCHANT: 300018,
      SHOPEEPAY_NOT_ACTIVATED: 300030
    }, WithDrawalError);
    ShopeeWSAError = {
      NOT_LOGIN: 19,
      VERSION: 37
    };
    MERCHANT_TERMS_URL_BY_LOCALE = {
      ID: `https://shopeepay.co.id/terms/merchant?headlessMode=true&lang=${LANGUAGE4}`,
      MY: "https://shopee.com.my/docs/6939",
      SG: "https://shopee.sg/docs/6931",
      PH: "https://shopee.ph/docs/6974",
      TW: "",
      BR: ""
    };
    MERCHANT_TERMS_URL = MERCHANT_TERMS_URL_BY_LOCALE[LOCALE6];
    MERCHANT_PRIVACY_POLICY_BY_LOCALE = {
      ID: `https://shopeepay.co.id/terms?headlessMode=true&lang=${LANGUAGE4}`,
      MY: "https://shopee.com.my/docs/6898",
      SG: "https://shopee.sg/docs/6922",
      PH: "https://shopee.ph/docs/6908",
      TW: "",
      BR: ""
    };
    MERCHANT_PRIVACY_POLICY_URL = MERCHANT_PRIVACY_POLICY_BY_LOCALE[LOCALE6];
    MERCHANT_SHOPEE_HELP_CENTER_BY_LOCALE = {
      ID: "https://help.shopee.co.id/portal/article/72525-Merchant-ShopeePay?source=4&entry=100008",
      MY: "https://help.shopee.com.my/s/article/Shopee-Partner-Frequently-Asked-Questions",
      SG: "https://help.shopee.sg/sg/s/article/General-Enquiries-regarding-ShopeePay-Merchant",
      PH: "https://help.shopee.ph/s/article/ShopeePartner-More-info",
      TW: "",
      BR: ""
    };
    MERCHANT_SHOPEE_HELP_CENTER_URL = MERCHANT_SHOPEE_HELP_CENTER_BY_LOCALE[LOCALE6];
    MERCHANT_SIGNUP_URL_BY_LOCALE = {
      ID: "https://shopeepay.co.id/register",
      MY: "https://shopee.com.my/events3/code/255297437/",
      SG: "https://docs.google.com/forms/d/e/1FAIpQLSdnmJRR0Y66bEgxgbkiILLNk9ud-ZZr_HG_xFQ2lmp9rwSwyg/viewform",
      PH: "https://shopee.ph/shopeepartnerreg",
      TW: "",
      BR: ""
    };
    MERCHANT_SIGNUP_URL = MERCHANT_SIGNUP_URL_BY_LOCALE[LOCALE6];
    LEARN_MORE_URL_BY_LOCALE = {
      // ID: `https://mall.${SHOPEE_ROOT_DOMAIN}/help_center/answer/3969/`,
      ID: "https://shopee-help.force.com/s/topic/0TO6F000000Qv1RWAS/shopeepay",
      MY: "https://shopee.com.my/m/shopeepay",
      PH: "https://shopee.ph/events3/code/4069866269/",
      SG: "https://help.shopee.sg/sg/s/topic/0TO6F00000057YVWAY/shopeepay",
      TW: "",
      BR: ""
    };
    LEARN_MORE_URL = LEARN_MORE_URL_BY_LOCALE[LOCALE6];
    TERMS_URL_BY_LOCALE2 = {
      ID: `https://shopeepay.co.id/terms?headlessMode=true&lang=${LANGUAGE4}`,
      MY: "https://shopee.com.my/docs/6899",
      PH: "https://shopee.ph/docs/6907",
      SG: "https://shopee.sg/docs/6921",
      TW: "https://shopee.tw/docs/6956",
      BR: ""
    };
    TERMS_URL2 = TERMS_URL_BY_LOCALE2[LOCALE6];
    FAQ_URL2 = faqUrlByLocale_default[LOCALE6];
    AUTO_TOPUP_TERMS_URL_BY_LOCALE = {
      ID: "",
      MY: "https://shopee.com.my/docs/6899",
      PH: "",
      SG: "https://shopee.sg/docs/6921",
      TW: "",
      BR: ""
    };
    AUTO_TOPUP_TERMS_URL = AUTO_TOPUP_TERMS_URL_BY_LOCALE[LOCALE6];
    MERCHANT_HELP_CENTER_URL_BY_LOCALE = {
      ID: "https://help.shopee.co.id/s/article/Aplikasi-Merchant",
      MY: "https://help.shopee.com.my/my/s/article/ShopeePay-Offline-How-do-I-start-using-ShopeePay-for-my-retail-business",
      SG: "https://help.shopee.sg/sg/s/article/General-Enquiries-regarding-ShopeePay-Merchant",
      PH: "https://help.shopee.ph/s/article/ShopeePartner-More-info",
      TW: "",
      BR: ""
    };
    MERCHANT_HELP_CENTER_URL = MERCHANT_HELP_CENTER_URL_BY_LOCALE[LOCALE6];
    NEW_MERCHANT_HELP_CENTER_URL_BY_LOCALE = {
      ID: "https://help.shopee.co.id/portal?source=1",
      MY: "https://help.shopee.com.my/portal?source=1",
      SG: "https://help.shopee.sg/portal?source=1",
      PH: "https://help.shopee.ph/s/article/ShopeePartner-More-info",
      VN: "https://help.shopee.vn/portal?source=1",
      TH: "https://help.shopee.co.th/portal?source=1",
      TW: "",
      BR: "",
      MX: "",
      CO: "",
      CL: "",
      PL: "",
      ES: "",
      FR: "",
      IN: "",
      AR: ""
    };
    NEW_MERCHANT_HELP_CENTER_URL = NEW_MERCHANT_HELP_CENTER_URL_BY_LOCALE[LOCALE6];
    NON_KYC_BALANCE_BY_LOCALE = {
      ID: +parseServerNumber2(2e6),
      MY: +parseServerNumber2(2999),
      PH: +parseServerNumber2(5e4),
      SG: +parseServerNumber2(1e3),
      TW: +parseServerNumber2(0),
      BR: +parseServerNumber2(0)
    };
    NON_KYC_BALANCE = NON_KYC_BALANCE_BY_LOCALE[LOCALE6] || 0;
    NON_KYC_BALANCE_WARNING_BY_LOCALE = {
      ID: +parseServerNumber2(16e5),
      MY: +parseServerNumber2(2399),
      PH: +parseServerNumber2(4e4),
      SG: +parseServerNumber2(1e6),
      // not applicable now
      TW: +parseServerNumber2(0),
      BR: +parseServerNumber2(0)
    };
    NON_KYC_BALANCE_WARNING = NON_KYC_BALANCE_WARNING_BY_LOCALE[LOCALE6] || 0;
    KYC_BALANCE_BY_LOCALE = {
      ID: +parseServerNumber2(1e7),
      MY: +parseServerNumber2(4999),
      PH: +parseServerNumber2(1e5),
      SG: +parseServerNumber2(5e3),
      TW: +parseServerNumber2(0),
      BR: +parseServerNumber2(0)
    };
    KYC_BALANCE = KYC_BALANCE_BY_LOCALE[LOCALE6] || 0;
    TOPUP_THRESHOLD_BALANCE_BY_LOCALE = {
      ID: +parseServerNumber2(5e4),
      MY: +parseServerNumber2(0),
      PH: +parseServerNumber2(0),
      SG: +parseServerNumber2(0),
      TW: +parseServerNumber2(0),
      BR: +parseServerNumber2(0)
    };
    TOPUP_THRESHOLD_BALANCE = TOPUP_THRESHOLD_BALANCE_BY_LOCALE[LOCALE6] || 0;
    AutoTopupLimit = {
      MIN_THRESHOLD: {
        ID: 0,
        MY: +parseServerNumber2(10),
        PH: 0,
        SG: +parseServerNumber2(20),
        TW: 0,
        TH: +parseServerNumber2(100),
        VN: 0,
        BR: 0
      },
      MAX_THRESHOLD: {
        ID: 0,
        MY: +parseServerNumber2(100),
        PH: 0,
        SG: +parseServerNumber2(100),
        TW: 0,
        TH: +parseServerNumber2(2e4),
        VN: 0,
        BR: 0
      },
      MIN_AMOUNT: {
        ID: 0,
        MY: +parseServerNumber2(10),
        PH: 0,
        SG: +parseServerNumber2(25),
        TW: 0,
        TH: +parseServerNumber2(300),
        VN: 0,
        BR: 0
      },
      MAX_AMOUNT: {
        ID: 0,
        MY: +parseServerNumber2(400),
        PH: 0,
        SG: +parseServerNumber2(500),
        TW: 0,
        TH: +parseServerNumber2(45e3),
        VN: 0,
        BR: 0
      },
      CC_MIN_AMOUNT: {
        ID: 0,
        MY: +parseServerNumber2(100),
        PH: 0,
        SG: +parseServerNumber2(25),
        TW: 0,
        TH: +parseServerNumber2(300),
        VN: 0,
        BR: 0
      }
    };
    AUTO_TOPUP_LIMIT = {
      MIN_THRESHOLD: AutoTopupLimit.MIN_THRESHOLD[LOCALE6] || 0,
      MAX_THRESHOLD: AutoTopupLimit.MAX_THRESHOLD[LOCALE6] || 0,
      MIN_AMOUNT: AutoTopupLimit.MIN_AMOUNT[LOCALE6] || 0,
      MAX_AMOUNT: AutoTopupLimit.MAX_AMOUNT[LOCALE6] || 0,
      CC_MIN_AMOUNT: AutoTopupLimit.CC_MIN_AMOUNT[LOCALE6] || 0
    };
    EntranceByCountry = {
      ID: "@shopee-rn/shopeepay/HOME",
      MY: "@shopee-rn/shopeepay/HOME",
      PH: "@shopee-rn/shopeepay/HOME",
      SG: "@shopee-rn/shopeepay/HOME",
      TH: "@shopee-rn/shopeepay/WALLET_TH",
      VN: "@shopee-rn/shopeepay/WALLET_VN",
      TW: "@shopee-rn/shopeepay/HOME",
      BR: "@shopee-rn/shopeepay/HOME"
    };
    SHOPEEPAY_HOME_MODULE = EntranceByCountry[LOCALE6] || EntranceByCountry.ID;
    PostLoginByCountry = {
      ID: "@shopee-rn/shopeepay/SHOPEEPAY_FLOW_SETUP",
      MY: "@shopee-rn/shopeepay/SHOPEEPAY_FLOW_SETUP",
      PH: "@shopee-rn/shopeepay/SHOPEEPAY_FLOW_SETUP",
      SG: "@shopee-rn/shopeepay/SHOPEEPAY_FLOW_SETUP",
      TW: "@shopee-rn/shopeepay/HOME",
      BR: `@shopee-rn/shopeepay/SHOPEEPAY_FLOW_SETUP`
    };
    MODULES2 = {
      TRANSACTION_HISTORY_DETAIL: "TRANSACTION_HISTORY_DETAIL",
      TRANSACTION_HISTORY_LIST: "TRANSACTION_HISTORY_LIST",
      PAYMENT_SAFEPAGE_LOADING: "PAYMENT_SAFEPAGE_LOADING",
      PAYMENT_RN_ROUTER: "PAYMENT_RN_ROUTER",
      RN_SAFE_PAGE: "RN_SAFE_PAGE",
      RN_ADD_CARD_PAGE: "RN_ADD_CARD_PAGE",
      RN_FIXED_VA_PAGE: "RN_FIXED_VA_PAGE",
      RN_CHANNEL_ACTION_PAGE: "RN_CHANNEL_ACTION_PAGE",
      RN_POST_PAGE: "RN_POST_PAGE",
      SETTINGS: "SETTINGS",
      SETTINGS_HELP: "SETTINGS_HELP",
      CHAT_TRANSFER_PAGE: "CHAT_TRANSFER_PAGE",
      WITHDRAWAL: "WITHDRAWAL",
      WITHDRAWAL_BANK_ACCOUNT_LIST: "WITHDRAWAL_BANK_ACCOUNT_LIST",
      WITHDRAWAL_CONFIRM: "WITHDRAWAL_CONFIRM",
      WITHDRAWAL_TRANSFER_CONFIRM: "WITHDRAWAL_TRANSFER_CONFIRM",
      SEABANK_REDIRECTOR: "SEABANK_REDIRECTOR",
      MERGE_SEABANK_REDIRECTOR: "MERGE_SEABANK_REDIRECTOR",
      SEABANK_GRAY_REDIRECTOR: "SEABANK_GRAY_REDIRECTOR",
      SG: {
        KYC_SELECTION: "SG_KYC_SELECTION"
      },
      WALLET_TW: {
        KYC: "TW_KYC",
        KYC_SELECTION: "TW_KYC_SELECTION",
        KYC_SUCCESS: "TW_KYC_SUCCESS",
        KYC_BUSINESS: "TW_KYC_BUSINESS"
      },
      KYC_CONFIRM: "KYC_CONFIRM",
      KYC_FILE_UPLOAD_DRAWER: "KYC_FILE_UPLOAD_DRAWER",
      KYC_INFO_UPDATE: "KYC_INFO_UPDATE",
      PIN: "PIN",
      OTP: "OTP",
      PEP_SELECTION: "PEP_SELECTION",
      MERCHANT_HOME: "MERCHANT_HOME",
      MERCHANT_PAYMENT_PROCESSING: "MERCHANT_PAYMENT_PROCESSING",
      MERCHANT_STORE_LIST: "MERCHANT_STORE_LIST",
      MERCHANT_SETTINGS: "MERCHANT_SETTINGS",
      INTERMEDIATE_POPPER: "INTERMEDIATE_POPPER",
      MERCHANT_BUSY_SETTING_DRAWER: "MERCHANT_BUSY_SETTING_DRAWER",
      SUBSCRIPTION: {
        LIST: "SUBSCRIPTION_LIST",
        DETAIL: "SUBSCRIPTION_DETAIL"
      },
      TOPUP: {
        PAYMENT_SELECTION_ID: "TOPUP_PAYMENT_SELECTION_ID",
        PAYMENT_SELECTION: "TOPUP_PAYMENT_SELECTION",
        REDIRECTOR: "TOPUP_REDIRECTOR",
        MAIN: "TOPUP_MAIN",
        AUTO_DETAIL: "TOPUP_AUTO_DETAIL",
        AUTO_EDIT: "TOPUP_AUTO_EDIT",
        AUTO_CC_PICKER: "TOPUP_AUTO_CC_PICKER",
        TOPUP_QR: "TOPUP_QR"
      },
      TOPUP_MERGE: {
        PRE_PAYMENT_SELECTION: "MERGE_TOPUP_PRE_PAYMENT_SELECTION",
        PAYMENT_SELECTION: "MERGE_TOPUP_PAYMENT_SELECTION",
        REDIRECTOR: "MERGE_TOPUP_REDIRECTOR",
        MAIN: "MERGE_TOPUP_MAIN",
        AUTO_EDIT: "MERGE_TOPUP_AUTO_EDIT",
        AUTO_CC_PICKER: "MERGE_TOPUP_AUTO_CC_PICKER",
        TOPUP_QR: "MERGE_TOPUP_QR"
      },
      MERGE_MERCHANT: {
        REFUND_REFUND_PAYMENT: "MERGE_MERCHANT_REFUND_REFUND_PAYMENT"
      },
      MERGE_TOPUP_UNIVERSAL_LINK_REDIRECTOR: "MERGE_TOPUP_UNIVERSAL_LINK_REDIRECTOR",
      EXTERNAL_TRANSFER_REDIRECTOR: "EXTERNAL_TRANSFER_REDIRECTOR",
      MERGE_TRANSFER_SELECTION: "MERGE_TRANSFER_SELECTION",
      MERGE_TRANSFER_CONTACT_LIST: "MERGE_TRANSFER_CONTACT_LIST",
      MERGE_TRANSFER_CREATE: "MERGE_TRANSFER_CREATE",
      MERGE_TRANSFER_CONFIRM: "MERGE_TRANSFER_CONFIRM",
      TRANSFER_VERIFY_RECEIVER: "TRANSFER_VERIFY_RECEIVER",
      MERGE_VIRTUAL_CARD_LIST: "MERGE_VIRTUAL_CARD_LIST",
      MERGE_ORDER_SUCCESS: "MERGE_ORDER_SUCCESS",
      WALLET_ORDER_RESULT: "WALLET_ORDER_RESULT",
      MERGE_TRANSFER_REDIRECTOR: "MERGE_TRANSFER_REDIRECTOR",
      MERGE_BALANCE_OVERVIEW: "MERGE_BALANCE_OVERVIEW",
      MERGE_TRANSFERABLE_FUNDS_NOTICE: "MERGE_TRANSFERABLE_FUNDS_NOTICE",
      QR_REDIRECTOR: "QR_REDIRECTOR",
      WALLET_RFTP_PAGE: "WALLET_RFTP_PAGE",
      TRANSFER_CHANNELS_DRAWER: "TRANSFER_CHANNELS_DRAWER",
      ANGBAO: {
        ANGBAO_CREATE: "ANGBAO_CREATE",
        ANGBAO_CONFIRM: "ANGBAO_CONFIRM",
        ANGBAO_SUCCESS: "ANGBAO_SUCCESS",
        ANGBAO_DETAIL: "ANGBAO_DETAIL",
        ANGBAO_LEADER_BOARD: "ANGBAO_LEADER_BOARD"
      },
      MERGE_WITHDRAWAL_ACCOUNT: "MERGE_WITHDRAWAL_ACCOUNT",
      MERGE_SAVED_ACCOUNTS: "MERGE_SAVED_ACCOUNTS",
      MERGE_WITHDRAWAL_TICKET_CREATE: "MERGE_WITHDRAWAL_TICKET_CREATE",
      MERGE_WITHDRAWAL_PURPOSE_SELECT: "MERGE_WITHDRAWAL_PURPOSE_SELECT",
      MERGE_WITHDRAWAL_REDIRECTOR: "MERGE_WITHDRAWAL_REDIRECTOR",
      MERGE_TRANSFER_QR: "MERGE_TRANSFER_QR",
      MERGE_TRANSFER_QR_AMOUNT: "MERGE_TRANSFER_QR_AMOUNT",
      TRANSFER_QR: "TRANSFER_QR",
      TRANSFER_CONTACT_LIST: "TRANSFER_CONTACT_LIST",
      TRANSFER_HOME: "TRANSFER_HOME",
      TRANSFER_CREATE: "TRANSFER_CREATE",
      TRANSFER_CREATE_CSCANB: "TRANSFER_CREATE_CSCANB",
      TICKET_LINKING_CENTREPARK: "TICKET_LINKING_CENTREPARK",
      TICKET_LINKING_CENTREPARK_MERGE: "TICKET_LINKING_CENTREPARK_MERGE",
      TICKET_LINKING_SUCCESS_MERGE: "TICKET_LINKING_SUCCESS_MERGE",
      TRANSFER_PAYMENT_SELECTION: "TRANSFER_PAYMENT_SELECTION",
      TRANSFER_PAYMENT_SELECTION_CSCANB: "TRANSFER_PAYMENT_SELECTION_CSCANB",
      TRANSFER_CONFIRM: "TRANSFER_CONFIRM",
      VIRTUAL_CARD_LIST: "VIRTUAL_CARD_LIST",
      TRANSFER_SELECTION: "TRANSFER_SELECTION",
      TRANSFER_ADD_RECIPIENT: "TRANSFER_ADD_RECIPIENT",
      TRANSFER_SAVED_RECIPIENTS_LIST: "TRANSFER_SAVED_RECIPIENTS_LIST",
      VOUCHER_PICKER: "VOUCHER_PICKER",
      VOUCHER_PICKER_MERGED: "VOUCHER_PICKER_MERGED",
      GOOGLE_PLAY_AUTHENTICATION: "GOOGLE_PLAY_AUTHENTICATION",
      ACCOUNT_LINKING_MERGE: "ACCOUNT_LINKING_MERGE",
      ACCOUNT_PRE_LINKING_PAGE: "ACCOUNT_PRE_LINKING_PAGE",
      LINKED_ACCOUNTS: "LINKED_ACCOUNTS",
      LINKED_ACCOUNTS_DETAIL: "LINKED_ACCOUNTS_DETAIL",
      CAMERA_PAGE: "CAMERA_PAGE",
      SHOPEEPAY_CAMERA: "@shopee-rn/shopeepay/SHOPEEPAY_CAMERA",
      BIOMETRIC_SETUP: "BIOMETRIC_SETUP",
      TRANSACTION_DETAIL: "TRANSACTION_DETAIL",
      SCRATCH_CARD: "SCRATCH_CARD",
      PROMO_COIN_LIST: "PROMO_COIN_LIST",
      SAFE_PAGE: "SAFE_PAGE",
      SORT_PAGE: "SORT_PAGE",
      DUITNOW_PROXY_SETTING: "DUITNOW_PROXY_SETTING",
      SEND_VIA_PAYNOW: "SEND_VIA_PAYNOW",
      BANK_ACCOUNTS_AND_CARDS_DETAIL_REDIRECTOR: "BANK_ACCOUNTS_AND_CARDS_DETAIL_REDIRECTOR",
      SEND_VIA_BI_FAST: "SEND_VIA_BI_FAST",
      FAVORITE_SECTION_LIST_PAGE: "FAVORITE_SECTION_LIST_PAGE",
      TRANSACTION_SUCCESS: "TRANSACTION_SUCCESS",
      WALLET_TRANSACTION_REDIRECTION: "WALLET_TRANSACTION_REDIRECTION",
      TRANSACTION_SUCCESS_MERGE: "TRANSACTION_SUCCESS_MERGE",
      SMART_RESULT_PAGE: "SMART_RESULT_PAGE",
      LINK_PAGE: "LINK_PAGE",
      PAYMENT_EASY_CHECKOUT: "PAYMENT_EASY_CHECKOUT",
      CASH_IN: {
        CONFIRM: "CASH_IN_CONFIRM",
        MERCHANT_LIST: "CASH_IN_MERCHANT_LIST"
      },
      CONFIRM_CASH_TOPUP: "CONFIRM_CASH_TOPUP",
      TRANSPARENT_QR_HANDLER: "TRANSPARENT_QR_HANDLER",
      HOME: "HOME",
      QRIS_TRANSFER: {
        TRANSFER_QR: "QRIS_TRANSFER_QR",
        INPUT_AMOUNT: "QRIS_INPUT_AMOUNT"
      },
      WALLET_ID: {
        TV_SHOW: "TV_SHOW"
      },
      WALLET_MY: {
        E_BELIA: "E_BELIA",
        E_START: "E_START",
        PETROL_SUBSIDY: "PETROL_SUBSIDY"
      },
      USER_APP: {
        ME: "USER_APP_ME",
        TRANSACTION_HISTORY: "USER_APP_TRANSACTION_HISTORY",
        PROFILE_PAGE: "USER_APP_PROFILE_PAGE",
        UPDATE_PROFILE_PAGE: "USER_APP_UPDATE_PROFILE_PAGE",
        MY_TICKET_PAGE: "USER_APP_MY_TICKET_PAGE",
        MY_COIN_PAGE: "USER_APP_MY_COIN_PAGE",
        COIN_EXPIRY_PAGE: "USER_APP_COIN_EXPIRY_PAGE"
      },
      MERGE_MERCHANT_WITHDRAWAL_AMOUNT_PAGE: "MERGE_MERCHANT_WITHDRAWAL_AMOUNT_PAGE",
      MERGE_MERCHANT_WITHDRAWAL_CONFIRM_PAGE: "MERGE_MERCHANT_WITHDRAWAL_CONFIRM_PAGE",
      BANK_ACCOUNTS_AND_CARDS_MERGE: {
        ADD_USER_INFORMATION_MERGE: "BANK_ACCOUNTS_AND_CARDS_ADD_USER_INFORMATION_MERGE",
        ADD_BANK_ACCOUNT_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_ADD_BANK_ACCOUNT_MERGE",
        CONFIRM_BANK_ACCOUNT_MERGE: "BANK_ACCOUNTS_AND_CARDS_CONFIRM_BANK_ACCOUNT_MERGE",
        ADD_BANK_ACCOUNT_COMPLETE_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_ADD_BANK_ACCOUNT_COMPLETE_MERGE",
        HOME_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_HOME_MERGE",
        DETAIL_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_DETAIL_MERGE",
        DELETE_COMPLETE_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_DELETE_COMPLETE_MERGE",
        SPBA_OTP_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_SPBA_OTP_MERGE",
        ADD_BILLING_ADDRESS_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_ADD_BILLING_ADDRESS_MERGE",
        LINKED_ACCOUNT_BANK_LIST_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_LINKED_ACCOUNT_BANK_LIST_MERGE",
        CONFIRM_LINKED_ACCOUNT_MERGE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_CONFIRM_LINKED_ACCOUNT_MERGE",
        TRANSFER_TO_BANK_ACCOUNT_MERGE: "BANK_ACCOUNTS_AND_CARDS_TRANSFER_TO_BANK_ACCOUNT_MERGE",
        TRANSFER_TO_REMITTANCE_CENTER_MERGE: "BANK_ACCOUNTS_AND_CARDS_TRANSFER_TO_REMITTANCE_CENTER_MERGE",
        TRANSFER_TO_E_WALLET_MERGE: "BANK_ACCOUNTS_AND_CARDS_TRANSFER_TO_E_WALLET_MERGE",
        DUITNOW_PROXY_SETTING_MERGE: "BANK_ACCOUNTS_AND_CARDS_DUITNOW_PROXY_SETTING_MERGE",
        SEND_VIA_DUITNOW_MERGE: "BANK_ACCOUNTS_AND_CARDS_SEND_VIA_DUITNOW_MERGE",
        SET_DEFAULT_BANK_ACCOUNT_REDIRECTOR: "BANK_ACCOUNTS_AND_CARDS_SET_DEFAULT_BANK_ACCOUNT_REDIRECTOR"
      },
      MIGRATED: {
        USER: {
          WALLET_PURPOSE_OF_USE: "WALLET_AIRPAY_PURPOSE_OF_USE"
        },
        CELLPHONE_LOAN: "CELLPHONE_LOAN",
        CELLPHONE_LOAN_QR_CODE: "CELLPHONE_LOAN_QR_CODE",
        WALLET_SHOPEE_MERGE_B_SCAN_C_PAGE_MERGE: "WALLET_SHOPEE_MERGE_B_SCAN_C_PAGE_MERGE"
      },
      // NOTE: when running on mitra some of the names are different some pages need
      // to be copied to packages/mitra and for historical reasons. When not running on mitra,
      // we use the name that will redirect to the corresponding pages in Shopee host.
      UNMIGRATED: {
        ACCOUNT: {
          PHONE: Application6.clientName === "MITRA" ? "@shopee-rn/shopeepay/ACCOUNT_PHONE" : "ACCOUNT_PHONE",
          VERIFY_PASSWORD: Application6.clientName === "MITRA" ? "@shopee-rn/shopeepay/VERIFY_PASSWORD" : "VERIFY_PASSWORD"
        },
        PIN_INPUT: Application6.clientName === "MITRA" ? "@shopee-rn/shopeepay/PIN_INPUT" : "@shopee-rn/shopeepay/WALLET_SHOPEE_PIN_INPUT",
        FULLSCREEN_DIALOG: "@shopee-rn/shopeepay/WALLET_SHOPEE_FULLSCREEN_DIALOG",
        TRANSACTION_LIST: "@shopee-rn/shopeepay/WALLET_SHOPEE_WALLET_TRANSACTION_LIST",
        ADDRESS_SELECTION: "ADDRESS_SELECTION",
        PICKER_SELECTION_PAGE: "@shopee-rn/shopeepay/PICKER_SELECTION_PAGE",
        CAMERA_PAGE: Application6.clientName === "SHOPEE" ? Application6.appVersion >= 29300 ? "@shopee-rn/shopeepay/SHOPEEPAY_CAMERA" : "CAMERA_PAGE" : Number(Application6.appType) === AppType.ShopeePayUser ? "@shopee-rn/shopeepay/SHOPEEPAY_CAMERA" : "@shopee-rn/shopeepay/CAMERA_PAGE_INTERNAL",
        BIOMETRIC: "@shopee-rn/shopeepay/WALLET_SHOPEE_BIOMETRIC",
        BANK_ACCOUNTS_AND_CARDS: {
          HOME: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_HOME",
          ADD_USER_INFORMATION: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_ADD_USER_INFORMATION",
          ADD_BANK_ACCOUNT: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_ADD_BANK_ACCOUNT",
          ADD_BANK_ACCOUNT_COMPLETE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_ADD_BANK_ACCOUNT_COMPLETE",
          DELETE_COMPLETE: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_DELETE_COMPLETE",
          DETAIL: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_DETAIL",
          LINKED_ACCOUNT_BANK_LIST: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_LINKED_ACCOUNT_BANK_LIST",
          CONFIRM_LINKED_ACCOUNT: "@shopee-rn/shopeepay/BANK_ACCOUNTS_AND_CARDS_CONFIRM_LINKED_ACCOUNT",
          TRANSFER_TO_BANK_ACCOUNT: "BANK_ACCOUNTS_AND_CARDS_TRANSFER_TO_BANK_ACCOUNT",
          TRANSFER_TO_REMITTANCE_CENTER: "BANK_ACCOUNTS_AND_CARDS_TRANSFER_TO_REMITTANCE_CENTER",
          TRANSFER_TO_E_WALLET: "BANK_ACCOUNTS_AND_CARDS_TRANSFER_TO_E_WALLET"
        },
        MERCHANT_TRANSACTION_LIST: "@shopee-rn/shopeepay/WALLET_SHOPEE_MERCHANT_TRANSACTION_LIST",
        MERCHANT_DYNAMIC_INPUT: "@shopee-rn/shopeepay/WALLET_SHOPEE_MERCHANT_DYNAMIC_INPUT",
        WALLET: "@shopee-rn/shopeepay/WALLET",
        WALLET_ID: {
          WALLET_KYC: "@shopee-rn/shopeepay/WALLET_ID_WALLET_KYC"
        },
        WALLET_MY: {
          WALLET_ADVANCED_KYC: "@shopee-rn/shopeepay/WALLET_MY_WALLET_ADVANCED_KYC"
        },
        WALLET_PH: {
          WALLET_ADVANCED_KYC: "@shopee-rn/shopeepay/WALLET_PH_WALLET_ADVANCED_KYC"
        },
        WALLET_SHOPEE: {
          B_SCAN_C_PAGE: "@shopee-rn/shopeepay/WALLET_SHOPEE_B_SCAN_C_PAGE",
          WALLET_SETUP: "@shopee-rn/shopeepay/WALLET_SHOPEE_WALLET_SETUP"
        },
        WALLET_SHOPEE_MERGE: {
          B_SCAN_C_PAGE_MERGE: "@shopee-rn/shopeepay/WALLET_SHOPEE_MERGE_B_SCAN_C_PAGE_MERGE"
        },
        WALLET_AIRPAY: {
          WALLET_SETTINGS: "@shopee-rn/shopeepay/WALLET_AIRPAY_WALLET_SETTINGS",
          WALLET_AIRPAY_BIOMETRIC_LINKING: "@shopee-rn/shopeepay/WALLET_AIRPAY_BIOMETRIC_LINKING",
          AUTH_PAY_QR_HANDLER: "@shopee-rn/shopeepay/AUTH_PAY_QR_HANDLER",
          QR_PAYMENT: "@shopee-rn/shopeepay/WALLET_AIRPAY_QR_PAYMENT"
        }
      },
      VOUCHER_DETAIL_PAGE: "VOUCHER_DETAIL_PAGE",
      VOUCHER_WALLET: {
        TERMS_AND_CONDITIONS: "VOUCHER_WALLET_TERMS_AND_CONDITIONS"
      },
      FRONTEND_TRACING: "FRONTEND_TRACING",
      APPLE_DRS: "APPLE_DRS"
    };
    MAIN_BUNDLE_NAME = "shopee";
    AdvancedKYCByCountry = {
      ID: MODULES2.UNMIGRATED.WALLET_ID.WALLET_KYC,
      MY: MODULES2.UNMIGRATED.WALLET_MY.WALLET_ADVANCED_KYC,
      PH: MODULES2.UNMIGRATED.WALLET_PH.WALLET_ADVANCED_KYC,
      // Have to manually specify, if I import PACKAGE_NAME it'll crash
      SG: `@shopee-rn/shopeepay/${MODULES2.SG.KYC_SELECTION}`,
      TW: `@shopee-rn/shopeepay/${MODULES2.WALLET_TW.KYC_SELECTION}`,
      BR: ""
    };
    ADVANCED_KYC_MODULE = AdvancedKYCByCountry[LOCALE6];
    MergedAdvancedKYCByCountry = {
      ID: `@shopee-rn/shopeepay/${MODULES.UNIFIED_WALLET_KYC.KYC_BOX}`,
      MY: `@shopee-rn/shopeepay/${MODULES.UNIFIED_WALLET_KYC.KYC_BOX}`,
      PH: `@shopee-rn/shopeepay/${MODULES.UNIFIED_WALLET_KYC.KYC_BOX}`,
      SG: `@shopee-rn/shopeepay/${MODULES.UNIFIED_WALLET_KYC.KYC_BOX}`,
      TW: `@shopee-rn/shopeepay/${MODULES2.WALLET_TW.KYC_SELECTION}`,
      BR: `@shopee-rn/shopeepay/${MODULES.UNIFIED_WALLET_KYC.KYC_BOX}`
    };
    TopupByCountry = {
      ID: MODULES2.TOPUP.REDIRECTOR,
      MY: MODULES2.TOPUP.MAIN,
      PH: MODULES2.TOPUP.REDIRECTOR,
      SG: MODULES2.TOPUP.REDIRECTOR,
      TW: MODULES2.TOPUP.MAIN,
      BR: MODULES2.TOPUP.MAIN,
      // legacy th vn topup, go to amount page first
      TH: "WALLET_AIRPAY_WALLET_TOPUP",
      VN: "WALLET_AIRPAY_WALLET_TOPUP"
    };
    TOPUP_MODULE = TopupByCountry[LOCALE6];
    CURRENT_TERMS_VERSION = 1;
    MergeDepositAndRefundEnabledByCountry = {
      ID: true,
      MY: true,
      PH: true,
      // should be false when non_kyc_withdrawal toggle is removed
      SG: false,
      TW: true,
      BR: true
    };
    MERGE_DEPOSIT_AND_REFUND_ENABLED = MergeDepositAndRefundEnabledByCountry[LOCALE6];
    CrossBorderTransactionCountriesByLocale = {
      ID: ["MY"],
      MY: [],
      PH: [],
      SG: [],
      TW: [],
      BR: []
    };
    CROSS_BORDER_TRANSACTION_COUNTRIES = CrossBorderTransactionCountriesByLocale[LOCALE6];
    transactionCurrencyByCountry = {
      ID: "360",
      MY: "458",
      PH: "608",
      SG: "702",
      TW: "",
      BR: ""
    };
    TransactionType = {
      TOPUP: 1,
      WITHDRAWAL: 2,
      PAYMENT: 3,
      REFUND: 4,
      REFUND_EXT: 5,
      FINANCE_FUNDING: 6,
      CASHBACK: 7,
      ADJUSTMENT_ADD: 8,
      ADJUSTMENT_DEDUCT: 9,
      TRANSFER_SEND: 10,
      TRANSFER_RECEIVE: 11,
      MERCHANT_PAYMENT: 12,
      PAYMENT_RECEIVED: 13,
      MERCHANT_REFUND: 14,
      MERCHANT_REFUND_PAYOUT: 15,
      CASHBACK_ROLLBACK: 16,
      SETTLEMENT_SENT: 20,
      SETTLEMENT_RECEIVED: 21,
      MERCHANT_VOID: 25,
      MERCHANT_ADJUSTMENT_ADD: 32,
      MERCHANT_ADJUSTMENT_DEDUCT: 33,
      SELLER_PAYOUT_RECEIVED: 40,
      // seller withdrawal to shopeepay
      COMMISSION: 41,
      EXT_TRANSFER_SEND: 42,
      EXT_TRANSFER_RECEIVE: 43,
      E_START_CASHBACK: 55,
      ANGBAO_SEND: 56,
      ANGBAO_RECEIVE: 57,
      ANGBAO_RUFUND: 58
    };
    TransactionListType = {
      ALL: 1,
      MONEY_IN: 2,
      MONEY_OUT: 3
    };
    TransferInitVia = {
      USERNAME: 1,
      PHONE: 2,
      CHAT: 3,
      ANGBAO: 4,
      NATIVE_CONTACT: 5,
      QRIS_TRANSFER: 6,
      RECENT_TRANSFER: 7
    };
    TransferTrackingTypeByInitVia = {
      [TransferInitVia.USERNAME]: "transfer",
      [TransferInitVia.PHONE]: "transfer",
      [TransferInitVia.NATIVE_CONTACT]: "transfer",
      [TransferInitVia.RECENT_TRANSFER]: "transfer",
      [TransferInitVia.CHAT]: "transfer_in_chat",
      [TransferInitVia.ANGBAO]: "angbao_transfer"
    };
    KYCRecordStatus = {
      KYC_RECORD_NONE: 0,
      KYC_RECORD_IMPORT: 1,
      KYC_RECORD_PENDING: 2,
      KYC_RECORD_PASS: 3,
      KYC_RECORD_FAIL: 4,
      KYC_RECORD_PENDING_CALL: 5,
      KYC_RECORD_DELETED: 6
    };
    KYCType = {
      NO_KYC: 0,
      KYC_INIDIVIDUAL: 1,
      KYC_MERCHANT: 2,
      KYC_PARTIAL: 3
    };
    TRANSFER_NEED_KYC_BY_LOCALE = {
      ID: true,
      MY: true,
      PH: true,
      SG: false,
      TW: true,
      BR: true
    };
    TRANSFER_NEED_KYC = !!TRANSFER_NEED_KYC_BY_LOCALE[LOCALE6];
    UserStatus = {
      USER_OK: 0,
      USER_BANNED: 1,
      USER_FROZEN: 2,
      USER_DELETED: 3,
      USER_BANNED_BY_HOST: 4
    };
    FullScreenDialogTypeByUserStatus = {
      [UserStatus.USER_FROZEN]: "USER_FROZEN" /* USER_FROZEN */,
      [UserStatus.USER_BANNED]: "USER_BANNED" /* USER_BANNED */,
      [UserStatus.USER_DELETED]: "USER_DELETED" /* USER_DELETED */,
      [UserStatus.USER_BANNED_BY_HOST]: "USER_BANNED" /* USER_BANNED */
    };

    WITHDRAW_ONLY_FROM_REFUND = LOCALE6 === "SG";
    DISABLE_DECIMAL_INPUT = LOCALE6 === "PH";
    OTPForceChannel = {
      SMS: 1,
      WHATSAPP: 2
    };
    OTPAction = {
      NONE: 0,
      PIN_UPDATE: 1,
      TRX_WITHDRAW: 2,
      BANK_ADD: 3,
      BANK_DELETE: 4,
      ACCOUNT_ACTIVATE: 5,
      BIND_DEVICE: 6,
      REMITTANCE_CENTER_ACCOUNT_ADD: 7,
      REMITTANCE_CENTER_ACCOUNT_DEL: 8,
      PAYMENT: 9,
      TRANSFER: 10,
      MERCHANT_PIN_UPDATE: 11,
      MERCHANT_BANK_ACCOUNT_ADD: 12,
      MERCHANT_BANK_ACCOUNT_DEL: 13
    };
    ANGBAO_BUNDLE = "@shopee-rn/friends";
    ANGBAO_MODULES = {
      ANGPAO_TRANSFER: "ANGPAO_TRANSFER",
      ANGPAO_DETAIL: "ANGPAO_DETAIL"
    };
    CAMERA_PAGE_TYPE = {
      IMAGE_SEARCH: "IMAGE_SEARCH",
      QR_ONLY: "QR_ONLY",
      KYC_CAMERA: "KYC_CAMERA",
      QR_TOPUP: "QR_TOPUP",
      QRCODE_SCANNER: "QRCODE_SCANNER"
    };
    CAMERA_PAGE_FEATURE = {
      IMAGE_SEARCH: "IMAGE_SEARCH",
      QRCODE_SCANNER: "QRCODE_SCANNER",
      BSC_PAGE: "BSC_PAGE",
      KYC_CAMERA: "KYC_CAMERA",
      QR_TOPUP_PAGE: "QR_TOPUP_PAGE"
    };
    CHANNEL_ITEM_TYPE = {
      CREDIT_CARD: 1,
      LINKED_BANK_ACCOUNT: 2,
      BPI_GIRO: 5
    };
    RPP_DIRECT_DEBIT_CHANNEL_ID = 2008400;
    UNION_BANK_CHANNEL_ID = 4008800;
    MerchantWhitelisting = {
      WHITELISTED: 1,
      NON_WHITELISTED: 2
    };
    UIPromotionTypeByVoucherType = {
      [4 /* PREPAID_COIN_CASHBACK */]: "voucherCoinCashback" /* voucherCoinCashback */,
      [3 /* PREPAID_CASHBACK */]: "voucherCashback" /* voucherCashback */,
      [5 /* PREPAID_DISCOUNT */]: "voucherDiscount" /* voucherDiscount */
    };

    UIPromotionTypeByCashbackType = {
      [1 /* Cashback */]: "shopeePayCashback" /* shopeePayCashback */,
      [2 /* CoinCashback */]: "shopeePayCoinCashback" /* shopeePayCoinCashback */
    };

    PromotionStatus = {
      SUCCESSFUL: 1,
      PENDING: 2,
      BLOCKED: 3,
      FAILED: 4
    };
    BANK_VERIFICATION = {
      VERIFIED: 0,
      NO_ACCOUNT: 1,
      NO_VERIFIED_ACCOUNT: 2
    };
    MYINFO_AUTH_API_URL_ENV = ENV3 === "live" ? "" : "test.";
    MYINFO_CONFIG = {
      auth_api_url: `https://${MYINFO_AUTH_API_URL_ENV}api.myinfo.gov.sg/com/v3/authorise`,
      client_id: import_crypto_js.default.enc.Utf8.stringify(import_crypto_js.default.enc.Base64.parse(ENV3 === "live" ? "UFJPRC0yMDE5Mjk4MTNDLVNIT1BFRS1WRVJJRlk=" : "U1RHLTIwMTkyOTgxM0MtU0hPUEVFLVZFUklGWQ==")),
      attributes: "uinfin,name,dob,nationality,regadd,residentialstatus,sex,passexpirydate,passtype,aliasname",
      purpose: "verifying your identity:",
      redirect_uri: `https://${SHOPEE_ROOT_DOMAIN}/payment/kyc/myinfo_callback`
    };
    MYINFO_LEARN_MORE_URL = "https://www.tech.gov.sg/products-and-services/singpass/";
    WalletType = {
      SYSTEM_POOL: 1,
      MERCHANT_CASHBACK: 2,
      MERCHANT_ADJUSTMENT: 3,
      INDIVIDUAL_MAIN: 4,
      INDIVIDUAL_CASHBACK: 5,
      INDIVIDUAL_REFUND: 6,
      INDIVIDUAL_INCOMING: 7,
      INDIVIDUAL_OUTGOING: 8,
      SYSTEM_FEE: 9
    };
    EVENT_TOPUP_FLOW = "eventTopupFlow";
    MitraEnvToValueMapping = {
      live: 8,
      staging: 8,
      uat: 45,
      test: 56
    };
    SHOPEE_FOOD_ENV_ID_MAP = {
      uat: 220,
      test: 220,
      staging: 22,
      live: 22
    };
    ShopeeMerchants = {
      SHOPEE: 2,
      DIGITAL_PURCHASE: 3,
      SHOPEE_KREDIT: 4,
      SHOPEE_MITRA: MitraEnvToValueMapping[ENV3] || -1,
      SHOPEE_FOOD: SHOPEE_FOOD_ENV_ID_MAP[ENV3],
      SHOPEE_EXPRESS: 35
    };
    CROSS_BORDER_EXCHANGE_RATE_VALIDITY_DURATION_SECONDS = 60;
    KYCMessageByCountry = {
      [0 /* NONE */]: {
        ID: ["msg_verify_your_ic", void 0],
        MY: ["msg_verify_your_ic", void 0],
        PH: ["msg_verify_your_ic", void 0],
        SG: ["msg_verify_your_ic", void 0],
        TW: null,
        BR: null
      },
      [1 /* VERIFIED */]: {
        ID: ["label_wallet_home_kyc_success", {
          balance: compactServerCurrency(KYC_BALANCE_BY_LOCALE.ID)
        }],
        MY: ["label_wallet_home_kyc_success", {
          balance: compactServerCurrency(KYC_BALANCE_BY_LOCALE.MY)
        }],
        PH: ["label_wallet_home_kyc_success", {
          balance: compactServerCurrency(KYC_BALANCE_BY_LOCALE.PH)
        }],
        SG: ["label_wallet_home_kyc_success", {
          balance: compactServerCurrency(KYC_BALANCE_BY_LOCALE.SG)
        }],
        TW: null,
        BR: null
      },
      [2 /* WARNING */]: {
        ID: ["label_wallet_home_kyc_warning", void 0],
        MY: ["label_wallet_home_kyc_warning", void 0],
        PH: ["label_wallet_home_kyc_warning", void 0],
        SG: ["label_wallet_home_kyc_warning", void 0],
        TW: null,
        BR: null
      },
      [3 /* LIMIT_REACHED */]: {
        ID: ["label_wallet_home_kyc_error", void 0],
        MY: ["label_wallet_home_kyc_error", void 0],
        PH: ["label_wallet_home_kyc_error", void 0],
        SG: ["label_wallet_home_kyc_error", void 0],
        TW: null,
        BR: null
      },
      [4 /* VERIFY_ERROR */]: {
        ID: ["label_wallet_home_kyc_error", void 0],
        MY: ["label_wallet_home_kyc_error", void 0],
        PH: ["label_wallet_home_kyc_error", void 0],
        SG: ["label_wallet_home_kyc_error", void 0],
        TW: null,
        BR: null
      },
      [5 /* VERIFYING */]: {
        ID: ["label_wallet_home_kyc_verifying", void 0],
        MY: ["label_wallet_home_kyc_verifying", void 0],
        PH: ["label_wallet_home_kyc_verifying", void 0],
        SG: ["label_wallet_home_kyc_verifying", void 0],
        TW: null,
        BR: null
      },
      [6 /* PENDING_CALL */]: {
        ID: ["label_wallet_home_kyc_call_pending", void 0],
        MY: ["label_wallet_home_kyc_call_pending", void 0],
        PH: ["label_wallet_home_kyc_call_pending", void 0],
        SG: ["label_wallet_home_kyc_call_pending", void 0],
        TW: null,
        BR: null
      },
      [7 /* EXPIRING */]: {
        ID: null,
        MY: null,
        PH: ["label_wallet_home_kyc_expiring", void 0],
        SG: ["label_wallet_home_kyc_expiring", void 0],
        TW: null,
        BR: null
      },
      [8 /* REKYC_VERIFYING */]: {
        ID: null,
        MY: null,
        PH: ["label_wallet_home_re_kyc_verifying", void 0],
        SG: ["label_wallet_home_re_kyc_verifying", void 0],
        TW: null,
        BR: null
      },
      [9 /* REKYC_FAILED */]: {
        ID: null,
        MY: null,
        PH: ["label_wallet_home_kyc_error", void 0],
        SG: ["label_wallet_home_kyc_error", void 0],
        TW: null,
        BR: null
      }
    };
    REMITTANCE_CENTER_ENABLED = LOCALE6 === "PH";
    WITHDRAWAL_NEED_KYC_BY_LOCALE = {
      ID: true,
      MY: true,
      PH: true,
      // should be false when non_kyc_withdrawal toggle is removed
      SG: false,
      TW: false,
      BR: false
    };
    WITHDRAWAL_NEED_KYC = WITHDRAWAL_NEED_KYC_BY_LOCALE[LOCALE6];
    VIRTUAL_CARD_ASPECT_RATIO = 1.5;
    VIRTUAL_CARD_RADIUS_MULTIPLIER = 3;
    countryByTransactionCurrency = {
      "702": "SG",
      "458": "MY",
      "608": "PH",
      "360": "ID"
    };
    TopupMergeByCountry = {
      ID: MODULES2.TOPUP_MERGE.REDIRECTOR,
      MY: MODULES2.TOPUP_MERGE.MAIN,
      PH: MODULES2.TOPUP_MERGE.REDIRECTOR,
      SG: MODULES2.TOPUP_MERGE.MAIN,
      TW: MODULES2.TOPUP_MERGE.MAIN,
      TH: MODULES2.TOPUP_MERGE.REDIRECTOR,
      VN: MODULES2.TOPUP_MERGE.MAIN,
      BR: MODULES2.TOPUP_MERGE.REDIRECTOR
    };
    TOPUP_MERGE_MODULE = TopupMergeByCountry[LOCALE6];
    AIR_PAY_AUTH_DOMAIN = {
      TH: ["api-dev.test.airpay.in.th", "api-dev.test-stable.airpay.in.th", "testapi.airpay.in.th", "api.uat.airpay.in.th", "api.staging.airpay.in.th", "api.airpay.in.th"],
      VN: ["api-dev.test.airpay.vn", "api-dev.test-stable.airpay.vn", "testapi.airpay.vn", "api.uat.airpay.vn", "api.staging.airpay.vn", "api.airpay.vn"]
    };
    SEABANK_CHANNEL_ITEM_ID = 156;
    SEABANK_DD_TOPUP_CHANNEL_CONFIG = {
      ID: 8008500,
      PH: 4008500
    };
    SEABANK_DD_TOPUP_CHANNEL_ID = SEABANK_DD_TOPUP_CHANNEL_CONFIG[LOCALE6] || 0;
    phoneMap = {
      TH: "021189170",
      MY: "0327779222",
      ID: "1500702",
      VN: "19006906",
      SG: "6562066610",
      PH: "0288805200",
      BR: ""
    };
    csWebFormMap = {
      BR: "https://help.shopee.com.br/portal/webform/d75e2dbb49594bd19d1ea83485339a45?entryPoint=1&lastArticleID"
    };
    customerServicePhoneNumber = phoneMap[LOCALE6] || "";
    customerServiceWebForm = csWebFormMap[LOCALE6] || "";
  }
});
