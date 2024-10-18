import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import api from '../../api';
import { Box, Button, IconButton, Pagination, Skeleton, TextField } from '@mui/material';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';
import {
  BreadcrumbsUsage,
  EmptyMessage,
  SelectUsage,
  CompanyCard,
  GridListUsage,
  PopupCreateCompany,
  TextFieldUsage
} from '../../components';
import { EOrder } from '../../enums/order.enum';
import { EQueryKeys } from '../../enums/queryKeys.enum';
import { ERole } from '../../enums/role.enum';
import { TGetAllCompanies } from '../../types/types';
import { limitRecords } from '../../constants/queryParams';

import { FaPlus } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';

function CompaniesList() {
  const { data: userData } = useQueryCurrUser();
  const [titleOrder, setTitleOrder] = useState<string>('');
  const [serviceOrder, setServiceOrder] = useState<string>('');
  const [createdAt, setCreatedAt] = useState('');
  const [page, setPage] = useState(1);
  const [valueCapitalMin, setValueCapitalMin] = useState<number | string>('');
  const [valueCapitalMax, setValueCapitalMax] = useState<number | string>('');
  const [openPopup, setOpenPopup] = useState(false);

  const validate = (value: string | number) =>
    value === '' || (typeof value === 'number' && value > 0);

  const [capitalMin] = useDebounce(validate(valueCapitalMin) ? valueCapitalMin : '', 500);
  const [capitalMax] = useDebounce(validate(valueCapitalMax) ? valueCapitalMax : '', 500);

  const {
    isLoading,
    data: response,
    refetch
  } = useQuery(
    [EQueryKeys.COMPANIES_LIST, titleOrder, serviceOrder, page, createdAt, capitalMin, capitalMax],
    () => {
      const body: TGetAllCompanies = { limit: limitRecords };

      if (Object.values(EOrder).includes(titleOrder as EOrder)) {
        body.titleOrder = titleOrder as EOrder;
      }
      if (Object.values(EOrder).includes(serviceOrder as EOrder)) {
        body.serviceOrder = serviceOrder as EOrder;
      }

      if (typeof capitalMin === 'number' && capitalMin > 0) {
        body.capitalMin = capitalMin;
      }
      if (typeof capitalMax === 'number' && capitalMax > 0) {
        body.capitalMax = capitalMax;
      }

      return api.companies.getAll({
        ...body,
        page,
        createdAt
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
    <>
      <BreadcrumbsUsage list={[{ to: '/', text: 'Home' }, { text: 'Companies list' }]} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '40px',
          rowGap: '16px',
          '@media (max-width: 1024px)': {
            flexDirection: 'column',
            alignItems: 'stretch'
          },
          '@media (max-width: 500px)': {
            width: 'min(340px, 100%)',
            marginX: 'auto'
          }
        }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            '@media (max-width: 500px)': {
              flexDirection: 'column',
              gap: '16px'
            }
          }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              '@media (max-width: 500px)': {
                flexDirection: 'column',
                gap: '16px'
              }
            }}>
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
            <TextFieldUsage
              type="number"
              label="Minimal capital"
              value={valueCapitalMin}
              onChange={(e) => {
                const value = e.target.value === '' ? '' : +e.target.value;
                setValueCapitalMin(value);
              }}
              onBlur={(e) => {
                if (!e.target.value.length) e.target.value = '';
              }}
              errorMessage={!validate(valueCapitalMin) ? 'Value must be more than 0' : undefined}
            />
            <TextFieldUsage
              type="number"
              label="Maximal capital"
              value={valueCapitalMax}
              onChange={(e) => {
                const value = e.target.value === '' ? '' : +e.target.value;
                setValueCapitalMax(value);
              }}
              onBlur={(e) => {
                if (!e.target.value.length) e.target.value = '';
              }}
              errorMessage={!validate(valueCapitalMax) ? 'Value must be more than 0' : undefined}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              '@media (max-width: 500px)': {
                flexDirection: 'column',
                gap: '16px'
              }
            }}>
            <SelectUsage
              label="Title order"
              list={[
                { value: EOrder.ASC, text: EOrder.ASC },
                { value: EOrder.DESC, text: EOrder.DESC }
              ]}
              hasNone={true}
              value={titleOrder}
              onChange={(value) => setTitleOrder(value)}
              sx={{ width: 160, '@media (max-width: 500px)': { width: '100%', maxWidth: 'unset' } }}
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
              sx={{ width: 160, '@media (max-width: 500px)': { width: '100%', maxWidth: 'unset' } }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <IconButton
            size="large"
            onClick={() => {
              refetch();
            }}>
            <IoReload />
          </IconButton>
          {userData!.role === ERole.USER && (
            <Button
              startIcon={<FaPlus />}
              onClick={() => setOpenPopup(true)}
              sx={{ typography: 'body1', whiteSpace: 'nowrap' }}>
              Create Company
            </Button>
          )}
        </Box>
      </Box>
      {isLoading ? (
        <GridListUsage sx={{ flex: 1 }}>
          {Array(limitRecords)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} variant="rounded" sx={{ height: '100%' }} />
            ))}
        </GridListUsage>
      ) : response?.totalAmount ? (
        <>
          <GridListUsage>
            {response.list.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </GridListUsage>
          <Pagination
            sx={{ alignSelf: 'center', marginTop: 'auto' }}
            count={Math.ceil(response.totalAmount / limitRecords)}
            page={page}
            onChange={(_, page) => setPage(page)}
          />
        </>
      ) : (
        <EmptyMessage sx={{ flex: 1, justifyContent: 'center' }} message="List is empty" />
      )}
      {userData!.role === ERole.USER && (
        <PopupCreateCompany open={openPopup} setOpen={setOpenPopup} />
      )}
    </>
  );
}

export default CompaniesList;
