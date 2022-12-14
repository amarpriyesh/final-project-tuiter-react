/**
 Component that renders an array of tuits.
 */
import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";
export const BoardTuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    const dislikeTuit = (tuit) =>
        likesService.userDislikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit =>
                                               <Tuit key={tuit._id}
                                                     deleteTuit={deleteTuit}
                                                     likeTuit={likeTuit}
                                                     dislikeTuit={dislikeTuit}
                                                     tuit={tuit}/>)
                }
            </ul>
        </div>
    );
}

export default BoardTuits;