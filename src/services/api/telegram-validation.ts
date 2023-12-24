// Transforms Telegram.WebApp.initData string into object
type TransformInitData = {
    [k: string]: string;
  };
  
function transformInitData(initData: string): TransformInitData {
    return Object.fromEntries(new URLSearchParams(initData));
}

export function telegramValidation(initData: string): void {
    console.log(initData);
   const validatingData = Object.fromEntries(new URLSearchParams(initData));
   console.log(validatingData);
}
