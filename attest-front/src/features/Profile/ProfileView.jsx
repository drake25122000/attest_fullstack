import React, { useState } from "react";
import { useUser } from "../../context/auth-context";
import Owned from "./components/Owned";
import Favourited from "./components/Favourited";
import Activity from "./components/Activity";

function ProfileView() {
    const user = useUser();
    const [menuBar, setMenuBar] = useState(0);
    
    const selectedClass = "border-b-2 border-black";
    const attributes = ["Owned", "Listed Items", "Favourited", "Activity"];

    return (
        <div className="p-6">
            <div>
                Banner and profile picture
            </div>
            <div className="my-3">
                <div>
                    {user.username}
                </div>
                <div className="flex flex-row">
                    <div className="w-1/12 text-ellipsis overflow-hidden">
                        {user.walletAddress}
                    </div>
                    <div>
                        Joined date
                    </div>
                </div>
            </div>
            
            <div className="flex flex-row space-x-20 my-3">
                {attributes.map((att, index) => 
                    <div className={index === menuBar ? selectedClass : ""} onClick={() => setMenuBar(index)}>
                        {att}
                    </div>
                )}
                <div>
                    More
                </div>
            </div>
            { menuBar === 0 && <Owned user={user} /> }
            { menuBar === 1 && <Favourited /> }
            { menuBar === 2 && <Activity /> }
        </div>
    );
}

export default ProfileView;