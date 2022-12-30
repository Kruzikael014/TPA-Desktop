import QRCode from "react-qr-code";
import "./styles/EquipmentCard.css";

function EquipmentCard ( param )
{

    return (
        <div class="all">
            <div class="card">
                <div>
                    <p>
                        { param.obj.id }
                    </p>
                </div>
                <div class="eq-crd-qr-container">
                    <QRCode class="eq-crd-qr" value={param.obj.id} />
                </div>
                <div class="data">
                    <h1>
                        { param.obj.name }
                    </h1>
                    <h1>
                        { param.obj.category }
                    </h1>
                    <h1>
                        { param.obj.status }
                    </h1>
                </div>
            </div>
        </div>
    );

}

export default EquipmentCard;