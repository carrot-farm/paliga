export const copyClipboard = (
  text: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: () => void } = {},
) => {
  // # 클립보드 지원시
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      })
      .catch(() => {
        if (typeof onError === "function") {
          onError();
        }
      });
  }

  // # 구현 브라우저
  return new Promise((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const success = document.execCommand("copy");
      if (success) {
        resolve(text);
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } else {
        reject(new Error("failed copy clipboard"));
        if (typeof onError === "function") {
          onError();
        }
      }
    } catch (error) {
      reject(error);
      if (typeof onError === "function") {
        onError();
      }
    } finally {
      document.body.removeChild(textarea);
    }
  });
};
