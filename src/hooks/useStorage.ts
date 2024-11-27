import useLocalStorageState from 'use-local-storage-state';

const STORAGE_KEY = '@bee-artifacts/STORAGE';

type Storage = {
  visitedArtifacts?: string[];
  hideWarning?: boolean;
};

export function useStorage() {
  const [value, setValue] = useLocalStorageState<Storage>(STORAGE_KEY, {
    defaultValue: {},
    defaultServerValue: {
      hideWarning: true,
    },
  });

  const getStorageValue = <K extends keyof Storage>(key: K): Storage[K] => {
    return value[key];
  };

  const setStorageValue = <K extends keyof Storage>(
    key: K,
    value: Storage[K]
  ) => {
    setValue((state) => ({
      ...state,
      [key]: value,
    }));
  };

  return { getStorageValue, setStorageValue };
}
