import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContextProvider";


export default function Counter() {
    const {numPacked, itemsNumber} = useContext(ItemsContext);
    return (
        <p>
            <b>{numPacked}</b> / {itemsNumber} items packed
        </p>
    )
}

