import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';
import { Axios } from 'utils/axios';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  const orangeDark = theme.palette.secondary[800];
  const [post, setPost] = useState();
  useEffect(() => {
    Axios.get('/announcement/admin')
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                Views Chart
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                {post?.reduce((p, c) => p + c?.views || 0, 0)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
       
      </Grid>
      <Chart {...chartData} />
    </Card>
  );
};

export default BajajAreaChartCard;