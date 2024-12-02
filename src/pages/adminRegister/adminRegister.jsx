import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux-toolkit/reducers/usersSlice/usersSlice';
import { useNavigate } from 'react-router-dom';
import styles from './adminRegister.module.css';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser({ email, password, role: 'user' }));
      if (registerUser.fulfilled.match(result)) {
        navigate('/login');
      } else {
        console.error('Ошибка регистрации:', result.error.message);
      }
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h1 className={styles.formTitle}>Регистрация</h1>
        {status === 'failed' && error && (
          <p className={styles.errorMessage}>{error}</p>
        )}
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
        <button
          type="submit"
          className={styles.button}
          disabled={status === 'loading'}
        >
          Зарегистрироваться
        </button>
        <p className={styles.helperText}>
          Забыли пароль? <a href="/reset">Восстановить</a>
        </p>
      </form>
    </div>
  );
  
};

export default Register;
