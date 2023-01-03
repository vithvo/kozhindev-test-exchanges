type setProps = {
  firstInputValueLocal?: string;
  secondInputValueLocal?: string;
  firstSelectValueLocal?: string;
  secondSelectValueLocal?: string;
};

export const setItemsLocalStorage = ({ ...items }: setProps) => {
  localStorage.setItem("firstInputValue", items.firstInputValueLocal);
  localStorage.setItem("secondInputValue", items.secondInputValueLocal);
  localStorage.setItem("firstSelectValue", items.firstSelectValueLocal);
  localStorage.setItem("secondSelectValue", items.secondSelectValueLocal);
};

export const getItemsLocalStorage = (): setProps => {
  const firstInputValueLocal = localStorage.getItem("firstInputValue");
  const secondInputValueLocal = localStorage.getItem("secondInputValue");
  const firstSelectValueLocal = localStorage.getItem("firstSelectValue");
  const secondSelectValueLocal = localStorage.getItem("secondSelectValue");

  return {
    firstInputValueLocal,
    secondInputValueLocal,
    firstSelectValueLocal,
    secondSelectValueLocal,
  };
};
