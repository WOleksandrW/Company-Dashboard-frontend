import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import api from '../../api';
import { Box, Button, IconButton, Pagination, Skeleton, TextField } from '@mui/material';
import { BreadcrumbsUsage, SelectUsage, CompanyCard, GridListUsage } from '../../components';
import { PopupCreateCompany } from './components';
import { EOrder, EQueryKeys } from '../../types/enums';
import { TGetAllCompanies } from '../../types/types';

import { FaPlus } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';

import styles from './CompaniesList.module.scss';

function CompaniesList() {
  const [titleOrder, setTitleOrder] = useState<string>('');
  const [serviceOrder, setServiceOrder] = useState<string>('');
  const [createdAt, setCreatedAt] = useState('');
  const [page, setPage] = useState(1);
  const [valueCapitalMin, setValueCapitalMin] = useState<number | undefined>(undefined);
  const [valueCapitalMax, setValueCapitalMax] = useState<number | undefined>(undefined);
  const [openPopup, setOpenPopup] = useState(false);

  const [capitalMin] = useDebounce(valueCapitalMin, 500);
  const [capitalMax] = useDebounce(valueCapitalMax, 500);

  const {
    isLoading,
    data: companies,
    refetch
  } = useQuery(
    [EQueryKeys.COMPANIES_LIST, titleOrder, serviceOrder, page, createdAt, capitalMin, capitalMax],
    () => {
      const body: TGetAllCompanies = { limit: 10 };

      if (Object.values(EOrder).includes(titleOrder as EOrder)) {
        body.titleOrder = titleOrder as EOrder;
      }
      if (Object.values(EOrder).includes(serviceOrder as EOrder)) {
        body.serviceOrder = serviceOrder as EOrder;
      }

      return api.companies.getAll({
        ...body,
        page,
        createdAt,
        capitalMin,
        capitalMax
      });
    },
    {
      select: ({ data }) => data
    }
  );

  useEffect(() => {
    setPage(1);
  }, [capitalMin, capitalMax, titleOrder, serviceOrder, createdAt]);

  return (
    <section className={styles['page']}>
      <BreadcrumbsUsage list={[{ to: '/', text: 'Home' }, { text: 'Companies list' }]} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px'
        }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <TextField
              type="date"
              label="Created at"
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
            <TextField
              type="number"
              label="Minimal capital"
              value={valueCapitalMin}
              onChange={(e) => setValueCapitalMin(+e.target.value)}
            />
            <TextField
              type="number"
              label="Maximal capital"
              value={valueCapitalMax}
              onChange={(e) => setValueCapitalMax(+e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <SelectUsage
              label="Title order"
              list={[
                { value: EOrder.ASC, text: EOrder.ASC },
                { value: EOrder.DESC, text: EOrder.DESC }
              ]}
              hasNone={true}
              value={titleOrder}
              onChange={(value) => setTitleOrder(value)}
              sx={{ width: 160 }}
            />
            <SelectUsage
              label="Service order"
              list={[
                { value: EOrder.ASC, text: EOrder.ASC },
                { value: EOrder.DESC, text: EOrder.DESC }
              ]}
              hasNone={true}
              value={serviceOrder}
              onChange={(value) => setServiceOrder(value)}
              sx={{ width: 160 }}
            />
          </Box>
        </Box>
        <IconButton
          size="large"
          onClick={() => {
            refetch();
          }}>
          <IoReload />
        </IconButton>
        <Button
          startIcon={<FaPlus />}
          onClick={() => setOpenPopup(true)}
          sx={{ typography: 'body1' }}>
          Create Company
        </Button>
      </Box>
      {isLoading ? (
        <GridListUsage sx={{ flex: 1 }}>
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} variant="rounded" sx={{ height: '100%' }} />
            ))}
        </GridListUsage>
      ) : companies?.length ? (
        <GridListUsage>
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </GridListUsage>
      ) : (
        <div className={styles['empty-block']}>
          <p className="h2">List is empty</p>
        </div>
      )}
      <Pagination
        sx={{ alignSelf: 'center' }}
        count={10}
        page={page}
        onChange={(_, page) => setPage(page)}
      />
      <PopupCreateCompany open={openPopup} setOpen={setOpenPopup} />
    </section>
  );
}

export default CompaniesList;
