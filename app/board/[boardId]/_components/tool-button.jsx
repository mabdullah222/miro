'use client';

import Hint from "../../../../components/hint";
import { Button } from "../../../../components/ui/button";


const ToolButton=({label,icon:Icon,onClick,isActive,isDisabled})=>{
    return (
        <Hint label={label}>
            <Button disabled={isDisabled} onClick={onClick}
            size="icon"
            variant={isActive?"boardActive":"board"}
            >
                <Icon></Icon>
            </Button>
        </Hint>
    )
}
export default ToolButton;