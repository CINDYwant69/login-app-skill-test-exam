import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { COLORS } from '../constants/colors';

const AccountDetailsForm = ({ 
  account, 
  onUpdate, 
  onLogout, 
  accounts 
}) => {
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState(account.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateUsername = (newUsername) => {
    if (newUsername === account.username) return null;
    
    const exists = accounts.some(acc => acc.username === newUsername);
    if (exists) {
      return 'Username should be unique';
    }
    return null;
  };

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return 'Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special symbol.';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special symbol.';
    }
    if (!/[a-z]/.test(pass)) {
      return 'Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special symbol.';
    }
    if (!/[0-9]/.test(pass)) {
      return 'Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special symbol.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      return 'Password should have at least 8 characters, one uppercase letter, one lowercase letter, one number and one special symbol.';
    }
    return null;
  };

  const handleUpdate = () => {
    const newErrors = {};
    
    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;
    
    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onUpdate({ username, password });
      alert('Account updated successfully!');
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
      <h2 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: '24px',
        textAlign: 'left'
      }}>
        Hi {account.username}!
      </h2>

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

      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginTop: '8px' 
      }}>
        <Button onClick={handleUpdate} style={{ flex: 1 }}>
          Update Details
        </Button>
        <Button onClick={onLogout} variant="danger">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AccountDetailsForm;