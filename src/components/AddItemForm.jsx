import { useContext, useRef, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button";
import { ItemsContext } from "../contexts/ItemsContextProvider";

export default function AddItemForm() {
    const {handleAddNewItem:onAddNewItem} = useContext(ItemsContext);
    const [userText, setUserText] = useState(`Add an item`);
    const inputFieldRef = useRef();

    function handleUserInput(event) {
        setUserText(event.target.value);
    }

    function handleBeginTyping(event) {
        if (event.target.value === `Add an item`) {
            setUserText("");
        }
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        if (!userText.trim()) {
            toast.error(`You can't pack nothing silly 😅`);
            inputFieldRef.current.focus();
            return;
        }

        onAddNewItem(userText);

        setUserText(""); // Clear the user input after adding the item

        inputFieldRef.current.focus();
        const logText = userText;
        setUserText("");
        console.log(logText);
    }


    return (
        <form onSubmit={handleSubmitForm}>
            <h2>Add an Item</h2>
            <input
                ref={inputFieldRef}
                onFocus={handleBeginTyping}
                value={userText}
                onChange={handleUserInput}
                autoFocus
            />
            <Button type="submit" btnText={`Add to list`} onClick={handleSubmitForm} />
            <ToastContainer position="top-center" autoClose={2000} transition={Slide} />
        </form>
    );
}
