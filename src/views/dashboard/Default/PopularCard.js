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
import { useEffect, useState } from 'react';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const theme = useTheme();
  const [post, setPost] = useState();
  const [dPosts, setDPosts] = useState([]);
  useEffect(() => {
    Axios.get('/announcement/admin')
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const deletePost = (id) => {
    Axios.delete('/announcement', {
      data: {
        ids: [id]
      }
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
                  {post?.map((e, i) => (
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {e?.title}
                          </Typography>
                        </Grid>
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
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button href='/posts' size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
