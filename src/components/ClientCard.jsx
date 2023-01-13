
import "./styles/ClientCard.css";

const ClientCard = ( { id, name, type, phonenumber, email } ) =>
{

    return (
        <div class="client-card">
            <div id="client-hori-compartment">
                <div class="verti">
                    <div class="label">
                        ID
                    </div>
                    <div>
                        <p>
                            : { id }
                        </p>
                    </div>
                </div>
                <div class="verti">
                    <div class="label">
                        Name
                    </div>
                    <div>
                        <p>
                            : { name }
                        </p>
                    </div>
                </div>
                <div class="verti">
                    <div class="label">
                        Email
                    </div>
                    <div>
                        <p>
                            : { email }
                        </p>
                    </div>
                </div>
                <div class="verti">
                    <div class="label">
                        Phone Number
                    </div>
                    <div>
                        <p>
                            : { phonenumber }
                        </p>
                    </div>
                </div>
                <div class="verti">
                    <div class="label">
                        Type
                    </div>
                    <div>
                        <p>
                            : { type }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ClientCard;

