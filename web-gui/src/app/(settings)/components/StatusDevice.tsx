'use client';

import { SettingsOption } from '@/components/UI/Settings/SettingsOption';
import { Device, getDeviceExtendedStatus } from '@/models/devices';
import { useMemo } from 'react';
import { useSettingsStore } from '../store/settingsStore';

interface StatusDeviceProps {
  device: Device;
}

export function StatusDevice({ device }: StatusDeviceProps) {
  const [schedules] = useSettingsStore(state => [state.schedules]);
  const [status, timeDiff] = getDeviceExtendedStatus(device, schedules);

  const statusMessage = useMemo(() => {
    if (status === 'off' && timeDiff === 0) return 'Вимкнено';
    if (status === 'off' && timeDiff > 0) return 'Скоро увімкнення';
    if (status === 'on' && timeDiff > 0) return 'Скоро вимкнення';

    return 'Працює';
  }, [status]);

  return (
    <SettingsOption as="div">
      <span className="text-sm">{device.name}</span>
      <span className="ml-auto text-sm font-normal">{statusMessage}</span>
    </SettingsOption>
  );
}
