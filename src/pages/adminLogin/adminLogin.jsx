import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/api';
import { setToken } from '../../redux-toolkit/reducers/usersSlice/usersSlice'; 
import styles from './adminLogin.module.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await post('/api/users/login', { email, password });

     
      if (response.token) {
       
        localStorage.setItem('authToken', response.token);

       
        dispatch(setToken(response.token));

        navigate('/admin');
        console.log('success');
        
      } else {
       
        setError('Логин не удался. Проверьте данные.');
        console.log('Логин не удался. Проверьте данные.');
        
      }
    } catch (err) {
     
      setError('Ошибка при входе: ' + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.formCard}>
        <h2 className={styles.formTitle}>Вход</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
  
};

export default Login;


"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDJjYTYwYmU1YmVmMTA2MDdmNjIxYyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyNDMwOTk1LCJleHAiOjE3MzI0MzQ1OTV9.PCCRDbvHL10TNDUw-iBKS7XGwGBpZBylPfDcsW9szAA"