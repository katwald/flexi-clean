import React from "react";
import { readableDate } from "../../../helpers/readableDate";
import { HiArrowLongRight, HiOutlineUserCircle } from "react-icons/hi2";

import "./index.scss";
const Card = ({
  title,
  tag,
  onClick,
  startTime,
  endTime,
  description,
  userName,
  hasAvatar = false,
  duration = "3.5",
}) => {
  const renderAvatar = () => {
    return (
      <div className="card__header__avatar">
        {userName && (
          <>
            <div className="card__header__avatar__icon">
              <HiOutlineUserCircle />
            </div>
            <div className="card__header__avatar__name">{userName}</div>
          </>
        )}
      </div>
    );
  };

  const renderDuration = () => {
    return <div className="card__header__duration">{duration}</div>;
  };

  return (
    <div onClick={onClick} className="card">
      <div className="card__header">
        <div>
          <h3 className="card__header__title">{title}</h3>
          <div className="card__header__sub-title">
            <p className=" card__header__sub-title card__header__sub-title__date">
              {hasAvatar ? readableDate(startTime) : startTime}
            </p>
            <p className="card__header__sub-title card__header__sub-title__date">
              {hasAvatar ? readableDate(endTime) : endTime}
            </p>
          </div>
        </div>
        {hasAvatar ? renderAvatar() : renderDuration()}
      </div>
      <div className="card__body">
        <div className="card__body__truncate">{description}</div>
      </div>
      <div className="card__footer">
        <div
          className={`card__footer__chip card__footer__chip__${
            tag && tag.toLowerCase()
          }`}
        >
          {tag}
        </div>
        <div>
          <HiArrowLongRight className="card__footer__avatar" />
        </div>
      </div>
    </div>
  );
};

export default Card;
