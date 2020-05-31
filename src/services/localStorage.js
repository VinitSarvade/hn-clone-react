const getItemFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const setItemToLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  return null;
};

export const getUpvotes = () => {
  return getItemFromLocalStorage("upvotes") || {};
};

export const getHiddenItems = () => {
  return getItemFromLocalStorage("hidden") || [];
};

export const setUpvotes = (id, value) => {
  const upvotes = getUpvotes();
  setItemToLocalStorage("upvotes", {
    ...upvotes,
    [id]: value,
  });
};

export const setHiddenItem = (itemId) => {
  const hiddenItems = new Set(getHiddenItems());
  hiddenItems.add(itemId);
  localStorage.setItem("hidden", JSON.stringify([...hiddenItems]));
};
