import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import AccountDetailsForm from './components/AccountDetailsForm';
import { COLORS } from './constants/colors';
import accountsData from './accounts.json';

function App() {
  const [accounts, setAccounts] = useState(accountsData);
  const [loggedInAccount, setLoggedInAccount] = useState(null);

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('loggedInUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setLoggedInAccount(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        sessionStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleLogin = (account) => {
    setLoggedInAccount(account);
    sessionStorage.setItem('loggedInUser', JSON.stringify(account));
  };

  const handleUpdate = (updatedAccount) => {
    // Update the accounts array
    const updatedAccounts = accounts.map(acc => 
      acc.username === loggedInAccount.username ? updatedAccount : acc
    );
    setAccounts(updatedAccounts);
    setLoggedInAccount(updatedAccount);
    sessionStorage.setItem('loggedInUser', JSON.stringify(updatedAccount));
  };

  const handleLogout = () => {
    setLoggedInAccount(null);
    sessionStorage.removeItem('loggedInUser');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {!loggedInAccount ? (
        <LoginForm 
          onLogin={handleLogin} 
          accounts={accounts}
        />
      ) : (
        <AccountDetailsForm 
          account={loggedInAccount}
          accounts={accounts}
          onUpdate={handleUpdate}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;