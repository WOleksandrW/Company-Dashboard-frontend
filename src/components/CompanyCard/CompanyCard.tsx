import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, SxProps, Theme, Typography } from '@mui/material';
import { merge } from 'lodash';
import { ImageBlock, MiniDataList, TooltipUsage } from '../';
import getImageFromBuffer from '@root/utils/getImageFromBuffer';
import { TCompany } from '@root/types/company.type';

interface IProps {
  company: TCompany;
  sx?: SxProps<Theme>;
}

function CompanyCard({ company, sx }: IProps) {
  const { id, image, title, service, address, capital } = company;

  const sxProps = useMemo(
    () => merge({ display: 'flex', flexDirection: 'column', borderRadius: '8px' }, sx),
    [sx]
  );
  const imgSrc = useMemo(
    () => (image ? getImageFromBuffer(image.data.data, image.mimeType) : undefined),
    [image]
  );

  return (
    <Card sx={sxProps}>
      <ImageBlock imgSrc={imgSrc} altText={title} sx={{ height: '260px', marginX: 'auto' }} />
      <CardContent>
        <TooltipUsage title={title}>
          <Typography variant="h6" className="text-ellipsis" sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
        </TooltipUsage>
        <MiniDataList
          list={[
            { subtitle: 'Service:', value: service },
            { subtitle: 'Address:', value: address },
            { subtitle: 'Capital:', value: capital }
          ]}
          sx={{ padding: 0 }}
          sxItem={{ paddingX: 0 }}
        />
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button
          component={NavLink}
          to={`/companies/${id}`}
          sx={{ typography: 'body1' }}
          size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default CompanyCard;
