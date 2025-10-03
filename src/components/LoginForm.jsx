import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { COLORS } from '../constants/colors';

const LoginForm = ({ onLogin, accounts }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    setErrors({});

    const account = accounts.find(
      acc => acc.username === username && acc.password === password
    );

    if (!account) {
      setErrors({
        username: 'Account and/or Incorrect Password',
        password: 'Credentials are invalid'
      });
    } else {
      onLogin(account);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '380px',
      backgroundColor: COLORS.cardBg,
      padding: '40px 32px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
    }}>
      <div onKeyPress={handleKeyPress}>
        <Input
          label="username"
          value={username}
          onChange={setUsername}
          error={errors.username}
        />
        <Input
          label="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          showToggle
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
        <Button onClick={handleSubmit} style={{ width: '100%', marginTop: '8px' }}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;