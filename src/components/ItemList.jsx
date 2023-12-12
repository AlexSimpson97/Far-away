import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import Select from "react-select";
import EmptyView from "./EmptyView";
import { useItemsContext } from "../lib/hooks";

Item.propTypes = {
    items: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    packedStatus: PropTypes.bool.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onTogglePacked: PropTypes.func.isRequired,
};

const sortOptions = [
    {
        label: `Sort by Default`,
        value: `default`,
    },
    {
        label: `Sort by Packed`,
        value: `packed`,
    },
    {
        label: `Sort by Unpacked`,
        value: `unpacked`,
    },
];

export default function ItemList() {
    const {items, handleDeleteItem, handleTogglePacked} = useItemsContext();
    const [sortBy, setSortBy] = useState("default");

    const sortedItems = useMemo(() => [...items].sort((a, b) => {
        if (sortBy === "default") {
            return;
        } else if (sortBy === "packed") {
            return b.packedStatus - a.packedStatus;
        } else if (sortBy === "unpacked") {
            return a.packedStatus - b.packedStatus;
        }
        return 0;
    }), [items, sortBy]);

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "##fff",
            // borderColor: !state.isFocused ? 'red' : provided.borderColor,
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? "white" : "inherit",
            backgroundColor: state.isFocused ? "#473A2B" : "inherit",
        }),
    };
    return (
        <ul className="item-list">
            {items.length === 0 && <EmptyView />}
            {items.length > 0 && (
                <section className="sorting">
                    <Select
                        defaultValue={sortOptions[0]}
                        options={sortOptions}
                        onChange={(option) => setSortBy(option.value)}
                        styles={selectStyles}
                    />
                </section>
            )}
            {sortedItems.map(({ id, item, packedStatus }) => (
                <Item
                    key={id}
                    id={id}
                    item={item}
                    packedStatus={packedStatus}
                    onDeleteItem={handleDeleteItem}
                    onTogglePacked={handleTogglePacked}
                />
            ))}
        </ul>
    );
}

function Item({ id, item, packedStatus, onDeleteItem, onTogglePacked }) {
    return (
        <li className="item">
            <label htmlFor={`item-${id}`}>
                <input
                    id={`item-${id}`}
                    type="checkbox"
                    checked={packedStatus}
                    onChange={() => onTogglePacked(id)}
                />
                {item}
            </label>
            <button onClick={() => onDeleteItem(id)}>❌</button>
        </li>
    );
}
