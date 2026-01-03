import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await signup(email, password, name)
      nav('/')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Segoe UI', sans-serif; }

        :root {
          --primary: #ff6b35;
          --secondary: #22c55e;
          --bg-dark: #020617;
          --panel: #0f172a;
          --border: rgba(255,107,53,0.35);
        }

        .auth-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top, #1e293b, #020617);
        }

        .neon-shell {
          width: 900px;
          max-width: 95%;
          height: 520px;
          display: flex;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }

        /* ===== FOODWAY GRADIENT BORDER ===== */
        .neon-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(
            90deg,
            var(--primary),
            var(--secondary),
            var(--primary)
          );
          background-size: 300% 300%;
          animation: neonMove 6s linear infinite;
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
        }

        @keyframes neonMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* ===== LEFT PANEL ===== */
        .visual-panel {
          flex: 1;
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(135deg, #1e293b, #020617);
          color: #fed7aa;
        }

        .visual-panel h1 {
          font-size: 40px;
          margin-bottom: 12px;
          color: var(--primary);
        }

        .visual-panel p {
          opacity: 0.9;
          line-height: 1.6;
          color: #fde68a;
        }

        /* ===== RIGHT PANEL ===== */
        .form-panel {
          flex: 1;
          padding: 44px;
          background: var(--bg-dark);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .form-panel h2 {
          color: #fff;
          margin-bottom: 28px;
          text-align: center;
        }

        .input-box {
          position: relative;
          margin-bottom: 24px;
        }

        .input-box input {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1px solid #334155;
          border-radius: 12px;
          color: #fff;
          outline: none;
          transition: 0.3s;
        }

        .input-box input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 14px rgba(255,107,53,0.45);
        }

        .input-box label {
          position: absolute;
          top: -9px;
          left: 14px;
          font-size: 12px;
          background: var(--bg-dark);
          padding: 0 6px;
          color: var(--primary);
        }

        /* ===== BUTTON ===== */
        .auth-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          color: #020617;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: 0.3s;
        }

        .auth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 26px rgba(255,107,53,0.55);
        }

        .secure-note {
          margin-top: 18px;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .neon-shell { flex-direction: column; height: auto; }
          .visual-panel { display: none; }
        }
      `}</style>

      <div className="auth-root">
        <div className="neon-shell">
          <div className="visual-panel">
            <h1>FoodWay</h1>
            <p>
              Create your FoodWay account.<br />
              Discover food you love.
            </p>
          </div>

          <div className="form-panel">
            <h2>Join FoodWay</h2>

            <form onSubmit={submit}>
              <div className="input-box">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <label>Name</label>
              </div>

              <div className="input-box">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label>Email</label>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>

              <button className="auth-btn" type="submit">
                Create Account
              </button>
            </form>

            <div className="secure-note">
              🔒 Secure Signup • FoodWay
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
