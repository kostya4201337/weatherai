import {MonthButtonProps} from "./props.ts";
import "./MonthButton.css"

const MonthButton: React.FC<MonthButtonProps> = ({handleClick, buttonName, isSelected}) => {
    return (
        <div onClick={handleClick} className={isSelected ? "month-button-div month-button-selected" : "month-button-div"}>
            {buttonName}
        </div>
    );
};

export default MonthButton;