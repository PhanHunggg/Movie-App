import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../../../contexts/loading/LoadingContext";
import { fetchCommentListAction } from "../../../../store/actions/userActions";
import "./comment.scss";

export default function Comment() {
  const navigate = useNavigate();

  const navigateDetail = (maphim) => {
    navigate(`/movie-detail/${maphim}`);
  };

  const dispatch = useDispatch();

  const [loadingState, setLoadingState] = useContext(LoadingContext);

  const stateMovie = useSelector((state) => state.userReducer);

  // console.log(stateMovie.commentList);

  useEffect(() => {
    getCommentList();
  }, []);

  useEffect(() => {
    if (stateMovie.movieList.length) {
      setLoadingState({ isLoading: false });
    }
  }, [stateMovie]);

  const getCommentList = () => {
    if (stateMovie.commentList.length) return;

    setLoadingState({ isLoading: true });

    dispatch(fetchCommentListAction());
  };

  const renderComment = () => {
    return stateMovie.commentList.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maPhim}>
          {idx <= 7 && (
            <div
              className="col-6 comment__film"
              onClick={() => navigateDetail(ele.maPhim)}
            >
              <article className="blog ">
                <div className="comment__image mr-3">
                  <a href="#">
                    <img src={ele.hinhAnh} />
                  </a>
                </div>
                <h5>[Review] {ele.tenPhim}!</h5>
                <ul className="Evaluate">Đánh giá: {ele.danhGia}/10</ul>
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
    <div style={{ backgroundColor: "#0b0b0b" }} className="comment py-4">
      <div style={{ paddingBottom: "50px" }} className="container">
        <h3>Bình Luận Phim</h3>
        <div className="row">{renderComment()}</div>
      </div>
    </div>
  );
}
