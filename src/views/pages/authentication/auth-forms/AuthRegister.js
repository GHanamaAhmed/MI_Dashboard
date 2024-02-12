import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/react-router-dom.development';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Axios } from '../../../../utils/axios';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [{ faculte, departements }, setSpeciality] = useState({});
  const navigate = useNavigate();
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const googleHandler = async () => {
    console.error('Register');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  React.useEffect(() => {
    Axios.get('/speciality')
      .then((res) => {
        setSpeciality(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              href="/auth/register/google"
              variant="outlined"
              fullWidth
              onClick={googleHandler}
              size="large"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign up with Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`,
                width: '100%' // Add this line
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
          fullName: '',
          departement: '',
          faculte: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Repeat Password is required'),
          fullName: Yup.string().max(255).required('Full Name is required'),
          departement: Yup.string().max(255).required('Departement is required'),
          faculte: Yup.string().max(255).required('Faculte is required')
        })}
        onSubmit={(values) => {
          const req = {
            email: values.email,
            password: values.password,
            name: values.fullName,
            departement: values.departement,
            faculty: values.faculte
          };
          Axios.post('/auth/local', req)
            .then(() => {
              navigate('/');
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        validator={() => ({})}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          console.log(isSubmitting);
          return (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sx={{ width: '100%' }}>
                  {' '}
                  {/* Add this line */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                    name="fullName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    defaultValue=""
                    error={Boolean(touched.fullName && errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>

                <Grid item xs={12} sx={{ width: '100%' }}>
                  {' '}
                  {/* Add this line */}
                  <TextField
                    fullWidth
                    label="Email Address / Username"
                    margin="normal"
                    name="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                  {' '}
                  {/* Add this line */}
                  <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ ...theme.typography.customInput }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                  {' '}
                  {/* Add this line */}
                  <TextField
                    fullWidth
                    label="Repeat Password"
                    margin="normal"
                    name="repeatPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={values.repeatPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.repeatPassword && errors.repeatPassword)}
                    helperText={touched.repeatPassword && errors.repeatPassword}
                    sx={{ ...theme.typography.customInput }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                  {' '}
                  {/* Add this line */}
                  <FormControl fullWidth error={Boolean(touched.faculte && errors.faculte)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-faculte">Faculte</InputLabel>
                    <Select
                      id="outlined-adornment-faculte"
                      value={values.faculte}
                      name="faculte"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="" disabled>
                        Select Faculte
                      </MenuItem>
                      {faculte?.map((e, i) => (
                        <MenuItem key={i} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.faculte && errors.faculte && (
                      <FormHelperText error id="standard-weight-helper-text--faculte">
                        {errors.faculte}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                  {' '}
                  {/* Add this line */}
                  <FormControl
                    fullWidth
                    error={Boolean(touched.departement && errors.departement)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-departement">Departement</InputLabel>
                    <Select
                      id="outlined-adornment-departement"
                      value={values.departement}
                      name="departement"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem value="" disabled>
                        Select Departement
                      </MenuItem>
                      {departements?.map((e, i) => (
                        <MenuItem key={i} value={e?.departement}>
                          {e?.departement}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.departement && errors.departement && (
                      <FormHelperText error id="standard-weight-helper-text--departement">
                        {errors.departement}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {strength !== 0 && (
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}

              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                    }
                    label={
                      <Typography variant="subtitle1">
                        Agree with &nbsp;
                        <Typography variant="subtitle1" component={Link} to="#">
                          Terms & Condition.
                        </Typography>
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                    Sign up
                  </Button>
                </AnimateButton>
              </Box>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
