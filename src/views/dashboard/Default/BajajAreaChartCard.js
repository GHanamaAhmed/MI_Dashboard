import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import { Axios } from 'utils/axios';
import { annoucementContext } from 'contexts/annoucement';

const chartData = {
  type: 'area',
  height: 95,
  options: {
    chart: {
      id: 'support-chart',
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: 'Ticket '
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      data: [0, 15, 10, 50, 30, 40, 25]
    }
  ]
};

const BajajAreaChartCard = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;
  const orangeDark = theme.palette.secondary[800];
  const { posts, setPosts } = useContext(annoucementContext);
  const [chartData, setChartData] = useState({
    type: 'area',
    height: 95,
    options: {
      chart: {
        id: 'support-chart',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: 'Ticket '
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      // {
      //   data: [0, 15, 10, 50, 30, 40, 25]
      // }
    ]
  });
  useEffect(() => {
    setChartData({
      ...chartData,
      series: [
        {
          data: posts?.map((e) => e?.views)
        }
      ]
    });
  }, [posts]);
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
                {posts?.reduce((p, c) => p + c?.views || 0, 0)}
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
