import { useContext } from "react";
import { ItemsContext } from "../contexts/ItemsContextProvider";
import { btnProperties } from "../lib/constants";
import Button from "./Button";

export default function ButtonGroup() {
    const {handleMarkAllComplete, handleMarkAllIncomplete, handleResetToInitial, handleRemoveAllItems} = useContext(ItemsContext);
    return (
        <div className="button-group">
            {btnProperties.map(({ btnText, type: btnType }) => {
                let handleClick;
                switch (btnText) {
                    case `Mark all as complete`:
                        handleClick = handleMarkAllComplete;
                        break;
                    case `Mark all as incomplete`:
                        handleClick = handleMarkAllIncomplete;
                        break;
                    case `Reset to initial`:
                        handleClick = handleResetToInitial;
                        break;
                    case `Remove all items`:
                        handleClick = handleRemoveAllItems;
                        break;

                    default:
                        break;
                }
                return (
                    <Button
                        key={btnText}
                        btnText={btnText}
                        type={btnType}
                        handleClick={handleClick}
                    />
                );
            })}
        </div>
    );
}
