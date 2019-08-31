// @flow

import React, {
  useMemo,
  useCallback,
} from 'react';
import { extendMoment } from 'moment-range';
import Moment from 'moment';
import type MomentType from 'moment';

const moment = extendMoment(Moment);

const styles = {
  dateBtn: {
    width: 36,
    height: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexShrink: 0,
    fontSize: 14,
    color: '#000',
    lineHeight: 1,
    fontWeight: 400,
    border: '2px solid transparent',
    borderRadius: 13,
    ':hover': {
      border: `2px solid ${Colors.PRIMARY.NORMAL}`,
    },
  },
  dateFade: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
  dateDisabled: {
    color: 'rgba(0, 0, 0, 0.3)',
    pointerEvents: 'none',
    ':hover': {
      border: `2px solid ${Colors.PRIMARY.NORMAL}`,
    },
  },
  dateSelected: {
    border: `2px solid ${Colors.PRIMARY.NORMAL}`,
  },
};

function InputCalendarDateBlock({
  date,
  selectedDate,
  selectedDateEnd,
  range,
  startFrom,
  onChange,
  availableDates,
  activedKey,
}: {
  date: ?MomentType,
  selectedDate: MomentType,
  selectedDateEnd: MomentType,
  range: ?{
    start: MomentType,
    end: MomentType,
  },
  startFrom: ?string,
  onChange: Function,
  availableDates: null,
  activedKey: string,
}) {
  const dateStr = useMemo(() => date.format('YYYY-MM-DD'), [date]);
  const selectedDateStr = useMemo(() => (
    selectedDate ? selectedDate.format('YYYY-MM-DD') : null
  ), [selectedDate]);

  const localRange = useMemo(() => (
    moment.range(selectedDate, selectedDateEnd)
  ), [selectedDate, selectedDateEnd]);

  const startFromStr = useMemo(() => moment(startFrom).format('YYYY-MM-DD'), [startFrom]);

  const isSelected = useMemo(() => {
    if (selectedDate) {
      if (selectedDateStr === dateStr) return true;
      if (selectedDateEnd && localRange.contains(date)) return true;

      return false;
    }

    if (range && range.contains(date)) return true;

    if (startFrom && startFromStr === dateStr) return true;

    return false;
  }, [
    selectedDate,
    selectedDateStr,
    dateStr,
    localRange,
    range,
    startFrom,
    startFromStr,
    date,
    selectedDateEnd,
  ]);


  const disabled = useMemo(() => {
    if (availableDates && !~availableDates.indexOf(dateStr)) return true;

    return false;
  }, [availableDates, dateStr]);

  const onClick = useCallback(() => {
    if (disabled) return;

    onChange(dateStr);
  }, [
    dateStr,
    onChange,
    disabled,
  ]);

  const onlyDate = useMemo(() => date.format('D'), [date]);
  const yearMonth = useMemo(() => date.format('YYYYMM'), [date]);

  const btnStyles = useMemo(() => ({
    ...styles.dateBtn,
    ...activedKey !== yearMonth ? styles.dateFade : {},
    ...disabled ? styles.dateDisabled : {},
    ...isSelected ? styles.dateSelected : {},
  }), [yearMonth, disabled, isSelected, activedKey]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={btnStyles}
      type="button">
      {onlyDate}
    </button>
  );
}

export default InputCalendarDateBlock;
