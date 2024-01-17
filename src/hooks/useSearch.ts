import { useState } from 'react';

export const useSearch = (
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>,
  onSearchExternal?: (
    searchText: string,
    setLoader: (value: boolean) => void
  ) => void
) => {
  const [searchText, setSearchText] = useState('');

  const onSearch = (value: string) => {
    setSearchText(value);
    // Call user defined callback function
    onSearchExternal?.(value, (show: boolean) => {
      setShowLoader(show);
    });
  };

  const clearSearch = () => {
    setSearchText('');
    // Call user defined callback function
    onSearchExternal?.('', (show: boolean) => {
      setShowLoader(show);
    });
  };

  return {
    searchText,
    onSearch,
    clearSearch,
  };
};
