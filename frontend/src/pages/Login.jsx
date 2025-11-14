
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { api } from '../api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      const res = await api.login(email, password);
      localStorage.setItem('avizo_token', res.token);
      localStorage.setItem('avizo_email', res.email);
      navigate('/app');
    } catch (err) {
      console.error(err);
      setError('Could not log in. Check details or try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="glass-panel max-w-sm w-full p-6 bg-slate-950/80">
        <h1 className="text-lg font-semibold mb-1 text-slate-50">Welcome to Avizo</h1>
        <p className="text-xs text-slate-400 mb-4">
          Sign in or create a new account by entering your email and password
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <Input
            label="Email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-[11px] text-rose-400">{error}</p>}
          <Button type="submit" className="w-full mt-1">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
