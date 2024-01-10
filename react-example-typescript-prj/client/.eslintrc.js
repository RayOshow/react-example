module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  extends: [
    // 다른 extends 항목들
    "prettier", // eslint-config-prettier를 활성화합니다.
  ],
  plugins: [
    // 다른 plugins 항목들
    "prettier", // eslint-plugin-prettier를 활성화합니다.
  ],
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:react-hooks/recommended", // Uses the recommended rules from @eslint-plugin-react-hooks
    "prettier",
  ],
  rules: {
    /* React 17 이후 버전 : JSX를 사용하는 모든 파일에 React의 import를 요구하지 않음. */
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    "no-empty-function": "off", // 빈 함수 허용
    "react/prop-types": "off", // React 컴포넌트의 props에 대한 PropTypes 유효성 검사를 수행하지 않는다.
    "@typescript-eslint/no-unused-vars": "error", // 미사용 변수가 있으면, 에러 발생.
    "react-hooks/rules-of-hooks": "error", // React Hook룰 체크
    "@typescript-eslint/no-explicit-any": "error", // any 타입 사용 금지
    "@typescript-eslint/explicit-function-return-type": "off", // 리턴이 없는 함수 사용 허용
    "prettier/prettier": "error", // Prettier 코드 문법 체크
  },
};
