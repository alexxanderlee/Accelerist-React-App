import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { IFilters } from 'src/interfaces';
import { SettingsIcon, SearchIcon, XIcon } from 'src/assets/icons';
import { useAppDispatch } from 'src/state/hooks';
import { companiesActions } from 'src/state/features/companies';
import { InputField, MultiSelectField, TabSelectorField } from 'src/components/fields';
import { Button } from 'src/components/ui';
import { ageRanges, income, ethnicities, genders } from 'src/constants/searchFilters';
import device from 'src/constants/devices';

const SearchBar: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [filtersVisible, setFiltersVisible] = React.useState<boolean>(false);

  function onSubmit(filters: IFilters) {
    history.push(`/search?${queryString.stringify(filters, { arrayFormat: 'bracket' })}`)
    dispatch(companiesActions.getCompanies({ page: 1, limit: 12, filters }));
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <>
          <Header>
            <HeaderWrapper>
              <PageTitle>Search</PageTitle>
              <SearchInputWrapper>
                <Field
                  name="q"
                  render={({ input }) => <SearchInput {...input} placeholder="Search" />}
                />
                <SearchButtons>
                  <SearchBtn type="button" onClick={() => {
                    form.reset();
                    !pristine && onSubmit({});
                  }}>
                    <XIcon />
                  </SearchBtn>
                  <SearchBtn type="button" onClick={() => setFiltersVisible(!filtersVisible)}>
                    <SettingsIcon />
                  </SearchBtn>
                  <SearchBtn type="submit" onClick={handleSubmit}>
                    <SearchIcon />
                  </SearchBtn>
                </SearchButtons>
              </SearchInputWrapper>
            </HeaderWrapper>
          </Header>
          {filtersVisible && (
            <Body>
              <Container>
                <FiltersBlock>
                  <FiltersTitle>Filters</FiltersTitle>
                  <FiltersSection>
                    <SectionTitle>Company</SectionTitle>
                    <SectionContent>
                      <Field
                        name="industry"
                        label="Industry"
                        placeholder="Search"
                        component={InputField}
                      />
                      <Field
                        name="location"
                        label="Geographic Location"
                        placeholder="Search"
                        component={InputField}
                      />
                      <Field
                        name="csrFocusIds"
                        label="CSR Focus"
                        placeholder="Select..."
                        options={[]}
                        component={MultiSelectField}
                      />
                      <Field
                        name="totalAnnualContributors"
                        label="Total Annual Contributions"
                        type="number"
                        placeholder="Enter total annual contributions"
                        component={InputField}
                      />
                      <Field
                        name="revenueMin"
                        label="Min Revenue, $"
                        type="number"
                        placeholder="Enter min revenue"
                        component={InputField}
                      />
                      <Field
                        name="revenueMax"
                        label="Max Revenue, $"
                        type="number"
                        placeholder="Enter max revenue"
                        component={InputField}
                      />
                      <Field
                        name="sdgGoals"
                        label="SDG Goals"
                        placeholder="Select..."
                        options={[]}
                        component={MultiSelectField}
                      />
                    </SectionContent>
                  </FiltersSection>
                  <FiltersSection>
                    <SectionTitle>Customer Demographics</SectionTitle>
                    <SectionContent>
                      <Field
                        name="gender"
                        label="Gender"
                        options={genders}
                        defaultOptionIndex={2}
                        component={TabSelectorField}
                      />
                      <EmptyField />
                      <Field
                        name="income"
                        label="Household income"
                        placeholder="Select..."
                        options={income}
                        component={MultiSelectField}
                      />
                      <Field
                        name="ethnicities"
                        label="Ethnicity"
                        placeholder="Select..."
                        options={ethnicities}
                        component={MultiSelectField}
                      />
                      <Field
                        name="ageRanges"
                        label="Age"
                        placeholder="Select..."
                        options={ageRanges}
                        component={MultiSelectField}
                      />
                    </SectionContent>
                  </FiltersSection>
                  <Buttons>
                    <Button
                      text="Cancel"
                      variant="OutlinedSecondary"
                      customStyle={'margin-right: 8px;'}
                      onClick={() => {
                        setFiltersVisible(false);
                        form.reset();
                        onSubmit({});
                      }}
                    />
                    <Button
                      text="Search"
                      customStyle={'width: 146px;'}
                      onClick={handleSubmit}
                      disabled={submitting || pristine}
                    />
                  </Buttons>
                </FiltersBlock>
              </Container>
          </Body>
          )}
        </>
      )}
    />
  );
};

const Header = styled.div`
  background-color: #FFFFFF;
  height: 96px;

  @media ${device.mobileM} {
    background-color: #F9F9F9;
    height: unset;
  }
`;

const HeaderWrapper = styled.div`
  max-width: 1340px;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  
  @media ${device.mobileL} {
    padding: 0 16px;
    flex-direction: column;
    align-items: unset;
  }
`;

const PageTitle = styled.h1`
  margin-right: 82px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  color: #122434;

  @media ${device.laptopM} {
    font-size: 28px;
    margin-right: 32px;
  }

  @media ${device.tablet} {
    font-size: 28px;
    margin-right: 32px;
  }

  @media ${device.mobileL} {
    font-size: 19px;
    margin: 0;
    margin-top: 11px;
  }

  @media ${device.mobileM} {
    font-size: 16px;
    margin: 0;
    margin-top: 16px;
  }
`;

const SearchInputWrapper = styled.form`
  position: relative;

  @media ${device.laptop} {
    width: 100%;
    max-width: 715px;
    margin-right: 18px;
  }

  @media ${device.tablet} {
    width: 100%;
    max-width: 576px;
  }

  @media ${device.mobileL} {
    margin-top: 4px;
  }

  @media ${device.mobileL} {
    margin-top: 8px;
  }
`;

const SearchInput = styled.input`
  width: 715px;
  padding: 9px 110px 9px 24px;
  background-color: #F1F4F5;
  border-radius: 6px;
  border: 1px solid #F1F4F5;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  outline: none;
  transition: border 0.05s;

  &::placeholder {
    color: #737373;
  }

  &:focus {
    border: 1px solid #737373;
  }

  @media ${device.laptop} {
    width: 100%;
  }

  @media ${device.mobileL} {
    padding-left: 16px;
  }
`;

const SearchButtons = styled.div`
  position: absolute;
  top: 6px;
  right: 12px;
`;

const SearchBtn = styled.button`
  padding: 0;
  margin-right: 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Body = styled.div`
  background-color: #F9F9F9;
`;

const Container = styled.div`
  max-width: 1340px;
  padding: 32px 20px 0 20px;
  margin: 0 auto;

  @media ${device.mobileL} {
    padding: 12px 16px 0 12px;
  }
`;

const FiltersBlock = styled.div`
  max-width: 1096px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 6px;

  @media ${device.tablet} {
    padding: 32px 24px;
  }

  @media ${device.tabletXS} {
    padding: 24px 17px;
  }
`;

const FiltersTitle = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;

  @media ${device.mobileM} {
    font-size: 16px;
  }
`;

const FiltersSection = styled.section`
  margin-top: 16px;
  margin-bottom: 40px;

  @media ${device.mobileM} {
    margin-top: 12px;
    margin-bottom: 28px;
  }
`;

const SectionTitle = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;

  @media ${device.mobileM} {
    font-size: 12px;
  }
`;

const SectionContent = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 24px;

  @media ${device.tabletXS} {
    grid-template-columns: 1fr;
  }
`;

const EmptyField = styled.div`
  @media ${device.tabletXS} {
    display: none;
  }
`;

const Buttons = styled.div`
  display: flex;
`;

export default SearchBar;
