import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileUser } from "../../services/user";
import BookingHistory from "./components/booking-history/BookingHistory";

import Profile from "./components/profile/Profile";
import "./user.scss";

export default function User() {
  const params = useParams();
  const [profile, setProfile] = useState();

  console.log(profile);

  useEffect(() => {
    getProfileUser();
  }, []);

  const getProfileUser = async () => {
    const result = await fetchProfileUser(params.user);
    setProfile(result.data.content);
  };
  return (
    <div className="profile">
      <ul
        className=" container nav nav-pills mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item li_profile" role="presentation">
          <button
            className="nav-link active"
            id="pills-profile-tab"
            data-toggle="pill"
            data-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            Thông tin cá nhân
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link "
            id="pills-home-tab"
            data-toggle="pill"
            data-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Lịch sử giao dịch
          </button>
        </li>
      </ul>
      <div className="tab-content mt-5" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Profile profile={profile} />
        </div>
        <div
          className="tab-pane fade  "
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <BookingHistory profile={profile} />
        </div>
      </div>
    </div>
  );
}
