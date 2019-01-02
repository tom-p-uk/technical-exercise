import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import moment from 'moment';

import {
    getSlots,
    selectSlot,
    selectSpecialDelivery,
} from '../../actions/picker';
import {
    Wrapper,
    DateItem,
    Button,
    SlotsWrapper,
    Slot,
    PaginationWrapper,
    Pagination,
    Limit,
    Error
} from './styled';

class Picker extends Component {
    state = {
        offset: 0,
        limit: 3,
    }

    componentDidMount() {
        const { offset, limit } = this.state;

        this.props.dispatchGetSlots(offset, limit);
    }

    getSlotColors = data => {
        let colors = {
            am: '#ad2',
            pm: '#ad2',
            eve: '#ad2',
        };

        if (!data.am) colors.am = '#f00';
        if (!data.pm) colors.pm = '#f00';
        if (!data.eve) colors.eve = '#f00';

        if (data.special_delivery) {
            colors = {
                am: '#f90',
                pm: '#f90',
                eve: '#f90',
            };
        }

        return colors;
    }

    renderSlots = data => {
        const slots = data.map(slot => {
            const { date, id, is_second_friday, special_delivery } = slot;
            const colors = this.getSlotColors(slot);
            const disabled = (is_second_friday || special_delivery);
            const dateFormatted = moment(date).format('ddd, MMM Do');

            return (
                <DateItem>
                    <span>{dateFormatted}</span>
                    <Slot color={colors.am} onClick={() => this.props.dispatchSelectSlot(id, 'AM', disabled)} disabled={disabled}>AM</Slot>
                    <Slot color={colors.pm} onClick={() => this.props.dispatchSelectSlot(id, 'PM', disabled)} disabled={disabled}>PM</Slot>
                    <Slot color={colors.eve} onClick={() => this.props.dispatchSelectSlot(id, 'EVE', disabled)} disabled={disabled}>EVE</Slot>
                </DateItem>
            );
        });

        return (
            <SlotsWrapper>
                {slots}
            </SlotsWrapper>
        );
    }

    onClickPagination = isNextPage => {
        const offset = (isNextPage) ? this.state.offset + 1 : this.state.offset - 1;

        this.setState({ offset }, () => {
            this.props.dispatchGetSlots(this.state.offset, this.state.limit);
        });
    }

    renderPagination() {
        const { offset, limit } = this.state;
        const { slotCount } = this.props.picker;

        const prev = (offset === 0)
            ? null
            : <Pagination gridArea='prev' onClick={() => this.onClickPagination(false)}>Previous</Pagination>;

        const next = (limit * (offset + 1) >= slotCount)
            ? null
            : <Pagination gridArea='next' onClick={() => this.onClickPagination(true)}>Next</Pagination>;

        const limitSelect = this.renderLimitSelect();

        return (
            <PaginationWrapper>
                {prev}
                {limitSelect}
                {next}
            </PaginationWrapper>
        );
    }

    handleChangeSelect = (event) => {
        this.setState({ limit: parseInt(event.target.value), offset: 0 }, () => {
            this.props.dispatchGetSlots(this.state.offset, this.state.limit);
        });
      }

    renderLimitSelect() {
        const { limit } = this.state;

        return (
            <Limit>
                <span>Select num of days: </span>
                <select value={limit} onChange={this.handleChangeSelect}>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </Limit>
        );
    }

    renderErrorText() {
        const {
            getSlotsError,
            selectSlotError,
            selectSpecialDeliveryError,
        } = this.props.picker;

        let text = '';

        if (getSlotsError) text = getSlotsError;
        if (selectSlotError) text = selectSlotError;
        if (selectSpecialDeliveryError) text = selectSpecialDeliveryError;

        return <Error>{text}</Error>;
    }

    renderSpecialDeliveryButton() {
        const { specialDeliverySelected, selectSpecialDeliveryLoading } = this.props.picker;
        const buttonText = specialDeliverySelected ? 'Deselect' : 'Select';

        return (
            <Button
                onClick={this.props.dispatchSelectSpecialDelivery}
                selected={specialDeliverySelected}
                disabled={selectSpecialDeliveryLoading}
            >
                {`${buttonText} Special Delivery`};
            </Button>
        );
    }
    
    renderLoading() {
        return (
            <Loading
                color='red'
                height={100}
                width={100}
                type='bubbles'
            />
        );
    }

    render() {
        const {
            slots,
            getSlotsLoading,
            selectSlotLoading,
            selectSpecialDeliveryLoading,
        } = this.props.picker;

        if (getSlotsLoading || selectSlotLoading || selectSpecialDeliveryLoading) {
            return this.renderLoading();
        }

        const button = this.renderSpecialDeliveryButton();
        const slotsList = this.renderSlots(slots);
        const pagination = this.renderPagination();
        const errorText = this.renderErrorText();

        return (
            <Wrapper>
                {button}
                {slotsList}
                {pagination}
                {errorText}
            </Wrapper>
        );
    }
}

Picker.propTypes = {
    dispatchGetSlots: PropTypes.func.isRequired,
    dispatchSelectSlot: PropTypes.func.isRequired,
    dispatchSelectSpecialDelivery: PropTypes.func.isRequired,
};

const mapStateToProps = ({ picker }) => ({ picker });

const mapDispatchToProps = {
    dispatchGetSlots: getSlots,
    dispatchSelectSlot: selectSlot,
    dispatchSelectSpecialDelivery: selectSpecialDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Picker);
