const code = `
TrackingProcessor64.addEventProcessor(conversion3.v2ToV3);
export { a, b };
`

const code1 = "abc";

const res = code.replace(/^export\s+{([^}]+)}\s*;?$/gm, "");

const m = code.match(/^export\s+{([^}]+)}\s*;?$/gm);
const m1 = code1.match(/^export\s+{([^}]+)}\s*;?$/gm);
console.log(res, m);
console.log(m1);