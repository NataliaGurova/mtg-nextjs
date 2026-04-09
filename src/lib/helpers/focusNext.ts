const focusNext =
  (nextName: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document
        .querySelector<HTMLInputElement>(`[name="${nextName}"]`)
        ?.focus();
    }
  };

export default focusNext;

  // // Вспомогательная функция для переключения фокуса по нажатию Enter
  // const focusNext = (fieldName: keyof RegisterFormValues | "submit") => 
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault(); // Запрещаем стандартную отправку формы
  //       if (fieldName !== "submit") {
  //         setFocus(fieldName as keyof RegisterFormValues);
  //       }
  //     }
  // };
    
  // export default focusNext;
