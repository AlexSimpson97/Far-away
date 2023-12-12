import { createContext, useEffect, useState } from "react";
import { starterItems } from "../lib/constants";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
    // const [count, setCount] = useState(0);
    const localStorageItems = JSON.parse(localStorage.getItem("userItems"));
    const [items, setItems] = useState(localStorageItems || starterItems);

    useEffect(() => {
        localStorage.setItem("userItems", JSON.stringify(items));
    }, [items]);

    const itemsNumber = items.length;

    let numPacked = 0;

    for (const item of items) {
        item.packedStatus && numPacked++;
    }

    function handleAddNewItem(userText) {
        setItems((prevItems) => [
            ...prevItems,
            { id: new Date().getTime(), item: userText, packedStatus: false },
        ]);
    }

    function handleTogglePacked(id) {
        const updatePackedStatus = items.map((item) =>
            item.id === id
                ? { ...item, packedStatus: !item.packedStatus }
                : item
        );
        setItems(updatePackedStatus);
    }

    function handleDeleteItem(id) {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    }

    function handleMarkAllComplete() {
        const updatedItems = items.map((item) => ({
            ...item,
            packedStatus: true,
        }));
        setItems(updatedItems);
    }

    function handleMarkAllIncomplete() {
        const updatedItems = items.map((item) => ({
            ...item,
            packedStatus: false,
        }));
        setItems(updatedItems);
    }

    function handleResetToInitial() {
        setItems(starterItems);
        return;
    }

    function handleRemoveAllItems() {
        setItems([]);
        return;
    }
    return <ItemsContext.Provider value={
        {
            items,
            itemsNumber,
            numPacked,
            handleAddNewItem,
            handleTogglePacked,
            handleDeleteItem,
            handleMarkAllComplete,
            handleMarkAllIncomplete,
            handleResetToInitial,
            handleRemoveAllItems,
        }
    } >{ children }</ItemsContext.Provider>;
}
