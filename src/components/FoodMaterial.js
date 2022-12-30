import "./styles/FoodMaterial.css";

function FoodMaterial ( param )
{

    return (
        <div class="all">
            <div class="card">
                <div id="image-container">
                    {/* img fit content */}
                </div>
                <div class="data">
                    <h1>
                        { param.obj.name }
                    </h1>
                    <h1>
                        { param.obj.category }
                    </h1>
                    <h1>
                        { param.obj.quantity } pcs(s)
                    </h1>
                </div>
            </div>
        </div>
    );

}

export default FoodMaterial;