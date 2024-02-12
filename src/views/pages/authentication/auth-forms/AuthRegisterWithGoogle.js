import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Typography,
  useMediaQuery
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Axios } from '../../../../utils/axios';
import config from '../../../../config';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);
  const [{ faculte, departements }, setSpeciality] = useState({});
  const [level] = useState();

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
      <Formik
        initialValues={{
          departement: '',
          faculte: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          departement: Yup.string().max(255).required('Departement is required'),
          faculte: Yup.string().max(255).required('Faculte is required')
        })}
        onSubmit={(values) => {
          window.location.href = config.BACKEND_URL + `/auth/google?departement=${values.departement}&faculty=${values.faculte}&google=true`;
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
                <Grid item xs={12} sx={{ width: '100%' }}>
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
