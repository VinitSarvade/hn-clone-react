const getItemFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const getUpvotes = () => {
  return getItemFromLocalStorage("upvotes") || {};
};

export const getHiddenItems = () => {
  return getItemFromLocalStorage("hidden") || {};
};

export const setHiddenItem = (itemId) => {
  const hiddenItems = new Set(getHiddenItems());
  hiddenItems.add(itemId);
  localStorage.setItem("hidden", JSON.stringify([...hiddenItems]));
};
