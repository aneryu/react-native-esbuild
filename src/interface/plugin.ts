export interface CustomEsbuildPlugin {
  name: string;
  type: "resolve-plugin" | "load-plugin" | "start-plugin" | "end-plugin";
  stage: number;
}
