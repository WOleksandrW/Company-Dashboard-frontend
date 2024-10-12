import { useMemo } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ImageBlock, MiniDataList, TooltipUsage } from '../';
import getImageFromBuffer from '../../utils/getImageFromBuffer';
import { TCompany } from '../../types/TCompany';

import styles from './CompanyCard.module.scss';

interface IProps {
  company: TCompany;
}

function CompanyCard({ company }: IProps) {
  const { id, image, title, service, address, capital } = company;

  const imgSrc = useMemo(() => {
    if (image) return getImageFromBuffer(image.data.data, image.mimeType);
  }, [image]);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '8px' }}>
      <ImageBlock className={styles['img-block']} imgSrc={imgSrc} altText={title} />
      <CardContent className="content-color">
        <TooltipUsage title={title}>
          <Typography
            variant="h6"
            className="content-dark-color text-ellipsis"
            sx={{ textAlign: 'center' }}>
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
        <NavLink className="link" to={`/company/${id}`}>
          <Button sx={{ typography: 'body1' }} size="small">
            View
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}

export default CompanyCard;