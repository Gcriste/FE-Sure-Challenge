import React, { useState, useCallback } from 'react';
import InfoTable from '../InfoTable';
import { PolicyHolderDataType, RowType, AddressType } from './types';
import { Button, Box, Stack, CircularProgress, Alert } from '@mui/material';
import { useQuery } from 'react-query';

const PolicyHoldersView = () => {
  const [additionalPolicyHolderData, setAdditionalPolicyHolderData] =
    useState<PolicyHolderDataType>();

  const {
    isLoading: policyHolderLoading,
    error: policyHolderError,
    data: policyHolderData,
  } = useQuery('policyholders', () =>
    fetch(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
    ).then((res) => res.json())
  );

  const handleClick = () => {
    const holder = {
      name: 'Griffin',
      age: 32,
      address: {
        line1: '230 Blue Street',
        line2: 'Apartment 4',
        city: 'Nashville',
        state: 'TN',
        postalCode: '23092',
      },
      phoneNumber: '888-833-9403',
    };

    fetch(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holder),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAdditionalPolicyHolderData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getFormattedAddress = (address: AddressType) => {
    const { line1, line2, city, state, postalCode } = address;
    const formattedAddress = `${line1} ${line2} ${city}, ${state} ${postalCode}`;
    return formattedAddress;
  };

  const getFormattedData = useCallback(
    (data: PolicyHolderDataType) => {
      let policyHolders = [{}];
      data?.policyHolders.forEach((item, index) => {
        for (const [key, value] of Object.entries(item)) {
          // format address correctly into string
          if (key === 'address') {
            policyHolders = [
              ...policyHolders,
              {
                key: 'Address',
                value: getFormattedAddress(value as AddressType),
                hasTableDivider: true,
                index,
              },
            ];
          }
          // format phone number text correctly into string
          else if (key === 'phoneNumber') {
            policyHolders = [
              ...policyHolders,
              {
                key: 'Phone number',
                value: value.toString(),
                hasTableDivider: true,
                index,
              },
            ];
          }
          // return yes or no for isPrimary
          else if (key === 'isPrimary') {
            policyHolders = [
              ...policyHolders,
              {
                key: 'Primary policyholder?',
                value: value === true ? 'yes' : 'no',
                hasTableDivider: true,
                index,
              },
            ];
          }
          //check to see if object is empty first, then populate array with correct data
          else {
            policyHolders =
              Object.keys(policyHolders?.[0]).length === 0
                ? [
                    {
                      key: key.charAt(0).toUpperCase() + key.slice(1),
                      value: value.toString(),
                      hasTableDivider: true,
                      index,
                    },
                  ]
                : [
                    ...policyHolders,
                    {
                      key: key.charAt(0).toUpperCase() + key.slice(1),
                      value: value.toString(),
                      hasTableDivider: true,
                      index,
                    },
                  ];
          }
        }
      });
      return policyHolders as RowType[];
    },
    [policyHolderData, additionalPolicyHolderData]
  );

  const loadingSpinner = (
    <Box sx={{ textAlign: 'center', width: '100%' }}>
      <CircularProgress />
    </Box>
  );

  const errorMessage = (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        An error has occurred, please try refreshing the page.
      </Alert>
    </Stack>
  );

  return (
    <>
      {policyHolderError ? (
        errorMessage
      ) : policyHolderLoading ? (
        loadingSpinner
      ) : policyHolderData?.policyHolders?.length ? (
        <InfoTable
          header={'Policy Holders'}
          rows={getFormattedData(policyHolderData)}
        />
      ) : null}

      <Box
        sx={{
          paddingTop: '32px',
        }}
      >
        {additionalPolicyHolderData?.policyHolders?.length ? (
          <InfoTable
            header={'NewPolicy Holders'}
            rows={getFormattedData(additionalPolicyHolderData)}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          paddingTop: '16px',
          textAlign: 'center',
        }}
      >
        <Button
          onClick={handleClick}
          variant="contained"
          color="secondary"
          size="large"
        >
          Add a policyholder
        </Button>
      </Box>
    </>
  );
};

export default PolicyHoldersView;

//TODO
// Separate out the get and post requests into different file
// I used React Query for fetching on initial page load, and a normal fetch post request for on button click to post new policy holders. We should consolidate to one pattern for consistency, but just wanted to show two different options.
// We should add a form that allows users to post new policy holders (assuming they have correct permissions)
// We should handle loading and error in more consistent and generic way. Using react query we can destructure those values from the query, but we could use loading lines in a table instead of a spinner and come up with standardized error handling as well.
// There should be unit tests written for the get and posts requests to make sure we are getting and posting the data we are expecting
// We should also add a unit test for the data feeding into the InfoTable to make sure it is correct
// If we are having to translate text we should localize all text into resource strings so they can be handled by an i18n package
// make sure components are rendering the desired amount of times and implement memoization if needed
