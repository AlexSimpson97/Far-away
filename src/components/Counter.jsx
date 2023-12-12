import { useItemsContext } from "../lib/hooks";


export default function Counter() {
    const {numPacked, itemsNumber} = useItemsContext();
    return (
        <p>
            <b>{numPacked}</b> / {itemsNumber} items packed
        </p>
    )
}

