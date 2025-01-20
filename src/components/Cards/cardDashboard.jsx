import React from 'react';
import { ChevronDown, ChevronUp, DollarSign, ShoppingCart } from "lucide-react";

const CardDashboard = ({ title, body, footer, icon_up_down: IconUD, icon: Icon }) => {
    return (
        <div className=" card-container bg-white m-3 d-flex justify-content-center align-content-center">
            <div className="col-8">
                <p className="title ms-4 my-2">{title}</p>
                <p className="ms-4 text-content">{body}</p>
                <div className={`d-flex footer justify-content-start ms-2
                   ${IconUD == ChevronUp ? "color-green" : "color-red"}
                    `}>
                    {IconUD && <IconUD/>}
                    <p>{footer}</p>
                </div>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center">
                <div className="icon-box p-3">
                    {Icon && <Icon className="icon"/>}
                </div>
            </div>
        </div>
    );
};

export default CardDashboard;
