// material-ui
import TextField from '@mui/material/TextField';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import QuillEditor from './QuilEditor';
import { toasty } from 'utils/toast';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});
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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const sendPost = () => {
    if (!title || !content || !facultes.length || uploadedFile === null) {
      alert('fill all the fields');
      return;
    }
    const formData = new FormData();
    formData.append('thumbnail', uploadedFile); // Append the file to the form data
    formData.append('title', title);
    formData.append('content', content);
    formData.append('faculte', facultes[0]);
    departements?.map((e) => formData.append('departement[]', e));
    specialitys?.map((e) => formData.append('speciality[]', e));
    years?.map((e) => formData.append('year[]', e));
    console.log(formData.get('thumbnail'));
    Axios.post('/announcement', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        setPosts((p) => [res.data, ...p]);
        setIsloading(false);
        alert('post added');
        initialize();
      })
      .catch((err) => {
        toasty(err?.response?.data?.message || err?.response?.data?.toString(), {
          toastId: 'post',
          autoClose: 5000,
          type: 'warning'
        });
        console.log(err);
        setIsloading(false);
      });
  };
  const upload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const onEditorChange = (value) => {
    setContent(value);
    // console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };
  const initialize = () => {
    setFiles([]);
    setTitle('');
    setFacultes([]);
    setDepartements([]);
    setSpecialitys([]);
    setYears([]);
  };
  return (
    <MainCard title="Add Post">
      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
        thumbnail file
        <VisuallyHiddenInput onChange={upload} type="file" />
      </Button>
      <TextField
        onChange={(e) => {
          setTitle(e?.target.value);
        }}
        value={title}
        fullWidth
        id="outlined-basic"
        label="Title"
        variant="outlined"
        sx={{ margin: '16px 0' }}
      />
      <Grid container spacing={matchDownSM ? 0 : 2}>
        <Grid item xs={12} sx={{ width: '100%', marginBottom: '16px' }}>
          {' '}
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
        <Grid item xs={12} sx={{ width: '100%', marginBottom: '16px' }}>
          {' '}
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
        <Grid item xs={12} sx={{ width: '100%', marginBottom: '16px' }}>
          {' '}
          {/* Add marginBottom to create a gap */}
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
        <Grid item xs={12} sx={{ width: '100%', marginBottom: '16px' }}>
          {' '}
          {/* Add marginBottom to create a gap */}
          {speciality?.years?.map((e, i) => (
            <Chip
              label={e}
              onClick={() => {
                if (years.includes(e)) {
                  setYears(years.filter((f) => f !== e));
                  return;
                } else setYears([...years, e]);
              }}
              variant={years.includes(e) ? 'filled' : 'outlined'}
            />
          ))}
        </Grid>
        <QuillEditor placeholder={'Start Posting Something'} onEditorChange={onEditorChange} onFilesChange={onFilesChange} />
        {/* <TextareaAutosize
          onChange={(e) => {
            setContent(e?.target.value);
          }}
          value={content}
          minRows={1}
          style={{ width: '100%' }}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          sx={{ margin: '16px 0' }} // Add margin to create a gap
        /> */}
      </Grid>
      <Button disabled={loading} onClick={sendPost} variant="contained">
        post
      </Button>
    </MainCard>
  );
};

export default SamplePage;
