import LoadingIndicator from "../components/exception/LoadingIndicator";
import ErrorIndicator from "../components/exception/ErrorIndicator";

export const CheckLoadingAndError = (
  isLoading = false,
  isError: boolean | null = false,
  errorMessage: unknown | null,
): React.ReactElement | null => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorIndicator errorMessage={errorMessage} />;
  }

  return null; // 로딩도 에러도 아니면 null을 반환하여 렌더링하지 않음
};
