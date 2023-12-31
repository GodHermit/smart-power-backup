'use client';

import { SettingsGroup } from '@/components/UI/Settings/SettingsGroup';
import { SettingsOption } from '@/components/UI/Settings/SettingsOption';
import { useSettingsStore } from '../store/settingsStore';
import { getDeviceStatusMessage } from '@/models/devices';

export function Status() {
  const [batteryCharge, devices] = useSettingsStore(state => [
    state.batteryCharge,
    state.devices,
  ]);

  return (
    <SettingsGroup groupName="Статус">
      <SettingsOption as="div">
        <span className="text-sm">
          Рівень заряду{' '}
          <span title="Рівень заряду визначається за формулами і може сильно відхилятися від фактичного значення">
            (?)
          </span>
        </span>
        <span className="ml-auto text-sm font-normal">
          {batteryCharge.toFixed(2)}%
        </span>
      </SettingsOption>
      {devices.map((device, i) => (
        <SettingsOption as="div" key={i}>
          <span className="text-sm">{device.name}</span>
          <span className="ml-auto text-sm font-normal">
            {getDeviceStatusMessage(device)}
          </span>
        </SettingsOption>
      ))}
    </SettingsGroup>
  );
}
