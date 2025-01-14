import swc from "@rollup/plugin-swc";
import react from "@vitejs/plugin-react-swc";
import { copyFileSync } from "fs";
import { glob } from "glob";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { UserConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import tsconfigPaths from "vite-tsconfig-paths";

export const defaultConfig: UserConfig = {
  build: {
    /** 트랜스파일된 소스코드와 원본 코드를 매핑 */
    sourcemap: true,
    /** 빌드 시 `public/` 디렉토리를 포함하지 않는다 */
    copyPublicDir: false,
    /** 패키지 형태로 빌드하기 위한 설정 */
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Paliga",
      formats: ["cjs", "es"],
      /** 빌드시 파일명 지정. 미지정 시 name을 기준으로 생성됨 */
      fileName: (format) => {
        switch (format) {
          case "es":
          case "esm":
          case "module":
            return "esm/index.js";
          case "cjs":
          case "commonjs":
            return "cjs/index.js";
          default:
            return `index.${format}.js`;
        }
      },
    },
    /** 프로덕션 빌드를 위한 설정 */
    rollupOptions: {
      // 코드 스플리팅을 위한 코드
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.{d.ts,spec.tsx}"],
          })
          .map((file) => [
            relative("src", file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      /** `auto`설정 시 CommonJS, ESM을 모두 지원 */
      output: {
        name: "Paliga",
        interop: "auto",
        chunkFileNames: "chunks/[name].[hash].js",
        assetFileNames: "assets/[name][extname]", // assets output
        // entryFileNames: '[name].js', // entry 파일을 위에서 정의하였으므로 필요없다
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      /** 빌드 시 react를 제외. 그 외에도 제외할 라이브러리를 정의 */
      external: ["react", "react-dom", "react/jsx-runtime"],
      plugins: [
        swc({
          swc: {
            sourceMaps: true,
          },
        }),
      ],
    },
  },
  plugins: [
    react(),
    /** 타입 정의 파일을 생성 */
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, "tsconfig.pubilsh.json"),
      exclude: ["dist", "node_modules"],
      afterBuild: () => {
        const srcPath = resolve(__dirname, "src/types.d.ts");
        const destPath = resolve(__dirname, "dist/types.d.ts");
        const srcCss = resolve(__dirname, "src/react/DevTool/dev-tool.css");
        const destCss = resolve(__dirname, "dist/dev-tool.css");

        copyFileSync(srcPath, destPath);
        copyFileSync(srcCss, destCss);
      },
    }),
    /** tsconfig 파일에서 baseUrl, paths 등을 참조할 수 있도록 설정 */
    tsconfigPaths({ root: "./" }),
    /** css 청크 생성 */
    libInjectCss(),
  ],
};
