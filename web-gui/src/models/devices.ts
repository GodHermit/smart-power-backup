import { Schedule, Day } from './schedule';

export type Status = 'on' | 'off';

export interface Device {
  name: string;
  status: Status;
}

/**
 * Gets the device status.
 * @param device The device.
 * @param schedules The list of schedules.
 * @returns The device status and the time in milliseconds until the next status change (Max value is 10 minutes)
 */
export const getDeviceExtendedStatus = (
  device: Device,
  schedules: Schedule[]
): [Status, number] => {
  const TEN_MINUTES = 600000;

  const currentDate = new Date();

  for (const schedule of schedules) {
    const day = currentDate
      .toLocaleString('en-US', {
        weekday: 'long',
      })
      .toLowerCase() as Day;

    if (schedule.period.has(day) && schedule.isEnabled) {
      const [startHours, startMinutes] = schedule.timeStart.split(':');
      const timeStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        parseInt(startHours),
        parseInt(startMinutes)
      );
      const startDiff = getTimeDiff(timeStart, currentDate);

      if (startDiff >= 0 && startDiff <= TEN_MINUTES) {
        return ['off', startDiff];
      }

      const [endHours, endMinutes] = schedule.timeEnd.split(':');
      const timeEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        parseInt(endHours),
        parseInt(endMinutes)
      );
      const endDiff = getTimeDiff(timeEnd, currentDate);

      if (endDiff >= 0 && endDiff <= TEN_MINUTES) {
        return ['on', endDiff];
      }
    }
  }

  if (device.status === 'on') {
    return ['on', 0];
  }

  return ['off', 0];
};

//TODO: move to utils
export const getTimeDiff = (date1: Date, date2: Date) => {
  const diff = date1.getTime() - date2.getTime();

  return diff;
};
