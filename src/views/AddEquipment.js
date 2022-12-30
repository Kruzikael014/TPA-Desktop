import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";


const AddEquipment = () => {

    return (
        <div>
            <Headers/>
            <Taskbar position={sessionStorage.getItem("department")} />
            <div id="inner-page">
                hELLO IM ADD EQUIPMENT PAGE
            </div>
        </div>
    )

}

export default AddEquipment;