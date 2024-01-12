import { useState } from 'react';

export const useSearch = () => {
  const [searchText, setSearchText] = useState('');

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return {
    searchText,
    onSearch,
    clearSearch,
  };
};
