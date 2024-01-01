'use client';

import { SettingsGroup } from '@/components/UI/Settings/SettingsGroup';
import { SettingsOption } from '@/components/UI/Settings/SettingsOption';
import { Switch } from '@nextui-org/switch';
import { useSettingsStore } from '../store/settingsStore';
import { schedulePeriodToString } from '@/models/schedule';

export function Schedules() {
  const [schedules, setSettings] = useSettingsStore(state => [
    state.schedules,
    state.setSettings,
  ]);

  const handleStatusChange = (index: number, isEnabled: boolean) => {
    const newSchedules = [...schedules];
    newSchedules[index].isEnabled = isEnabled;

    setSettings({ schedules: newSchedules });
  };

  return (
    <SettingsGroup groupName="Розклад вимкнень">
      {schedules.map((schedule, i) => (
        <SettingsOption as="button" key={i}>
          <div className="mr-4 grow border-r pr-4">
            <p className="text-sm">{schedule.name}</p>
            <p className="text-sm font-normal text-primary">
              {schedulePeriodToString(schedule.period)}
            </p>
            <p className="text-sm font-normal text-primary">
              {schedule.timeStart} ~ {schedule.timeEnd}
            </p>
          </div>
          <Switch
            className="ml-auto h-full"
            classNames={{ base: 'h-full', wrapper: 'm-0' }}
            isSelected={schedule.isEnabled}
            onChange={() => handleStatusChange(i, !schedule.isEnabled)}
          />
        </SettingsOption>
      ))}
      {schedules.length < 3 && (
        <SettingsOption as="button" className="text-sm">
          + Додати розклад
        </SettingsOption>
      )}
    </SettingsGroup>
  );
}
