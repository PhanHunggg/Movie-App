import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentListAction } from "../../../../store/actions/userActions";
import "./comment.scss";

export default function Comment() {
  const dispatch = useDispatch();

  const stateMovie = useSelector((state) => state.userReducer);

  useEffect(() => {
    getCommentList();
  }, []);

  const getCommentList = () => {
    if (stateMovie.commentList.length) return;
    dispatch(fetchCommentListAction());
  };
  console.log(stateMovie);
  const renderComment = () => {
    return stateMovie.commentList.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maPhim}>
          {idx <= 7 && (
            <div className="col-6 comment__film">
              <article className="blog ">
                <div className="comment__image mr-3">
                  <a href="#">
                    <img src={ele.hinhAnh} />
                  </a>
                </div>
                <h5>[Review] {ele.tenPhim}!</h5>
                <ul>CHẤM ĐIỂM</ul>
                <div className="blog__content">
                  <span>{ele.moTa}</span>
                </div>
              </article>
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{paddingBottom: "50px"}} className="container">
      <h3>Bình Luận Phim</h3>
      <div className="row">{renderComment()}</div>
    </div>
  );
}
