import InputText from "./input-text";
import SearchIcon from "../assets/icons/search.svg?react";
import React from "react";
import { debounce } from "../helpers/utils";

export default function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState("");

  const debouncedSetValue = React.useMemo(
    () =>
      debounce((...args: unknown[]) => {
        const value = args[0] as string;
        console.log("buscando fotos com o valor:", value);
      }, 200),
    []
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setInputValue(value);
    debouncedSetValue(value);
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Search photo"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}
