import PropTypes from 'prop-types';
// import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
// import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Axios } from 'utils/axios';
import { useContext, useEffect, useState } from 'react';
import { annoucementContext } from 'contexts/annoucement';
import { toasty } from 'utils/toast';
import { searchContext } from 'contexts/searchContext';

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const [posts, setPosts] = useState();
  const [dPosts, setDPosts] = useState([]);
  const postsContext = useContext(annoucementContext);
  const { search } = useContext(searchContext);
  const regex = new RegExp(search, 'i');
  useEffect(() => {
    Axios.get('/announcement/admin')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
    setInterval(() => {
      Axios.get('/announcement/admin')
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.error(err));
    }, 6000);
  }, []);
  const deletePost = (id) => {
    Axios.delete('/announcement', {
      data: {
        ids: [id]
      }
    })
      .then((res) => {
        setPosts((p) => p.filter((e) => e?._id !== id));
        postsContext.setPosts((p) => p.filter((e) => e?._id !== id));
      })
      .catch((err) => {
        toasty(err?.respone?.data?.toString() || "can't deleted", {
          toastId: 'post',
          autoClose: 5000,
          type: 'warning'
        });
        console.error(err);
      });
  };
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Announcements</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <BajajAreaChartCard />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column">
                  {posts
                    ?.filter((e) => !search || regex.test(e?.title) || regex.test(e?.departement) || regex.test(e?.speciality))
                    ?.map((e, i) => (
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {e?.title}
                            </Typography>
                          </Grid>
                          {/* <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {e?.departement}
                            </Typography>
                          </Grid> */}
                          {/* <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {e?.speciality}
                            </Typography>
                          </Grid> */}
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {e?.views}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {e?.createAt}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => deletePost(e?._id)} color="secondary" aria-label="delete">
                              <DeleteOutline o color="red" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
