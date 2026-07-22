import "./PropertySpecifications.css";

function PropertySpecifications({ property }) {

    const specs = [

        {
            label:"Furnishing",
            value:property.furnishing
        },

        {
            label:"Facing",
            value:property.facing
        },

        {
            label:"Water Supply",
            value:property.waterSupply
        },

        {
            label:"Floors",
            value:property.floors
        },

        {
            label:"Parking",
            value:property.parking
        },

        {
            label:"Power Backup",
            value:property.powerBackup
        }

    ];

    return (

        <div className="spec-card">

            <h2>Property Details</h2>

            <div className="spec-grid">

                {

                    specs.map((item,index)=>(

                        <div
                        className="spec-item"
                        key={index}
                        >

                            <span>{item.label}</span>

                            <strong>{item.value}</strong>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default PropertySpecifications;