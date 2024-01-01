export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export default interface Schedule {
  /**
   * The name of the schedule.
   */
  name: string;
  /**
   * The list of days when the schedule is active.
   *
   * If the list is empty, the schedule will be active only once.
   *
   * If the list contains all days, the schedule will be active every day.
   */
  period: Set<Day>;
  /**
   * The time when the schedule starts.
   * Must be in format HH:mm.
   */
  timeStart: string;
  /**
   * The time when the schedule ends.
   * Must be in format HH:mm.
   */
  timeEnd: string;
  /**
   * Whether the schedule is enabled.
   */
  isEnabled: boolean;
}

export const weekdaysUK = {
  monday: {
    name: 'Понеділок',
    short: 'Пн',
  },
  tuesday: {
    name: 'Вівторок',
    short: 'Вт',
  },
  wednesday: {
    name: 'Середа',
    short: 'Ср',
  },
  thursday: {
    name: 'Четвер',
    short: 'Чт',
  },
  friday: {
    name: "П'ятниця",
    short: 'Пт',
  },
  saturday: {
    name: 'Субота',
    short: 'Сб',
  },
  sunday: {
    name: 'Неділя',
    short: 'Нд',
  },
};

export const schedulePeriodToString = (period: Schedule['period']): string => {
  if (period.size === 7) return 'Щодня';

  if (period.size === 0) return 'Один раз';

  if (period.size === 5 && !period.has('saturday') && !period.has('sunday'))
    return 'Робочі дні';

  if (period.size === 2 && period.has('saturday') && period.has('sunday'))
    return 'Вихідні';

  if (period.size === 1) {
    const day = [...period][0];
    return weekdaysUK[day].name;
  }

  return [...period].map(day => weekdaysUK[day].short).join(', ');
};
