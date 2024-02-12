// material-ui
import TextField from '@mui/material/TextField';
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
import Chip from '@mui/material/Chip';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useContext, useState } from 'react';
import { specialityContext } from 'contexts/speciality';
import { useTheme } from '@emotion/react';
import { Axios } from 'utils/axios';
import { annoucementContext } from 'contexts/annoucement';

const SamplePage = () => {
  const theme = useTheme();
  const [facultes, setFacultes] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [specialitys, setSpecialitys] = useState([]);
  const [years, setYears] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const speciality = useContext(specialityContext);
  const [loading, setIsloading] = useState(false);
  const { posts, setPosts } = useContext(annoucementContext);
  const sendPost = () => {
    if (!title || !content || !facultes.length) {
      alert('fill all the fields');
      return;
    }
    const req = {
      title,
      content,
      faculte: facultes[0],
      departement: departements,
      speciality: specialitys,
      year: years
    };
    console.log(req);
    if (departements.length === 0) delete req.departement;
    if (specialitys.length === 0) delete req.speciality;
    if (years.length === 0) delete req.year;
    Axios.post('/announcement', req)
      .then((res) => {
        setPosts((p) => [res.data, ...p]);
        setIsloading(false);
        alert('post added');
      })
      .catch((err) => {
        alert(err?.response?.data?.message || err?.response?.data);
        console.log(err);
        setIsloading(false);
      });
  };
  return (
    <MainCard title="Add Post">
      <TextField
        onChange={(e) => {
          setTitle(e?.target.value);
        }}
        value={title}
        fullWidth
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
      <Grid container spacing={matchDownSM ? 0 : 2}>
        <Grid item xs={12} sx={{ width: '100%' }}>
          {speciality?.faculte?.map((e, i) => (
            <Chip
              label={e}
              onClick={() => {
                if (facultes.includes(e)) {
                  setFacultes(facultes.filter((f) => f !== e));
                  return;
                } else setFacultes([...facultes, e]);
              }}
              variant={facultes.includes(e) ? 'filled' : 'outlined'}
            />
          ))}
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          {speciality?.departements
            ?.filter((e) => facultes?.includes(e?.faculte))
            ?.map((e, i) => (
              <Chip
                label={e?.departement}
                onClick={() => {
                  if (departements.includes(e?.departement)) {
                    setDepartements(departements.filter((f) => f !== e?.departement));
                    return;
                  } else setDepartements([...departements, e?.departement]);
                }}
                variant={departements.includes(e?.departement) ? 'filled' : 'outlined'}
              />
            ))}
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          {speciality?.speciality
            ?.filter((e) => departements?.includes(e?.departement))
            ?.map((e, i) => (
              <Chip
                label={e?.speciality}
                onClick={() => {
                  if (specialitys.includes(e?.speciality)) {
                    setSpecialitys(specialitys.filter((f) => f !== e?.speciality));
                    return;
                  } else setSpecialitys([...specialitys, e?.speciality]);
                }}
                variant={specialitys.includes(e?.speciality) ? 'filled' : 'outlined'}
              />
            ))}
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          {speciality?.years?.map((e, i) => (
            <Chip
              label={e}
              onClick={() => {
                if (years.includes(e)) {
                  setYears(years.filter((f) => f !== e));
                  return;
                } else setYears([...years, e]);
              }}
              variant={specialitys.includes(e) ? 'filled' : 'outlined'}
            />
          ))}
        </Grid>
        <TextareaAutosize
          onChange={(e) => {
            setContent(e?.target.value);
          }}
          value={content}
          minRows={1}
          style={{ width: '100%' }}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
        />
      </Grid>
      <Button disabled={loading} onClick={sendPost} variant="contained">
        post
      </Button>
    </MainCard>
  );
};

export default SamplePage;
