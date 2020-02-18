import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Component, Suspense } from 'react';

import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import { getFakeChartData } from './_mock';
import styles from './style.module.less';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));

interface AnalysisProps {
  dashboardAnalysis: any;
  loading: boolean;
}

interface AnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  loading: boolean;
  rangePickerValue: RangePickerValue;
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    salesType: 'all',
    currentTabKey: '',
    loading: true,
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  handleChangeSalesType = (e: RadioChangeEvent) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key: string) => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    this.setState({
      rangePickerValue,
    });
  };

  selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });
  };

  isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey, loading } = this.state;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = getFakeChartData;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>Details</Menu.Item>
        <Menu.Item>Mores</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <div className={styles.dashboardContainer}>
        <GridContent>
          <React.Fragment>
            <Suspense fallback={<PageLoading />}>
              <IntroduceRow loading={loading} visitData={visitData} />
            </Suspense>
            <Suspense fallback={null}>
              <SalesCard
                rangePickerValue={rangePickerValue}
                salesData={salesData}
                isActive={this.isActive}
                handleRangePickerChange={this.handleRangePickerChange}
                loading={loading}
                selectDate={this.selectDate}
              />
            </Suspense>
            <Row
              gutter={24}
              type="flex"
              style={{
                marginTop: 24,
              }}
            >
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <TopSearch
                    loading={loading}
                    visitData2={visitData2}
                    searchData={searchData}
                    dropdownGroup={dropdownGroup}
                  />
                </Suspense>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Suspense fallback={null}>
                  <ProportionSales
                    dropdownGroup={dropdownGroup}
                    salesType={salesType}
                    loading={loading}
                    salesPieData={salesPieData}
                    handleChangeSalesType={this.handleChangeSalesType}
                  />
                </Suspense>
              </Col>
            </Row>
            <Suspense fallback={null}>
              <OfflineData
                activeKey={activeKey}
                loading={loading}
                offlineData={offlineData}
                offlineChartData={offlineChartData}
                handleTabChange={this.handleTabChange}
              />
            </Suspense>
          </React.Fragment>
        </GridContent>
      </div>
    );
  }
}

export default Analysis;
