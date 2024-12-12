import React, { useEffect, useState } from "react";
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmM4MmVhNTEwMDAwZTc4MzNhYTcwOWIzMzZkMDQ3NiIsIm5iZiI6MTczMzg4OTY5My43MTQsInN1YiI6IjY3NTkwZTlkMGIxNWJkYjllYzFmMzAwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bWP2buppOmoK4vdQMepSKi-H7bRoMLcbal-OKjMlJDs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          console.error("No video results found");
        }
      })
      .catch(err => console.error(err));
  }, [id]); // Add `id` as a dependency to ensure it fetches correctly if `id` changes.

  return (
    <div className="player">
      {/* Back Arrow */}
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate(-1)} // Navigate back one page instead of two.
        style={{ cursor: 'pointer' }}
      />

      {/* Video Player */}
      {apiData.key ? (
        <iframe
          src={`https://www.youtube.com/embed/${apiData.key}`}
          width="90%"
          height="90%"
          frameBorder="0"
          title="Trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}

      {/* Video Info */}
      <div className="player-info">
        {apiData.published_at && <p>{apiData.published_at.slice(0, 10)}</p>}
        <p>{apiData.name || "No Name Available"}</p>
        <p>{apiData.type || "No Type Available"}</p>
      </div>
    </div>
  );
};

export default Player;
