import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboards } from "../features/leaderboard/leaderboardSlice";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import Avatar from "../components/Avatar";

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  };

  return (
    <>
      <Header />
      <main className="leaderboard-container">
        <h2>🏆 Leaderboard</h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="leaderboard-list">
            {list.map((item, index) => (
              <div key={item.user.id} className="leaderboard-card">
                <div className="rank">{getMedal(index)}</div>
                <div className="user-info">
                  <Avatar
                    src={item.user.avatar}
                    name={item.user.name}
                    size={48}
                  />
                  <div className="details">
                    <span className="name">{item.user.name}</span>
                    <span className="score">{item.score} pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        .leaderboard-container {
          max-width: 800px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2c3e50;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 25px;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .leaderboard-card {
          display: flex;
          align-items: center;
          background: #f9f9f9;
          border-radius: 10px;
          padding: 12px 18px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .leaderboard-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .rank {
          width: 50px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #007bff;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }

        .details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .name {
          font-weight: 600;
          font-size: 18px;
          color: #2c3e50;
        }

        .score {
          font-size: 15px;
          color: #007bff;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .leaderboard-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .rank {
            align-self: flex-start;
          }
        }
      `}</style>
    </>
  );
}
