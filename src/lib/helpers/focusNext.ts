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
