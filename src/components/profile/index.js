/**
    Component of showing profile page of the user when it is logged in
*/
import React, {useEffect, useState} from "react";
import MyTuits from "./my-tuits";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service";
import TuitsAndReplies from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
import MyBoards from "./my-boards";
import Dashboard from "../admin-dashboard";

/**
 * The below function renders profile
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({});

  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
        .then(() => navigate('/login'));
  }
  
  return(
    <div className="ttr-profile">
      <div className="border border-bottom-0">
        <h4 className="p-2 mb-0 pb-0 fw-bolder">{profile.userName}<i className="fa fa-badge-check text-primary"></i></h4>
        <span className="ps-2">67.6K Tuits</span>
        <div className="mb-5 position-relative">
          <img className="w-100" src="../images/nasa-profile-header.jpg"/>
          <div className="bottom-0 left-0 position-absolute">
            <div className="position-relative">
              <img async className="position-relative ttr-z-index-1 ttr-top-120px ttr-width-100px"
                   src={profile.profilePhoto}/>
            </div>
          </div>
          <Link to="/profile/edit"
                className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
            Edit profile
          </Link>
          <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill">
            Logout
          </button>
        </div>

        <div className="p-2">
          <h4 className="fw-bolder pb-0 mb-0">
            {profile.userName}<i className="fa fa-badge-check text-primary"></i>
          </h4>
          <h6 className="pt-0">@{profile.userName}</h6>
          <p className="pt-2">
            There's space for everybody. Sparkles
          </p>
          <p>
            <i className="far fa-location-dot me-2"></i>
            Pale Blue Dot
            <i className="far fa-link ms-3 me-2"></i>
            <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
            <i className="far fa-balloon ms-3 me-2"></i>
            Born October 1, 1958
            <br/>
            <i className="far fa-calendar me-2"></i>
            Joined December 2007
          </p>
          <b>178</b> Following
          <b className="ms-4">51.1M</b> Followers
          <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/mytuits"
                    className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}>
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className={`nav-link ${location.pathname.indexOf('tuits-and-replies') >= 0 ? 'active':''}`}>
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/likes"
                    className={`nav-link ${location.pathname.indexOf('/likes') >= 0 ? 'active':''}`}>
                Likes</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/dislikes"
                    className={`nav-link ${location.pathname.indexOf('dislikes') >= 0 ? 'active':''}`}>
                Dislikes</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/boards"
                    className={`nav-link ${location.pathname.indexOf('/boards') >= 0 ? 'active':''}`}>
                Boards</Link>
            </li>
            {profile.role === "ADMIN" ? 
            <li className="nav-item">
              <Link to="/profile/dashboard"
                    className={`nav-link ${location.pathname.indexOf('dashboard') >= 0 ? 'active':''}`}>
                Admin</Link>
            </li> : null}
          </ul>
        </div>
      </div>
        <Routes>
          <Route path="/mytuits" element={<MyTuits/>}/>
          <Route path="/tuits-and-replies" element={<TuitsAndReplies/>}/>
          <Route path="/likes" element={<MyLikes/>}/>
          <Route path="/dislikes" element={<MyDislikes/>}/>
          <Route path= "/boards" element={<MyBoards profile={profile}/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  );
}
export default Profile;