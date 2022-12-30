import "./styles/RequestCard.css";

function RequestCard ( param )
{

    console.log(param.equRep.equipment)
    console.log(param.equRep.report)
    // console.log( param.rep.employeeid );

    return (
        <div class="request-card">
            {
            // param.rep[0]?.id
            // param.rep.employeeid
            }
        </div>
    );

};

export default RequestCard;