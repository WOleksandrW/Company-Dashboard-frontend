import { PieChart } from '@mui/x-charts';

interface IProps {
  className?: string;
  data: {
    id: number;
    value: number;
    label: string;
  }[];
}

function PieChartUsage({ className, data }: IProps) {
  return (
    <PieChart
      sx={{ typography: 'body1' }}
      className={className}
      series={[
        {
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 1,
          cornerRadius: 4,
          cx: 95,
          cy: 95,
          data
        }
      ]}
      height={200}
      width={200}
      legend={{ hidden: true }}
    />
  );
}

export default PieChartUsage;
